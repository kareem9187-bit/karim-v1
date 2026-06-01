'use server';

import { db } from '@/db';
import { siteSettings } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function getSiteSettings() {
  const [data] = await db.select().from(siteSettings).limit(1);
  return data ?? null;
}

export async function updateSiteSettings(formData: FormData) {
  const data = {
    siteName: (formData.get('siteName') as string) || 'Karim Abdelaziz',
    siteNameAr: (formData.get('siteNameAr') as string) || null,
    description: (formData.get('description') as string) || null,
    descriptionAr: (formData.get('descriptionAr') as string) || null,
    keywords: (formData.get('keywords') as string) || null,
    themeColor: (formData.get('themeColor') as string) || '#04060a',
    ogImage: (formData.get('ogImage') as string) || null,
    favicon: (formData.get('favicon') as string) || null,
    updatedAt: new Date(),
  };

  await db
    .insert(siteSettings)
    .values({ id: 'main', ...data })
    .onConflictDoUpdate({ target: siteSettings.id, set: data });

  revalidatePath('/');
  revalidatePath('/admin/settings');
  return { success: true };
}
