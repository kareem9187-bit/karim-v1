'use server';

import { db } from '@/db';
import { brands } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getBrands() {
  return db.select().from(brands).orderBy(asc(brands.order));
}

export async function upsertBrand(formData: FormData) {
  const id = formData.get('id') as string | null;
  const data = {
    order: parseInt(formData.get('order') as string) || 0,
    name: formData.get('name') as string,
    logo: (formData.get('logo') as string) || null,
    style: (formData.get('style') as string) || null,
    active: formData.get('active') === 'true',
  };

  if (id) {
    await db.update(brands).set(data).where(eq(brands.id, id));
  } else {
    await db.insert(brands).values(data);
  }

  revalidatePath('/');
  revalidatePath('/admin/brands');
  return { success: true };
}

export async function deleteBrand(id: string) {
  await db.delete(brands).where(eq(brands.id, id));
  revalidatePath('/');
  revalidatePath('/admin/brands');
  return { success: true };
}

export async function reorderBrands(ids: string[]) {
  await Promise.all(
    ids.map((id, index) => db.update(brands).set({ order: index + 1 }).where(eq(brands.id, id)))
  );
  revalidatePath('/');
  return { success: true };
}
