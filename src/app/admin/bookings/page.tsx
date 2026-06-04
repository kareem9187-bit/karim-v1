import { db } from '@/db';
import { bookings } from '@/db/schema';
import { desc } from '@/lib/db-order';
import BookingsClient from './BookingsClient';
import s from '../Scheduling.module.css';

export const metadata = { title: 'Bookings | Admin' };

export default async function BookingsPage() {
    const bookingsData = await db.select().from(bookings).orderBy(desc(bookings.createdAt));

    return (
        <div>
            <div className={s.pageHeader}>
                <div>
                    <h1 className={s.pageTitle}>Bookings</h1>
                    <p className={s.pageSub}>View and manage your upcoming and past bookings</p>
                </div>
            </div>

            <BookingsClient bookings={bookingsData || []} />
        </div>
    );
}
