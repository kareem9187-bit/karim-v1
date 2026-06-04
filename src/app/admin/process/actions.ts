'use server';

import { db } from '@/db';
import { processSteps } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { asc } from '@/lib/db-order';
import { revalidatePath } from 'next/cache';

export async function getProcessSteps() {
  return await db.select().from(processSteps).orderBy(asc(processSteps.order));
}

export async function upsertProcessStep(formData: FormData) {
  const id = formData.get('id') as string | null;
  const data = {
    title: formData.get('title') as string,
    titleAr: (formData.get('titleAr') as string) || null,
    description: formData.get('description') as string,
    descriptionAr: (formData.get('descriptionAr') as string) || null,
    icon: (formData.get('icon') as string) || null,
    timeLabel: (formData.get('timeLabel') as string) || null,
    timeLabelAr: (formData.get('timeLabelAr') as string) || null,
    order: parseInt(formData.get('order') as string) || 0,
    active: formData.get('active') === 'true',
  };

  if (id) {
    await db.update(processSteps).set(data).where(eq(processSteps.id, id));
  } else {
    await db.insert(processSteps).values(data);
  }

  revalidatePath('/');
  revalidatePath('/admin/process');
  return { success: true };
}

export async function deleteProcessStep(id: string) {
  await db.delete(processSteps).where(eq(processSteps.id, id));
  revalidatePath('/');
  revalidatePath('/admin/process');
  return { success: true };
}

export async function reorderProcessSteps(updates: { id: string; order: number }[]) {
  for (const update of updates) {
    await db.update(processSteps).set({ order: update.order }).where(eq(processSteps.id, update.id));
  }
  revalidatePath('/');
  revalidatePath('/admin/process');
  return { success: true };
}
