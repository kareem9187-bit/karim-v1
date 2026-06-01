import { db } from '@/db';
import { settings, eventTypes } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getBookingProfile() {
    try {
        const result = await db.select().from(settings).where(eq(settings.key, 'booking_profile')).limit(1);
        if (result && result.length > 0 && result[0].value) {
            return result[0].value as {
                name: string;
                welcome_message: string;
                avatar_url: string;
                language: string;
                timezone: string;
                date_format: string;
                time_format: string;
            };
        }
    } catch (error) {
        console.error('Error fetching booking profile:', error);
    }
    
    // Default fallback
    return {
        name: 'Karim Abdelaziz',
        welcome_message: 'Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.',
        avatar_url: '/assets/karim.jpg',
        language: 'en',
        timezone: 'Africa/Cairo',
        date_format: 'YYYY-MM-DD',
        time_format: '12h'
    };
}

export async function getActiveEventTypes() {
    try {
        const events = await db.select().from(eventTypes).where(eq(eventTypes.isActive, true));
        // Drizzle doesn't automatically sort by created_at in basic select unless specified with orderBy
        return events.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } catch (error) {
        console.error('Error fetching event types:', error);
        return [];
    }
}
