'use server';

import { db } from '@/db';
import { countries } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getCountries() {
  return await db.select().from(countries).orderBy(asc(countries.name));
}

export async function upsertCountry(formData: FormData) {
  const id = formData.get('id') as string | null;
  const data = {
    name: formData.get('name') as string,
    nameAr: (formData.get('nameAr') as string) || null,
    code: formData.get('code') as string,
    flag: (formData.get('flag') as string) || null,
    isHome: formData.get('isHome') === 'true',
    active: formData.get('active') !== 'false', // default true
  };

  if (id) {
    await db.update(countries).set(data).where(eq(countries.id, id));
  } else {
    await db.insert(countries).values(data);
  }

  revalidatePath('/');
  revalidatePath('/admin/countries');
  return { success: true };
}

export async function deleteCountry(id: string) {
  await db.delete(countries).where(eq(countries.id, id));
  revalidatePath('/');
  revalidatePath('/admin/countries');
  return { success: true };
}
