'use server';

import { db } from '@/db';
import { faqs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { asc } from '@/lib/db-order';
import { revalidatePath } from 'next/cache';

export async function getFaqs() {
  return db.select().from(faqs).where(eq(faqs.active, true)).orderBy(asc(faqs.order));
}

export async function getAllFaqs() {
  return db.select().from(faqs).orderBy(asc(faqs.order));
}

export async function upsertFaq(formData: FormData) {
  const id = formData.get('id') as string | null;
  const data = {
    order: parseInt(formData.get('order') as string) || 0,
    question: formData.get('question') as string,
    questionAr: (formData.get('questionAr') as string) || null,
    answer: formData.get('answer') as string,
    answerAr: (formData.get('answerAr') as string) || null,
    active: formData.get('active') === 'true',
  };

  if (id) {
    await db.update(faqs).set(data).where(eq(faqs.id, id));
  } else {
    await db.insert(faqs).values(data);
  }

  revalidatePath('/');
  revalidatePath('/contact');
  revalidatePath('/admin/faq');
  return { success: true };
}

export async function deleteFaq(id: string) {
  await db.delete(faqs).where(eq(faqs.id, id));
  revalidatePath('/');
  revalidatePath('/contact');
  revalidatePath('/admin/faq');
  return { success: true };
}

export async function reorderFaqs(ids: string[]) {
  await Promise.all(
    ids.map((id, index) =>
      db.update(faqs).set({ order: index + 1 }).where(eq(faqs.id, id))
    )
  );
  revalidatePath('/');
  revalidatePath('/contact');
  return { success: true };
}
