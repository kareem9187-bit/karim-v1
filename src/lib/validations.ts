import { z } from 'zod';

export const UuidSchema = z.string().uuid();

export const PaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export const HeroSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  nameAr: z.string().optional(),
  greeting: z.string().optional(),
  greetingAr: z.string().optional(),
  tagline: z.string().optional(),
  taglineAr: z.string().optional(),
  ctaPrimaryText: z.string().optional(),
  ctaPrimaryTextAr: z.string().optional(),
  ctaPrimaryLink: z.string().optional(),
  ctaSecondaryText: z.string().optional(),
  ctaSecondaryTextAr: z.string().optional(),
  ctaSecondaryLink: z.string().optional(),
  image: z.string().url().optional().or(z.literal('')),
});

export const StatSchema = z.object({
  order: z.coerce.number().min(0),
  number: z.string().min(1),
  label: z.string().min(1),
  labelAr: z.string().optional(),
  icon: z.string().optional(),
  active: z.coerce.boolean().default(true),
});

export const BrandSchema = z.object({
  order: z.coerce.number().min(0),
  name: z.string().min(1),
  logo: z.string().optional(),
  style: z.enum(['italic', 'bold-uppercase', 'condensed', '']).optional(),
  active: z.coerce.boolean().default(true),
});

export const ServiceSchema = z.object({
  order: z.coerce.number().min(0),
  title: z.string().min(1),
  titleAr: z.string().optional(),
  description: z.string().min(1),
  descriptionAr: z.string().optional(),
  icon: z.string().optional(),
  active: z.coerce.boolean().default(true),
});

export const WorkSchema = z.object({
  order: z.coerce.number().min(0),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens'),
  title: z.string().min(1),
  titleAr: z.string().optional(),
  category: z.string().min(1),
  categoryAr: z.string().optional(),
  description: z.string().optional(),
  descriptionAr: z.string().optional(),
  thumbnail: z.string().optional(),
  videoUrl: z.string().optional(),
  featured: z.coerce.boolean().default(false),
  comingSoon: z.coerce.boolean().default(false),
  active: z.coerce.boolean().default(true),
  serviceId: z.string().uuid().optional().or(z.literal('')),
});

export const TestimonialSchema = z.object({
  order: z.coerce.number().min(0),
  name: z.string().min(1),
  role: z.string().optional(),
  avatar: z.string().optional(),
  text: z.string().min(1),
  textAr: z.string().optional(),
  rating: z.coerce.number().min(1).max(5).default(5),
  isVideo: z.coerce.boolean().default(false),
  videoUrl: z.string().optional(),
  isFeatured: z.coerce.boolean().default(false),
  row: z.coerce.number().min(1).max(2).default(1),
  active: z.coerce.boolean().default(true),
});

export const FaqSchema = z.object({
  order: z.coerce.number().min(0),
  question: z.string().min(1),
  questionAr: z.string().optional(),
  answer: z.string().min(1),
  answerAr: z.string().optional(),
  active: z.coerce.boolean().default(true),
});

export const EventTypeSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  durationMinutes: z.coerce.number().min(5).max(480),
  price: z.string().default('0'),
  color: z.string().default('#5fa3e0'),
  isActive: z.coerce.boolean().default(true),
  bufferBefore: z.coerce.number().min(0).default(0),
  bufferAfter: z.coerce.number().min(0).default(0),
  maxPerDay: z.coerce.number().optional().nullable(),
  startTimeIncrement: z.coerce.number().min(5).default(30),
  timezoneDisplay: z.enum(['auto', 'locked']).default('auto'),
  lockedTimezone: z.string().optional(),
  allowGuests: z.coerce.boolean().default(false),
  minNoticeHours: z.coerce.number().min(0).default(4),
  maxFutureDays: z.coerce.number().min(1).default(60),
  emailReminderHours: z.coerce.number().optional().nullable(),
  emailFollowupHours: z.coerce.number().optional().nullable(),
  confirmationRedirect: z.string().url().optional().or(z.literal('')),
});

export const BookingSubmitSchema = z.object({
  event_type_id: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  duration_minutes: z.coerce.number().min(5).max(480),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  notes: z.string().optional(),
  communication_method: z.string().optional(),
  guests: z.string().optional(),
});

export const ContactSubmitSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});
