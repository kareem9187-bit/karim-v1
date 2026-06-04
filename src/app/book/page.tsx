import Image from 'next/image';
import Link from 'next/link';
import s from './Booking.module.css';
import { getBookingProfile, getActiveEventTypes } from './actions';
import { SpaNavbar } from '@/components/public/SpaNavbar';

export const metadata = { title: 'Book a Session — Karim Abdelaziz' };
export const dynamic = 'force-dynamic';

export default async function BookPage() {
    const profile = await getBookingProfile();
    const eventTypes = await getActiveEventTypes();

    return (
        <div className={s.pageWrap}>
            <div className="bg-canvas"></div>
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>

            <SpaNavbar />

            <div className={s.contentWrap}>
                <Link href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: '1.5rem', fontSize: '0.95rem', fontWeight: 600 }}>
                    <span style={{ fontSize: '1.2rem' }}>&larr;</span> Back to Portfolio
                </Link>

                <div className={s.listingCard}>
                    <Image src={profile.avatar_url || '/images/karim.jpg'} alt={profile.name} width={100} height={100} className={s.profilePhoto} />
                    <div className={s.profileName}>{profile.name}</div>
                    <p className={s.profileBio}>{profile.welcome_message}</p>
                    <div className={s.divider} />
                    {eventTypes && eventTypes.length > 0 ? (
                        eventTypes.map((ev: any) => (
                            <Link key={ev.id} href={`/book/${ev.slug}`} className={s.eventItem}>
                                <div className={s.eventDot} style={{ background: ev.color || '#3b82f6' }} />
                                <div className={s.eventItemBody}>
                                    <div className={s.eventItemTitle}>
                                        {ev.title}
                                        <span className={s.eventItemArrow}>▶</span>
                                    </div>
                                    <div className={s.eventItemDesc}>
                                        {ev.description ? `${ev.description.substring(0, 150)}${ev.description.length > 150 ? '...' : ''}` : ''}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No events available at the moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
