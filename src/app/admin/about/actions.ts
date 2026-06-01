'use server';

import { db } from '@/db';
import { storyChapters } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getStoryChapters() {
  return db.select().from(storyChapters)
    .where(eq(storyChapters.active, true))
    .orderBy(asc(storyChapters.order));
}

export async function getAllStoryChapters() {
  return db.select().from(storyChapters).orderBy(asc(storyChapters.order));
}

export async function upsertStoryChapter(formData: FormData) {
  const id = formData.get('id') as string | null;
  const data = {
    order: parseInt(formData.get('order') as string) || 0,
    eyebrow: (formData.get('eyebrow') as string) || null,
    eyebrowAr: (formData.get('eyebrowAr') as string) || null,
    title: formData.get('title') as string,
    titleAr: (formData.get('titleAr') as string) || null,
    text: (formData.get('text') as string) || null,
    textAr: (formData.get('textAr') as string) || null,
    image: (formData.get('image') as string) || null,
    imageBadge: (formData.get('imageBadge') as string) || null,
    imageBadgeAr: (formData.get('imageBadgeAr') as string) || null,
    stats: JSON.parse((formData.get('stats') as string) || '[]'),
    reversed: formData.get('reversed') === 'true',
    active: formData.get('active') !== 'false',
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(storyChapters).set(data).where(eq(storyChapters.id, id));
  } else {
    await db.insert(storyChapters).values(data);
  }

  revalidatePath('/about');
  revalidatePath('/admin/about');
  return { success: true };
}

export async function deleteStoryChapter(id: string) {
  await db.delete(storyChapters).where(eq(storyChapters.id, id));
  revalidatePath('/about');
  revalidatePath('/admin/about');
  return { success: true };
}

export async function reorderStoryChapters(ids: string[]) {
  await Promise.all(
    ids.map((id, index) =>
      db.update(storyChapters).set({ order: index + 1 }).where(eq(storyChapters.id, id))
    )
  );
  revalidatePath('/about');
  return { success: true };
}
