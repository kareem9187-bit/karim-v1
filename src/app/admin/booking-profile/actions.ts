'use server'

import { db } from '@/db'
import { settings } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export type BookingProfile = {
    name: string;
    welcome_message: string;
    language: string;
    date_format: string;
    time_format: string;
    timezone: string;
    avatar_url: string;
}

const DEFAULT_PROFILE: BookingProfile = {
    name: 'Karim Abdelaziz',
    welcome_message: 'Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.',
    language: 'en',
    date_format: 'MMM d, yyyy',
    time_format: '12h',
    timezone: 'Africa/Cairo',
    avatar_url: '/assets/karim.jpg',
};

export async function getBookingProfile(): Promise<BookingProfile> {
    const result = await db.select({ value: settings.value }).from(settings).where(eq(settings.key, 'booking_profile')).limit(1);
    const data = result.length > 0 ? result[0] : null;
    
    if (data?.value) {
        return { ...DEFAULT_PROFILE, ...(typeof data.value === 'string' ? JSON.parse(data.value) : data.value) };
    }
    return DEFAULT_PROFILE;
}

export async function updateBookingProfile(formData: FormData) {
    const profile: BookingProfile = {
        name: formData.get('name') as string || DEFAULT_PROFILE.name,
        welcome_message: formData.get('welcome_message') as string || DEFAULT_PROFILE.welcome_message,
        language: formData.get('language') as string || 'en',
        date_format: formData.get('date_format') as string || 'MMM d, yyyy',
        time_format: formData.get('time_format') as string || '12h',
        timezone: formData.get('timezone') as string || 'Africa/Cairo',
        avatar_url: formData.get('avatar_url') as string || DEFAULT_PROFILE.avatar_url,
    };

    try {
        await db.insert(settings).values({
            key: 'booking_profile',
            value: profile,
        }).onConflictDoUpdate({
            target: settings.key,
            set: { value: profile, updatedAt: new Date() }
        });
        
        revalidatePath('/admin/booking-profile');
        revalidatePath('/book');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}
