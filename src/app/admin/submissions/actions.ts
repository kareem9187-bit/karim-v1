'use server';

import { db } from '@/db';
import { contactSubmissions } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getSubmissions() {
  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
}

export async function markAsRead(id: string) {
  await db.update(contactSubmissions).set({ read: true }).where(eq(contactSubmissions.id, id));
  revalidatePath('/admin/submissions');
  return { success: true };
}

export async function deleteSubmission(id: string) {
  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  revalidatePath('/admin/submissions');
  return { success: true };
}
