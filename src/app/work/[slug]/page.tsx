import { db } from '@/db/index';
import { works } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import WorkDetailsClient from './WorkDetailsClient';

export default async function WorkDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = await db.query.works.findFirst({
    where: and(eq(works.slug, slug), eq(works.active, true))
  });

  if (!work) {
    notFound();
  }

  return <WorkDetailsClient work={work} />;
}
