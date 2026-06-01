'use server';

import { db } from '@/db';
import { works } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getWorks() {
  return db.select().from(works).where(eq(works.active, true)).orderBy(asc(works.order));
}

export async function getAllWorks() {
  return db.select().from(works).orderBy(asc(works.order));
}

export async function getWorkBySlug(slug: string) {
  const [work] = await db.select().from(works).where(eq(works.slug, slug)).limit(1);
  return work ?? null;
}

export async function upsertWork(formData: FormData) {
  const id = formData.get('id') as string | null;
  const data = {
    order: parseInt(formData.get('order') as string) || 0,
    slug: formData.get('slug') as string,
    title: formData.get('title') as string,
    titleAr: (formData.get('titleAr') as string) || null,
    category: formData.get('category') as string,
    categoryAr: (formData.get('categoryAr') as string) || null,
    description: (formData.get('description') as string) || null,
    descriptionAr: (formData.get('descriptionAr') as string) || null,
    thumbnail: (formData.get('thumbnail') as string) || null,
    videoUrl: (formData.get('videoUrl') as string) || null,
    featured: formData.get('featured') === 'true',
    comingSoon: formData.get('comingSoon') === 'true',
    active: formData.get('active') !== 'false',
    serviceId: (formData.get('serviceId') as string) || null,
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(works).set(data).where(eq(works.id, id));
  } else {
    await db.insert(works).values(data);
  }

  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath('/admin/work');
  return { success: true };
}

export async function deleteWork(id: string) {
  await db.delete(works).where(eq(works.id, id));
  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath('/admin/work');
  return { success: true };
}

export async function reorderWorks(ids: string[]) {
  await Promise.all(
    ids.map((id, index) =>
      db.update(works).set({ order: index + 1 }).where(eq(works.id, id))
    )
  );
  revalidatePath('/');
  return { success: true };
}
