'use server';

import { db } from '@/db';
import { hero } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const HeroSchema = z.object({
  name: z.string().min(1),
  nameAr: z.string().optional(),
  greeting: z.string().optional(),
  greetingAr: z.string().optional(),
  tagline: z.string().optional(),
  taglineAr: z.string().optional(),
  ctaPrimaryText: z.string().optional(),
  ctaPrimaryTextAr: z.string().optional(),
  ctaPrimaryLink: z.string().optional(),
  ctaSecondaryText: z.string().optional(),
  ctaSecondaryTextAr: z.string().optional(),
  ctaSecondaryLink: z.string().optional(),
  image: z.string().optional(),
});

export async function getHero() {
  const [data] = await db.select().from(hero).limit(1);
  return data ?? null;
}

export async function updateHero(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = HeroSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  await db
    .insert(hero)
    .values({ id: 'main', ...parsed.data })
    .onConflictDoUpdate({ target: hero.id, set: { ...parsed.data, updatedAt: new Date() } });

  revalidatePath('/');
  revalidatePath('/admin/hero');
  return { success: true };
}
