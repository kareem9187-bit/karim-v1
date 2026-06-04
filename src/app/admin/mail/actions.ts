'use server';

import { db } from '@/db';
import { emails } from '@/db/schema';
import { eq, and, count } from 'drizzle-orm';
import { sql } from 'drizzle-orm/sql';
import { desc } from '@/lib/db-order';
import { revalidatePath } from 'next/cache';

// ─── getEmails ───────────────────────────────────────────────────────────────

export async function getEmails(folder: string = 'inbox') {
  return db
    .select()
    .from(emails)
    .where(eq(emails.folder, folder as any))
    .orderBy(desc(emails.createdAt));
}

// ─── getEmailById ────────────────────────────────────────────────────────────

export async function getEmailById(id: string) {
  const [email] = await db
    .select()
    .from(emails)
    .where(eq(emails.id, id))
    .limit(1);
  return email || null;
}

// ─── getUnreadCount ──────────────────────────────────────────────────────────

export async function getUnreadCount() {
  const [result] = await db
    .select({ count: count() })
    .from(emails)
    .where(and(eq(emails.read, false), eq(emails.folder, 'inbox')));
  return result?.count || 0;
}

// ─── getFolderCounts ─────────────────────────────────────────────────────────

export async function getFolderCounts() {
  const results = await db
    .select({
      folder: emails.folder,
      total: count(),
      unread: sql<number>`count(*) filter (where ${emails.read} = false)`,
    })
    .from(emails)
    .groupBy(emails.folder);

  const counts: Record<string, { total: number; unread: number }> = {
    inbox: { total: 0, unread: 0 },
    sent: { total: 0, unread: 0 },
    drafts: { total: 0, unread: 0 },
    trash: { total: 0, unread: 0 },
  };

  for (const r of results) {
    if (r.folder && counts[r.folder]) {
      counts[r.folder] = { total: r.total, unread: r.unread };
    }
  }

  return counts;
}

// ─── sendEmail ───────────────────────────────────────────────────────────────

export async function sendEmail({
  to,
  toName,
  subject,
  body,
  replyToId,
}: {
  to: string;
  toName?: string;
  subject: string;
  body: string;
  replyToId?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_EMAIL || 'hello@karimabdelaziz.com';
  const fromName = 'Karim Abdelaziz';

  // Build HTML email with branding
  const htmlBody = buildEmailHtml(body, subject);

  let resendId: string | null = null;
  let status: 'sent' | 'failed' = 'sent';

  // Try to send via Resend
  if (apiKey) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);
      const result = await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to,
        subject,
        html: htmlBody,
      });
      resendId = (result as any)?.data?.id || null;
    } catch (err) {
      console.error('Resend send error:', err);
      status = 'failed';
    }
  }

  // Save to DB
  const savedRows = (await db
    .insert(emails)
    .values({
      resendId,
      direction: 'sent',
      fromEmail,
      fromName,
      toEmail: to,
      toName: toName || null,
      subject,
      body: htmlBody,
      bodyText: body,
      status,
      read: true,
      folder: 'sent',
      threadId: replyToId || null,
      replyToId: replyToId || null,
    })
    .returning()) as unknown as any[];
  const saved = savedRows[0];

  revalidatePath('/admin/mail');
  return { success: status === 'sent', emailId: saved?.id, resendId };
}

// ─── saveDraft ───────────────────────────────────────────────────────────────

export async function saveDraft({
  to,
  subject,
  body,
  draftId,
}: {
  to: string;
  subject: string;
  body: string;
  draftId?: string;
}) {
  const fromEmail = process.env.CONTACT_EMAIL || 'hello@karimabdelaziz.com';

  if (draftId) {
    await db
      .update(emails)
      .set({ toEmail: to, subject, bodyText: body, body: buildEmailHtml(body, subject) })
      .where(eq(emails.id, draftId));
    revalidatePath('/admin/mail');
    return { success: true, emailId: draftId };
  }

  const savedRows = (await db
    .insert(emails)
    .values({
      direction: 'sent',
      fromEmail,
      fromName: 'Karim Abdelaziz',
      toEmail: to,
      subject,
      body: buildEmailHtml(body, subject),
      bodyText: body,
      status: 'sent',
      read: true,
      folder: 'drafts',
    })
    .returning()) as unknown as any[];
  const saved = savedRows[0];

  revalidatePath('/admin/mail');
  return { success: true, emailId: saved?.id };
}

// ─── markAsRead ──────────────────────────────────────────────────────────────

export async function markAsRead(id: string) {
  await db.update(emails).set({ read: true }).where(eq(emails.id, id));
  revalidatePath('/admin/mail');
  return { success: true };
}

// ─── toggleStarred ───────────────────────────────────────────────────────────

export async function toggleStarred(id: string) {
  const [email] = await db.select({ starred: emails.starred }).from(emails).where(eq(emails.id, id));
  if (email) {
    await db.update(emails).set({ starred: !email.starred }).where(eq(emails.id, id));
  }
  revalidatePath('/admin/mail');
  return { success: true };
}

// ─── moveToTrash ─────────────────────────────────────────────────────────────

export async function moveToTrash(id: string) {
  await db.update(emails).set({ folder: 'trash' }).where(eq(emails.id, id));
  revalidatePath('/admin/mail');
  return { success: true };
}

// ─── deleteEmail ─────────────────────────────────────────────────────────────

export async function deleteEmail(id: string) {
  await db.delete(emails).where(eq(emails.id, id));
  revalidatePath('/admin/mail');
  return { success: true };
}

// ─── restoreFromTrash ────────────────────────────────────────────────────────

export async function restoreFromTrash(id: string) {
  const [email] = await db.select({ direction: emails.direction }).from(emails).where(eq(emails.id, id));
  const folder = email?.direction === 'sent' ? 'sent' : 'inbox';
  await db.update(emails).set({ folder }).where(eq(emails.id, id));
  revalidatePath('/admin/mail');
  return { success: true };
}

// ─── buildEmailHtml ──────────────────────────────────────────────────────────

function buildEmailHtml(bodyText: string, subject: string): string {
  // Convert newlines to <br> for plain text input
  const htmlContent = bodyText.replace(/\n/g, '<br>');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#04060a;font-family:'Inter','Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <!-- Logo -->
    <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#2d6aab,#224f81);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;color:#fff;margin-bottom:28px;text-align:center;line-height:48px;">KA</div>

    <!-- Body -->
    <div style="color:#f0f3f8;font-size:15px;line-height:1.7;">
      ${htmlContent}
    </div>

    <!-- Divider -->
    <div style="border-top:1px solid rgba(255,255,255,0.08);margin:32px 0;"></div>

    <!-- Footer -->
    <div style="color:rgba(240,243,248,0.35);font-size:12px;line-height:1.6;">
      <strong style="color:rgba(240,243,248,0.5);">Karim Abdelaziz</strong><br>
      Film Director & Video Editor<br>
      <a href="https://karimabdelaziz.com" style="color:#5fa3e0;text-decoration:none;">karimabdelaziz.com</a>
    </div>
  </div>
</body>
</html>`;
}
