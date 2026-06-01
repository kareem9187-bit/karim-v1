import { notFound } from 'next/navigation';
import { getBookingProfile } from '../actions';
import BookingFlow from './BookingFlow';
import { db } from '@/db';
import { eventTypes } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await db.select({ title: eventTypes.title }).from(eventTypes).where(eq(eventTypes.slug, slug)).limit(1);
    return { title: data.length > 0 ? `${data[0].title} — Book Now` : 'Book a Session' };
}

export default async function BookSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    const result = await db
        .select()
        .from(eventTypes)
        .where(and(eq(eventTypes.slug, slug), eq(eventTypes.isActive, true)))
        .limit(1);

    const eventType = result.length > 0 ? result[0] : null;

    if (!eventType) notFound();

    const profile = await getBookingProfile();

    return <BookingFlow eventType={eventType} profile={profile} />;
}
