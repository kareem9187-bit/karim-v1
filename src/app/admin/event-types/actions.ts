'use server'

import { db } from '@/db'
import { eventTypes } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

function slugify(text: any): string {
    if (!text) return '';
    return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export async function addEventType(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = (formData.get('slug') as string) || slugify(title);

    const data: any = {
        title,
        slug,
        description: formData.get('description') as string || '',
        durationMinutes: parseInt(formData.get('duration_minutes') as string) || 30,
        price: (parseFloat(formData.get('price') as string) || 0).toString(),
        color: formData.get('color') as string || '#9b51e0',
        isActive: formData.get('is_active') === 'true',
        bufferBefore: parseInt(formData.get('buffer_before') as string) || 0,
        bufferAfter: parseInt(formData.get('buffer_after') as string) || 0,
        maxPerDay: formData.get('max_per_day') ? parseInt(formData.get('max_per_day') as string) : null,
        startTimeIncrement: parseInt(formData.get('start_time_increment') as string) || 30,
        timezoneDisplay: formData.get('timezone_display') as string || 'auto',
        lockedTimezone: formData.get('locked_timezone') as string || null,
        allowGuests: formData.get('allow_guests') === 'true',
        inviteeQuestions: JSON.parse(formData.get('invitee_questions') as string || '[]'),
        communicationMethods: JSON.parse(formData.get('communication_methods') as string || '["google_meet"]'),
        confirmationRedirect: formData.get('confirmation_redirect') as string || null,
        emailReminderHours: formData.get('email_reminder_hours') ? parseInt(formData.get('email_reminder_hours') as string) : null,
        emailFollowupHours: formData.get('email_followup_hours') ? parseInt(formData.get('email_followup_hours') as string) : null,
        minNoticeHours: parseInt(formData.get('min_notice_hours') as string) || 4,
        maxFutureDays: parseInt(formData.get('max_future_days') as string) || 60,
    };

    try {
        await db.insert(eventTypes).values(data);
        revalidatePath('/admin/event-types');
        revalidatePath('/book');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function updateEventType(formData: FormData) {
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const slug = (formData.get('slug') as string) || slugify(title);

    const data: any = {
        title,
        slug,
        description: formData.get('description') as string || '',
        durationMinutes: parseInt(formData.get('duration_minutes') as string) || 30,
        price: (parseFloat(formData.get('price') as string) || 0).toString(),
        color: formData.get('color') as string || '#9b51e0',
        isActive: formData.get('is_active') === 'true',
        bufferBefore: parseInt(formData.get('buffer_before') as string) || 0,
        bufferAfter: parseInt(formData.get('buffer_after') as string) || 0,
        maxPerDay: formData.get('max_per_day') ? parseInt(formData.get('max_per_day') as string) : null,
        startTimeIncrement: parseInt(formData.get('start_time_increment') as string) || 30,
        timezoneDisplay: formData.get('timezone_display') as string || 'auto',
        lockedTimezone: formData.get('locked_timezone') as string || null,
        allowGuests: formData.get('allow_guests') === 'true',
        inviteeQuestions: JSON.parse(formData.get('invitee_questions') as string || '[]'),
        communicationMethods: JSON.parse(formData.get('communication_methods') as string || '["google_meet"]'),
        confirmationRedirect: formData.get('confirmation_redirect') as string || null,
        emailReminderHours: formData.get('email_reminder_hours') ? parseInt(formData.get('email_reminder_hours') as string) : null,
        emailFollowupHours: formData.get('email_followup_hours') ? parseInt(formData.get('email_followup_hours') as string) : null,
        minNoticeHours: parseInt(formData.get('min_notice_hours') as string) || 4,
        maxFutureDays: parseInt(formData.get('max_future_days') as string) || 60,
        updatedAt: new Date(),
    };

    try {
        await db.update(eventTypes).set(data).where(eq(eventTypes.id, id));
        revalidatePath('/admin/event-types');
        revalidatePath('/book');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function deleteEventType(id: string) {
    try {
        await db.delete(eventTypes).where(eq(eventTypes.id, id));
        revalidatePath('/admin/event-types');
        revalidatePath('/book');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}
