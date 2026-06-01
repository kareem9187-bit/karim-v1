import { db } from '@/db';
import { eventTypes } from '@/db/schema';
import { desc } from 'drizzle-orm';
import EventTypesList from './EventTypesList';
import s from '../Scheduling.module.css';

export const metadata = { title: 'Event Types | Admin' };

export default async function EventTypesPage() {
    const eventTypesData = await db.select().from(eventTypes).orderBy(desc(eventTypes.createdAt));

    return (
        <div>
            <div className={s.pageHeader}>
                <div>
                    <h1 className={s.pageTitle}>Event Types</h1>
                    <p className={s.pageSub}>Create events to share for people to book on your calendar</p>
                </div>
            </div>

            <EventTypesList eventTypes={eventTypesData || []} />
        </div>
    );
}
