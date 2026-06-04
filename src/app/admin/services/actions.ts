'use server';

import { db } from '@/db';
import { services } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getServices() {
  return db.select().from(services).where(eq(services.active, true)).orderBy(asc(services.order));
}

export async function getAllServices() {
  return db.select().from(services).orderBy(asc(services.order));
}

export async function upsertService(formData: FormData) {
  const id = formData.get('id') as string | null;
  const data = {
    order: parseInt(formData.get('order') as string) || 0,
    title: formData.get('title') as string,
    titleAr: (formData.get('titleAr') as string) || null,
    description: formData.get('description') as string,
    descriptionAr: (formData.get('descriptionAr') as string) || null,
    icon: (formData.get('icon') as string) || null,
    active: formData.get('active') === 'true',
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(services).set(data).where(eq(services.id, id));
  } else {
    await db.insert(services).values(data);
  }

  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath('/admin/services');
  return { success: true };
}

export async function deleteService(id: string) {
  await db.delete(services).where(eq(services.id, id));
  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath('/admin/services');
  return { success: true };
}

export async function reorderServices(ids: string[]) {
  await Promise.all(
    ids.map((id, index) =>
      db.update(services).set({ order: index + 1 }).where(eq(services.id, id))
    )
  );
  revalidatePath('/');
  return { success: true };
}
