import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { media } from '@/db/schema';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'File type not allowed' }, { status: 400 });
    }

    // Validate size (10MB max)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    let url = '';
    const filename = file.name;
    const type = file.type.startsWith('video') ? 'video' : 'image';

    // ── Cloudinary upload ──
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      const dataUri = `data:${file.type};base64,${base64}`;

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            file: dataUri,
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || 'karim_portfolio',
            folder: 'karim-portfolio',
          }),
        }
      );

      if (!response.ok) {
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
      }

      const data = await response.json();
      url = data.secure_url;

    // ── Vercel Blob upload ──
    } else if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob');
      const blob = await put(filename, file, { access: 'public' });
      url = blob.url;

    } else {
      return NextResponse.json(
        { error: 'No storage provider configured. Set CLOUDINARY_CLOUD_NAME or BLOB_READ_WRITE_TOKEN.' },
        { status: 500 }
      );
    }

    // Save to media library
    const savedRows = (await db.insert(media).values({
      url,
      filename,
      type,
      size: file.size,
    }).returning()) as unknown as any[];
    const saved = savedRows[0];

    return NextResponse.json({ success: true, url, id: saved.id });
  } catch (e) {
    console.error('Upload error:', e);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
