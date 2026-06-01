import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { emails } from '@/db/schema';
import { revalidatePath } from 'next/cache';

// Resend Inbound Email Webhook
// Docs: https://resend.com/docs/webhooks

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Handle different Resend webhook event types
    const eventType = payload?.type;

    if (eventType === 'email.received' || eventType === 'email.inbound') {
      // Inbound email
      const data = payload.data || payload;
      
      await db.insert(emails).values({
        resendId: data.id || data.email_id || null,
        direction: 'received',
        fromEmail: data.from || data.sender || 'unknown@unknown.com',
        fromName: data.from_name || extractName(data.from || ''),
        toEmail: data.to || process.env.CONTACT_EMAIL || 'hello@karimabdelaziz.com',
        toName: 'Karim Abdelaziz',
        subject: data.subject || '(No Subject)',
        body: data.html || data.body || data.text || '',
        bodyText: data.text || stripHtml(data.html || data.body || ''),
        status: 'delivered',
        read: false,
        folder: 'inbox',
        threadId: data.in_reply_to || data.thread_id || null,
      });

      revalidatePath('/admin/mail');
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // Handle delivery status updates
    if (eventType === 'email.delivered') {
      const resendId = payload.data?.email_id;
      if (resendId) {
        const { eq } = await import('drizzle-orm');
        await db
          .update(emails)
          .set({ status: 'delivered' })
          .where(eq(emails.resendId, resendId));
      }
      return NextResponse.json({ updated: true }, { status: 200 });
    }

    if (eventType === 'email.bounced') {
      const resendId = payload.data?.email_id;
      if (resendId) {
        const { eq } = await import('drizzle-orm');
        await db
          .update(emails)
          .set({ status: 'bounced' })
          .where(eq(emails.resendId, resendId));
      }
      return NextResponse.json({ updated: true }, { status: 200 });
    }

    // Acknowledge unknown events
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Resend webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// Allow GET for webhook verification
export async function GET() {
  return NextResponse.json({ status: 'Resend webhook endpoint active' });
}

// Helpers
function extractName(email: string): string {
  const match = email.match(/^(.+?)\s*</);
  return match ? match[1].trim() : email.split('@')[0] || '';
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}
