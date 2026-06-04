import { db } from '@/db';
import { availability, availabilityOverrides } from '@/db/schema';
import { asc, desc } from '@/lib/db-order';
import AvailabilityForm from './AvailabilityForm';
import s from '../Scheduling.module.css';

export const metadata = { title: 'Availability | Admin' };

export default async function AvailabilityPage() {
    const availabilities = await db.select().from(availability).orderBy(asc(availability.dayOfWeek));
    const overridesRaw = await db.select().from(availabilityOverrides).orderBy(desc(availabilityOverrides.date));
    const overrides = overridesRaw.map((o: any) => ({ ...o, slots: (o.slots as any) || [] }));

    return (
        <div>
            <div className={s.pageHeader}>
                <div>
                    <h1 className={s.pageTitle}>Availability</h1>
                    <p className={s.pageSub}>Configure your weekly schedule and date-specific overrides</p>
                </div>
            </div>

            <AvailabilityForm
                availabilities={availabilities || []}
                overrides={overrides || []}
            />
        </div>
    );
}
