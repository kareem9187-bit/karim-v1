import { db } from '@/db/index';
import { works } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import WorkDetailsClient from './WorkDetailsClient';

export default async function WorkDetailsPage({ params }: { params: { slug: string } }) {
  const work = await db.query.works.findFirst({
    where: eq(works.slug, params.slug)
  });

  if (!work) {
    notFound();
  }

  return <WorkDetailsClient work={work} />;
}
