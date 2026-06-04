import { getBookingProfile } from './actions';
import ProfileForm from './ProfileForm';
import s from '../Scheduling.module.css';
import { getGoogleCalendarStatus } from '@/utils/google-calendar';

export const metadata = { title: 'Booking Profile | Admin' };

export default async function BookingProfilePage({
    searchParams,
}: {
    searchParams?: Promise<{ google?: string }>;
}) {
    const profile = await getBookingProfile();
    const googleStatus = await getGoogleCalendarStatus();
    const params = searchParams ? await searchParams : {};

    return (
        <div>
            <div className={s.pageHeader}>
                <div>
                    <h1 className={s.pageTitle}>Booking Profile</h1>
                    <p className={s.pageSub}>Customize how you appear on your booking page</p>
                </div>
            </div>
            <div style={{ maxWidth: 680 }}>
                <div className={s.scheduleCard} style={{ marginBottom: '1.25rem' }}>
                    <div className={s.scheduleHeader}>
                        <div>
                            <div className={s.scheduleHeaderTitle}>Google Calendar</div>
                            <div className={s.scheduleHeaderSub}>
                                Create calendar events and Google Meet links when clients book.
                            </div>
                        </div>
                        <a href="/api/auth/google" className={s.btnPrimary}>
                            {googleStatus.connected ? 'Reconnect' : 'Connect'}
                        </a>
                    </div>
                    <div style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <span className={googleStatus.connected ? s.badgeConfirmed : s.badgePending}>
                                {googleStatus.connected ? 'Connected' : 'Not connected'}
                            </span>
                            {googleStatus.source ? <span>Source: {googleStatus.source}</span> : null}
                        </div>
                        {!googleStatus.clientConfigured ? (
                            <p style={{ color: '#facc15' }}>
                                Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET before connecting.
                            </p>
                        ) : null}
                        {params.google === 'connected' ? (
                            <p style={{ color: '#22c55e' }}>Google Calendar connected successfully.</p>
                        ) : null}
                        {params.google === 'error' ? (
                            <p style={{ color: '#ef4444' }}>Google Calendar connection failed. Try reconnecting.</p>
                        ) : null}
                        {params.google === 'missing-config' ? (
                            <p style={{ color: '#ef4444' }}>Google OAuth environment variables are missing.</p>
                        ) : null}
                        <div style={{ marginTop: '0.75rem', wordBreak: 'break-all' }}>
                            Redirect URI: <code>{googleStatus.redirectUri}</code>
                        </div>
                    </div>
                </div>
                <ProfileForm profile={profile} />
            </div>
        </div>
    );
}
