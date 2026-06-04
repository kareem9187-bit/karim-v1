'use server';

import { db } from '@/db';
import { welcomeChapters } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { asc } from '@/lib/db-order';
import { revalidatePath } from 'next/cache';

export async function getWelcomeChapters() {
  return db.select().from(welcomeChapters).orderBy(asc(welcomeChapters.order));
}

export async function updateWelcomeChapter(formData: FormData) {
  const id = formData.get('id') as string;
  const data = {
    number: formData.get('number') as string,
    suffix: formData.get('suffix') as string || null,
    suffixAr: formData.get('suffixAr') as string || null,
    label: formData.get('label') as string,
    labelAr: formData.get('labelAr') as string || null,
    phrase: formData.get('phrase') as string,
    phraseAr: formData.get('phraseAr') as string || null,
    subText: formData.get('subText') as string || null,
    subTextAr: formData.get('subTextAr') as string || null,
    active: formData.get('active') === 'true',
    updatedAt: new Date(),
  };

  await db.update(welcomeChapters).set(data).where(eq(welcomeChapters.id, id));
  revalidatePath('/');
  revalidatePath('/admin/welcome');
  return { success: true };
}

export async function reorderWelcomeChapters(ids: string[]) {
  await Promise.all(
    ids.map((id, index) =>
      db.update(welcomeChapters).set({ order: index }).where(eq(welcomeChapters.id, id))
    )
  );
  revalidatePath('/');
  revalidatePath('/admin/welcome');
  return { success: true };
}

export async function toggleWelcomeChapter(id: string, active: boolean) {
  await db.update(welcomeChapters).set({ active }).where(eq(welcomeChapters.id, id));
  revalidatePath('/');
  return { success: true };
}
