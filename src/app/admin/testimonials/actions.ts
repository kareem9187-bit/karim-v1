'use server';

import { db } from '@/db';
import { testimonials } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { asc } from '@/lib/db-order';
import { revalidatePath } from 'next/cache';

export async function getTestimonials() {
  return db.select().from(testimonials).where(eq(testimonials.active, true)).orderBy(asc(testimonials.order));
}

export async function getAllTestimonials() {
  return db.select().from(testimonials).orderBy(asc(testimonials.order));
}

export async function getFeaturedTestimonial() {
  const [t] = await db.select().from(testimonials)
    .where(and(eq(testimonials.isFeatured, true), eq(testimonials.active, true))).limit(1);
  return t ?? null;
}

export async function upsertTestimonial(formData: FormData) {
  const id = formData.get('id') as string | null;
  const data = {
    order: parseInt(formData.get('order') as string) || 0,
    name: formData.get('name') as string,
    role: (formData.get('role') as string) || null,
    avatar: (formData.get('avatar') as string) || null,
    text: formData.get('text') as string,
    textAr: (formData.get('textAr') as string) || null,
    rating: parseInt(formData.get('rating') as string) || 5,
    isVideo: formData.get('isVideo') === 'true',
    videoUrl: (formData.get('videoUrl') as string) || null,
    videoThumbnail: (formData.get('videoThumbnail') as string) || null,
    isFeatured: formData.get('isFeatured') === 'true',
    row: parseInt(formData.get('row') as string) || 1,
    active: formData.get('active') === 'true',
  };

  if (id) {
    await db.update(testimonials).set(data).where(eq(testimonials.id, id));
  } else {
    await db.insert(testimonials).values(data);
  }

  revalidatePath('/');
  revalidatePath('/testimonials');
  revalidatePath('/admin/testimonials');
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath('/');
  revalidatePath('/testimonials');
  revalidatePath('/admin/testimonials');
  return { success: true };
}

export async function reorderTestimonials(ids: string[]) {
  await Promise.all(
    ids.map((id, index) =>
      db.update(testimonials).set({ order: index + 1 }).where(eq(testimonials.id, id))
    )
  );
  revalidatePath('/');
  return { success: true };
}
