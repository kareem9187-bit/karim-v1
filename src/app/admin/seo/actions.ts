'use server';

import { db } from '@/db';
import { siteSettings } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function getSEO() {
  const [data] = await db.select().from(siteSettings).limit(1);
  return data ?? null;
}

export async function updateSEO(formData: FormData) {
  const data = {
    keywords: (formData.get('keywords') as string) || null,
    ogImage: (formData.get('ogImage') as string) || null,
    favicon: (formData.get('favicon') as string) || null,
    updatedAt: new Date(),
  };

  await db
    .insert(siteSettings)
    .values({ id: 'main', siteName: 'Karim Abdelaziz', ...data })
    .onConflictDoUpdate({ target: siteSettings.id, set: data });

  revalidatePath('/');
  revalidatePath('/admin/seo');
  return { success: true };
}
