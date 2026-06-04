'use server';

import { db } from '@/db';
import { media } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { desc } from '@/lib/db-order';
import { revalidatePath } from 'next/cache';

export async function getMedia() {
  return db.select().from(media).orderBy(desc(media.createdAt));
}

export async function deleteMedia(id: string) {
  const [item] = await db.select().from(media).where(eq(media.id, id)).limit(1);
  if (!item) return { error: 'Not found' };

  // Delete from Cloudinary if applicable
  if (item.url.includes('cloudinary.com') && process.env.CLOUDINARY_CLOUD_NAME) {
    try {
      const publicId = item.url.split('/').slice(-1)[0].split('.')[0];
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = require('crypto')
        .createHash('sha1')
        .update(`public_id=${publicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`)
        .digest('hex');

      await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            public_id: publicId,
            api_key: process.env.CLOUDINARY_API_KEY,
            timestamp,
            signature,
          }),
        }
      );
    } catch (e) {
      console.error('Cloudinary delete failed:', e);
    }
  }

  await db.delete(media).where(eq(media.id, id));
  revalidatePath('/admin/media');
  return { success: true };
}

export async function updateMediaAlt(id: string, alt: string) {
  await db.update(media).set({ alt }).where(eq(media.id, id));
  revalidatePath('/admin/media');
  return { success: true };
}
