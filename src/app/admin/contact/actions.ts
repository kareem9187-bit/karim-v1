'use server';

import { db } from '@/db';
import { contactInfo, socialLinks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { asc } from '@/lib/db-order';
import { revalidatePath } from 'next/cache';

export async function getContactInfo() {
  const [data] = await db.select().from(contactInfo).limit(1);
  return data ?? null;
}

export async function updateContactInfo(formData: FormData) {
  const data = {
    whatsapp: (formData.get('whatsapp') as string) || null,
    email: (formData.get('email') as string) || null,
    phone: (formData.get('phone') as string) || null,
    tagline: (formData.get('tagline') as string) || null,
    taglineAr: (formData.get('taglineAr') as string) || null,
    updatedAt: new Date(),
  };

  await db.insert(contactInfo).values({ id: 'main', ...data })
    .onConflictDoUpdate({ target: contactInfo.id, set: data });

  revalidatePath('/');
  revalidatePath('/contact');
  revalidatePath('/admin/contact');
  return { success: true };
}

export async function getSocialLinks() {
  return db.select().from(socialLinks)
    .where(eq(socialLinks.active, true))
    .orderBy(asc(socialLinks.order));
}

export async function getAllSocialLinks() {
  return db.select().from(socialLinks).orderBy(asc(socialLinks.order));
}

export async function upsertSocialLink(formData: FormData) {
  const id = formData.get('id') as string | null;
  const data = {
    order: parseInt(formData.get('order') as string) || 0,
    platform: formData.get('platform') as string,
    url: formData.get('url') as string,
    label: (formData.get('label') as string) || null,
    icon: (formData.get('icon') as string) || null,
    active: formData.get('active') === 'true',
  };

  if (id) {
    await db.update(socialLinks).set(data).where(eq(socialLinks.id, id));
  } else {
    await db.insert(socialLinks).values(data);
  }

  revalidatePath('/');
  revalidatePath('/contact');
  revalidatePath('/admin/contact');
  return { success: true };
}

export async function deleteSocialLink(id: string) {
  await db.delete(socialLinks).where(eq(socialLinks.id, id));
  revalidatePath('/');
  revalidatePath('/contact');
  revalidatePath('/admin/contact');
  return { success: true };
}
