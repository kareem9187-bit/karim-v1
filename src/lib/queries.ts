import { db } from '@/db';
import {
  hero, welcomeChapters, stats, brands, services, works,
  testimonials, trainingInfo, trainingStats, storyChapters,
  countries, faqs, socialLinks, contactInfo, siteSettings,
  media, contactSubmissions, eventTypes, availability,
  availabilityOverrides, bookings, settings,
} from '@/db/schema';
import { eq, asc, desc, and, gte, lt } from 'drizzle-orm';

// ═══ SITE ═══
export const q = {

  // Settings
  siteSettings: () =>
    db.select().from(siteSettings).limit(1).then(r => r[0] ?? null),

  // Hero
  hero: () =>
    db.select().from(hero).limit(1).then(r => r[0] ?? null),

  // Welcome chapters
  welcomeChapters: {
    active: () =>
      db.select().from(welcomeChapters)
        .where(eq(welcomeChapters.active, true))
        .orderBy(asc(welcomeChapters.order)),
    all: () =>
      db.select().from(welcomeChapters).orderBy(asc(welcomeChapters.order)),
  },

  // Stats
  stats: {
    active: () =>
      db.select().from(stats)
        .where(eq(stats.active, true))
        .orderBy(asc(stats.order)),
    all: () =>
      db.select().from(stats).orderBy(asc(stats.order)),
  },

  // Brands
  brands: {
    active: () =>
      db.select().from(brands)
        .where(eq(brands.active, true))
        .orderBy(asc(brands.order)),
    all: () =>
      db.select().from(brands).orderBy(asc(brands.order)),
  },

  // Services
  services: {
    active: () =>
      db.select().from(services)
        .where(eq(services.active, true))
        .orderBy(asc(services.order)),
    all: () =>
      db.select().from(services).orderBy(asc(services.order)),
    byId: (id: string) =>
      db.select().from(services).where(eq(services.id, id)).limit(1).then(r => r[0] ?? null),
  },

  // Works
  works: {
    active: () =>
      db.select().from(works)
        .where(eq(works.active, true))
        .orderBy(asc(works.order)),
    all: () =>
      db.select().from(works).orderBy(asc(works.order)),
    bySlug: (slug: string) =>
      db.select().from(works).where(eq(works.slug, slug)).limit(1).then(r => r[0] ?? null),
    featured: () =>
      db.select().from(works)
        .where(and(eq(works.active, true), eq(works.featured, true)))
        .orderBy(asc(works.order)),
  },

  // Testimonials
  testimonials: {
    active: () =>
      db.select().from(testimonials)
        .where(eq(testimonials.active, true))
        .orderBy(asc(testimonials.order)),
    all: () =>
      db.select().from(testimonials).orderBy(asc(testimonials.order)),
    featured: () =>
      db.select().from(testimonials)
        .where(eq(testimonials.isFeatured, true))
        .limit(1)
        .then(r => r[0] ?? null),
    byRow: (row: number) =>
      db.select().from(testimonials)
        .where(and(eq(testimonials.active, true), eq(testimonials.row, row)))
        .orderBy(asc(testimonials.order)),
  },

  // Training
  trainingInfo: () =>
    db.select().from(trainingInfo).limit(1).then(r => r[0] ?? null),
  trainingStats: () =>
    db.select().from(trainingStats).orderBy(asc(trainingStats.order)),

  // Story chapters (About)
  storyChapters: {
    active: () =>
      db.select().from(storyChapters)
        .where(eq(storyChapters.active, true))
        .orderBy(asc(storyChapters.order)),
    all: () =>
      db.select().from(storyChapters).orderBy(asc(storyChapters.order)),
  },

  // Countries
  countries: {
    active: () =>
      db.select().from(countries)
        .where(eq(countries.active, true))
        .orderBy(asc(countries.name)),
  },

  // FAQs
  faqs: {
    active: () =>
      db.select().from(faqs)
        .where(eq(faqs.active, true))
        .orderBy(asc(faqs.order)),
    all: () =>
      db.select().from(faqs).orderBy(asc(faqs.order)),
  },

  // Social links
  socialLinks: {
    active: () =>
      db.select().from(socialLinks)
        .where(eq(socialLinks.active, true))
        .orderBy(asc(socialLinks.order)),
    all: () =>
      db.select().from(socialLinks).orderBy(asc(socialLinks.order)),
  },

  // Contact info
  contactInfo: () =>
    db.select().from(contactInfo).limit(1).then(r => r[0] ?? null),

  // Media
  media: {
    all: () =>
      db.select().from(media).orderBy(desc(media.createdAt)),
    byType: (type: 'image' | 'video') =>
      db.select().from(media)
        .where(eq(media.type, type))
        .orderBy(desc(media.createdAt)),
  },

  // Contact submissions
  submissions: {
    all: () =>
      db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)),
    unread: () =>
      db.select().from(contactSubmissions)
        .where(eq(contactSubmissions.read, false))
        .orderBy(desc(contactSubmissions.createdAt)),
  },

  // ═══ BOOKING ═══

  eventTypes: {
    active: () =>
      db.select().from(eventTypes)
        .where(eq(eventTypes.isActive, true))
        .orderBy(asc(eventTypes.createdAt)),
    all: () =>
      db.select().from(eventTypes).orderBy(asc(eventTypes.createdAt)),
    bySlug: (slug: string) =>
      db.select().from(eventTypes)
        .where(eq(eventTypes.slug, slug))
        .limit(1)
        .then(r => r[0] ?? null),
    byId: (id: string) =>
      db.select().from(eventTypes)
        .where(eq(eventTypes.id, id))
        .limit(1)
        .then(r => r[0] ?? null),
  },

  availability: {
    all: () =>
      db.select().from(availability).orderBy(asc(availability.dayOfWeek)),
    byDay: (dayOfWeek: number) =>
      db.select().from(availability).where(eq(availability.dayOfWeek, dayOfWeek)),
  },

  availabilityOverrides: {
    all: () =>
      db.select().from(availabilityOverrides).orderBy(asc(availabilityOverrides.date)),
    byDate: (date: string) =>
      db.select().from(availabilityOverrides)
        .where(eq(availabilityOverrides.date, date))
        .limit(1)
        .then(r => r[0] ?? null),
  },

  bookings: {
    all: () =>
      db.select({
        id: bookings.id,
        bookingDate: bookings.bookingDate,
        startTime: bookings.startTime,
        endTime: bookings.endTime,
        clientName: bookings.clientName,
        clientEmail: bookings.clientEmail,
        paymentStatus: bookings.paymentStatus,
        meetingLink: bookings.meetingLink,
        createdAt: bookings.createdAt,
        eventTypeId: bookings.eventTypeId,
        eventTitle: eventTypes.title,
      })
      .from(bookings)
      .leftJoin(eventTypes, eq(bookings.eventTypeId, eventTypes.id))
      .orderBy(desc(bookings.bookingDate)),

    upcoming: () => {
      const today = new Date().toISOString().split('T')[0];
      return db.select({
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
      .orderBy(asc(bookings.bookingDate), asc(bookings.startTime));
    },

    past: () => {
      const today = new Date().toISOString().split('T')[0];
      return db.select({
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
      .orderBy(desc(bookings.bookingDate));
    },

    byDate: (date: string) =>
      db.select().from(bookings).where(eq(bookings.bookingDate, date)),
  },

  bookingProfile: async () => {
    const [row] = await db.select().from(settings)
      .where(eq(settings.key, 'booking_profile')).limit(1);
    return row?.value ?? {
      name: 'Karim Abdelaziz',
      welcome_message: 'Film director & video editor based in Cairo.',
      avatar_url: '/images/avatar.jpg',
      language: 'en',
      timezone: 'Africa/Cairo',
      date_format: 'MMM d, yyyy',
      time_format: '12h',
    };
  },
};
