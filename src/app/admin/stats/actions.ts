'use server';

import { db } from '@/db';
import { stats } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getStats() {
  return db.select().from(stats).orderBy(asc(stats.order));
}

export async function upsertStat(formData: FormData) {
  const id = formData.get('id') as string | null;
  const data = {
    order: parseInt(formData.get('order') as string) || 0,
    number: formData.get('number') as string,
    label: formData.get('label') as string,
    labelAr: formData.get('labelAr') as string || null,
    icon: formData.get('icon') as string || null,
    active: formData.get('active') === 'true',
  };

  if (id) {
    await db.update(stats).set(data).where(eq(stats.id, id));
  } else {
    await db.insert(stats).values(data);
  }

  revalidatePath('/');
  revalidatePath('/admin/stats');
  return { success: true };
}

export async function deleteStat(id: string) {
  await db.delete(stats).where(eq(stats.id, id));
  revalidatePath('/');
  revalidatePath('/admin/stats');
  return { success: true };
}

export async function reorderStats(ids: string[]) {
  await Promise.all(
    ids.map((id, index) => db.update(stats).set({ order: index + 1 }).where(eq(stats.id, id)))
  );
  revalidatePath('/');
  return { success: true };
}
