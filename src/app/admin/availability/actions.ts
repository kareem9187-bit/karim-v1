'use server'

import { db } from '@/db'
import { availability, availabilityOverrides } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function saveWeeklyAvailability(formData: FormData) {
    try {
        const payload = formData.get('payload');
        if (!payload) throw new Error('No payload found');
        const items = JSON.parse(payload as string);

        // We can just clear the whole availability table and re-insert 
        // since it's a small set of rows.
        await db.delete(availability);
        
        if (items.length > 0) {
            const dataToInsert = items.map((item: any) => ({
                dayOfWeek: item.day_of_week,
                startTime: item.start_time,
                endTime: item.end_time,
            }));
            await db.insert(availability).values(dataToInsert);
        }

        revalidatePath('/admin/availability');
        revalidatePath('/book');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function addOverride(formData: FormData) {
    try {
        const date = formData.get('date') as string;
        const slotsStr = formData.get('slots') as string;
        const slots = slotsStr ? JSON.parse(slotsStr) : [];

        // Upsert by date
        await db.insert(availabilityOverrides).values({
            date,
            slots,
        }).onConflictDoUpdate({
            target: availabilityOverrides.date,
            set: { slots, updatedAt: new Date() }
        });

        revalidatePath('/admin/availability');
        revalidatePath('/book');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function deleteOverride(id: string) {
    try {
        await db.delete(availabilityOverrides).where(eq(availabilityOverrides.id, id));
        revalidatePath('/admin/availability');
        revalidatePath('/book');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}
