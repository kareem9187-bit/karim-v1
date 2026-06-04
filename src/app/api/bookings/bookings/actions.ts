'use server'

import { db } from '@/db'
import { eventTypes, availabilityOverrides, availability, bookings } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Resend } from 'resend'
import { createGoogleMeetEvent } from '@/utils/google-calendar'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function getCairoOffset(date: Date) {
    return '+03:00';
}

export async function getAvailableSlots(dateStr: string, durationMinutes: number, eventTypeId?: string) {
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();

    let bufferBefore = 0, bufferAfter = 0, maxPerDay: number | null = null, increment = 30, minNoticeHours = 0;

    if (eventTypeId) {
        const et = await db.query.eventTypes.findFirst({
            where: eq(eventTypes.id, eventTypeId)
        });
        if (et) {
            bufferBefore = et.bufferBefore || 0;
            bufferAfter = et.bufferAfter || 0;
            maxPerDay = et.maxPerDay;
            increment = et.startTimeIncrement || 30;
            minNoticeHours = et.minNoticeHours || 0;
        }
    }

    const override = await db.query.availabilityOverrides.findFirst({
        where: eq(availabilityOverrides.date, dateStr)
    });

    let useOverride = false;
    let overrideSlots: any[] = [];
    if (override) {
        useOverride = true;
        overrideSlots = override.slots || [];
        if (overrideSlots.length === 0) return [];
    }

    let segments: { start_time: string; end_time: string }[] = [];
    if (useOverride) {
        segments = overrideSlots.map((s: any) => ({ start_time: s.start, end_time: s.end }));
    } else {
        const availabilities = await db.query.availability.findMany({
            where: eq(availability.dayOfWeek, dayOfWeek)
        });
        if (!availabilities || availabilities.length === 0) return [];
        segments = availabilities.map((a: any) => ({ start_time: a.startTime, end_time: a.endTime }));
    }

    const offset = getCairoOffset(new Date(dateStr));
    const slots: string[] = [];
    const now = new Date();
    const minNoticeTime = new Date(now.getTime() + minNoticeHours * 60 * 60 * 1000);

    for (const seg of segments) {
        let currentTime = new Date(`${dateStr}T${seg.start_time}${offset}`);
        const endTime = new Date(`${dateStr}T${seg.end_time}${offset}`);

        while (currentTime.getTime() + durationMinutes * 60000 <= endTime.getTime()) {
            const timeString = currentTime.toTimeString().substring(0, 5);
            const passesNotice = currentTime > minNoticeTime;
            if (passesNotice && !slots.includes(timeString)) {
                slots.push(timeString);
            }
            currentTime = new Date(currentTime.getTime() + increment * 60000);
        }
    }

    slots.sort();

    let filteredSlots: string[] = [...slots];

    const dayBookings = await db.query.bookings.findMany({
        where: eq(bookings.bookingDate, dateStr)
    });

    if (!dayBookings || dayBookings.length === 0) {
        if (maxPerDay !== null && maxPerDay <= 0) return [];
        return filteredSlots;
    }

    if (maxPerDay !== null) {
        const eventBookings = eventTypeId
            ? dayBookings.filter((b: any) => b.eventTypeId === eventTypeId).length
            : dayBookings.length;
        if (eventBookings >= maxPerDay) return [];
    }

    const finalAvailableSlots = filteredSlots.filter(slot => {
        const slotStart = new Date(`${dateStr}T${slot}:00${offset}`);
        const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60000);
        const bufferedStart = new Date(slotStart.getTime() - bufferBefore * 60000);
        const bufferedEnd = new Date(slotEnd.getTime() + bufferAfter * 60000);

        for (const booking of dayBookings) {
            const bookingStart = new Date(`${dateStr}T${booking.startTime}${offset}`);
            const bookingEnd = new Date(`${dateStr}T${booking.endTime}${offset}`);

            if (
                (bufferedStart >= bookingStart && bufferedStart < bookingEnd) ||
                (bufferedEnd > bookingStart && bufferedEnd <= bookingEnd) ||
                (bufferedStart <= bookingStart && bufferedEnd >= bookingEnd)
            ) {
                return false;
            }
        }
        return true;
    });

    return finalAvailableSlots;
}

export async function submitBooking(formData: FormData) {
    const event_type_id = formData.get('event_type_id') as string;
    const booking_date = formData.get('date') as string;
    const start_time = formData.get('time') as string;
    const duration_minutes = parseInt(formData.get('duration_minutes') as string);

    const firstName = formData.get('first_name') as string || '';
    const lastName = formData.get('last_name') as string || '';
    const client_name = (formData.get('name') as string) || `${firstName} ${lastName}`.trim();
    const client_email = formData.get('email') as string;
    const notes = formData.get('notes') as string;

    const offset = getCairoOffset(new Date(booking_date));
    const startDate = new Date(`${booking_date}T${start_time}:00${offset}`);
    const endDate = new Date(startDate.getTime() + duration_minutes * 60000);
    const end_time = endDate.toTimeString().substring(0, 8);

    const availableSlots = await getAvailableSlots(booking_date, duration_minutes, event_type_id);
    if (!availableSlots.includes(start_time.substring(0, 5))) {
        return { error: 'Sorry, this time slot was just booked by someone else. Please select another.' };
    }

    const eventType = await db.query.eventTypes.findFirst({
        where: eq(eventTypes.id, event_type_id)
    });

    const answers: Record<string, string> = {};
    if (notes) answers.notes = notes;
    for (const [key, val] of formData.entries()) {
        if (key.startsWith('question_')) {
            answers[key] = val as string;
        }
    }

    let meeting_link = 'Not generated yet';
    try {
        const googleEvent = await createGoogleMeetEvent({
            title: `${eventType?.title || 'Meeting'} with ${client_name}`,
            description: `Booked via website.\nClient: ${client_name} (${client_email})\nAnswers: ${JSON.stringify(answers)}`,
            startTime: startDate.toISOString(),
            endTime: endDate.toISOString(),
            guestEmail: client_email
        });
        if (googleEvent?.meetLink) {
            meeting_link = googleEvent.meetLink;
        }
    } catch (e: any) {
        console.error("Failed to create Google Calendar event:", e?.message || e);
    }

    try {
        await db.insert(bookings).values({
            eventTypeId: event_type_id,
            bookingDate: booking_date,
            startTime: `${start_time}:00`,
            endTime: end_time,
            clientName: client_name,
            clientEmail: client_email,
            customAnswers: answers,
            paymentStatus: 'pending',
            meetingLink: meeting_link
        });
    } catch (error) {
        console.error('Booking insertion error:', error);
        return { error: 'There was an issue processing your booking.' };
    }

    if (resend) {
        try {
            await resend.emails.send({
                from: 'Muhammed Mekky <contact@muhammedmekky.com>',
                to: client_email,
                subject: `Booking Confirmed — ${eventType?.title || 'Meeting'}`,
                html: `<p>Hi ${client_name},</p><p>Your booking for ${eventType?.title || 'Meeting'} on ${booking_date} at ${start_time} is confirmed.</p><p>Meet link: ${meeting_link}</p>`
            });
        } catch (emailError: any) {
            console.error('Failed to send booking confirmation email:', emailError);
        }
    }

    return { success: true };
}
