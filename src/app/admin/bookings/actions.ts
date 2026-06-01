'use server';

import { db } from '@/db';
import { bookings, eventTypes } from '@/db/schema';
import { eq, desc, gte, lt } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getAllBookings() {
  return db
    .select({
      id: bookings.id,
      bookingDate: bookings.bookingDate,
      startTime: bookings.startTime,
      endTime: bookings.endTime,
      clientName: bookings.clientName,
      clientEmail: bookings.clientEmail,
      customAnswers: bookings.customAnswers,
      paymentStatus: bookings.paymentStatus,
      meetingLink: bookings.meetingLink,
      createdAt: bookings.createdAt,
      eventTypeId: bookings.eventTypeId,
      eventTitle: eventTypes.title,
    })
    .from(bookings)
    .leftJoin(eventTypes, eq(bookings.eventTypeId, eventTypes.id))
    .orderBy(desc(bookings.bookingDate), desc(bookings.startTime));
}

export async function getUpcomingBookings() {
  const today = new Date().toISOString().split('T')[0];
  return db
    .select({
      id: bookings.id,
      bookingDate: bookings.bookingDate,
      startTime: bookings.startTime,
      endTime: bookings.endTime,
      clientName: bookings.clientName,
      clientEmail: bookings.clientEmail,
      paymentStatus: bookings.paymentStatus,
      meetingLink: bookings.meetingLink,
      eventTitle: eventTypes.title,
    })
    .from(bookings)
    .leftJoin(eventTypes, eq(bookings.eventTypeId, eventTypes.id))
    .where(gte(bookings.bookingDate, today))
    .orderBy(bookings.bookingDate, bookings.startTime);
}

export async function getPastBookings() {
  const today = new Date().toISOString().split('T')[0];
  return db
    .select({
      id: bookings.id,
      bookingDate: bookings.bookingDate,
      startTime: bookings.startTime,
      endTime: bookings.endTime,
      clientName: bookings.clientName,
      clientEmail: bookings.clientEmail,
      paymentStatus: bookings.paymentStatus,
      meetingLink: bookings.meetingLink,
      eventTitle: eventTypes.title,
    })
    .from(bookings)
    .leftJoin(eventTypes, eq(bookings.eventTypeId, eventTypes.id))
    .where(lt(bookings.bookingDate, today))
    .orderBy(desc(bookings.bookingDate), desc(bookings.startTime));
}

export async function updateBookingStatus(id: string, status: 'pending' | 'paid' | 'cancelled') {
  await db.update(bookings).set({ paymentStatus: status }).where(eq(bookings.id, id));
  revalidatePath('/admin/bookings');
  return { success: true };
}

export async function deleteBooking(id: string) {
  await db.delete(bookings).where(eq(bookings.id, id));
  revalidatePath('/admin/bookings');
  return { success: true };
}
