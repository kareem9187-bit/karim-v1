import {
  pgTable, text, integer, boolean, timestamp,
  json, decimal, date, time, uuid,
} from 'drizzle-orm/pg-core';

// ═══ AUTH ═══
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  password: text('password').notNull(),
  role: text('role', { enum: ['admin', 'editor'] }).default('admin').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ═══ SITE SETTINGS ═══
export const siteSettings = pgTable('site_settings', {
  id: text('id').primaryKey().default('main'),
  siteName: text('site_name').default('Karim Abdelaziz').notNull(),
  siteNameAr: text('site_name_ar'),
  description: text('description'),
  descriptionAr: text('description_ar'),
  keywords: text('keywords'),
  themeColor: text('theme_color').default('#04060a'),
  ogImage: text('og_image'),
  favicon: text('favicon'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══ WELCOME CHAPTERS ═══
export const welcomeChapters = pgTable('welcome_chapters', {
  id: uuid('id').primaryKey().defaultRandom(),
  order: integer('order').notNull(),
  number: text('number').notNull(),
  suffix: text('suffix'),
  suffixAr: text('suffix_ar'),
  label: text('label').notNull(),
  labelAr: text('label_ar'),
  phrase: text('phrase').notNull(),
  phraseAr: text('phrase_ar'),
  subText: text('sub_text'),
  subTextAr: text('sub_text_ar'),
  isIntro: boolean('is_intro').default(false),
  isFinal: boolean('is_final').default(false),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══ HERO ═══
export const hero = pgTable('hero', {
  id: text('id').primaryKey().default('main'),
  greeting: text('greeting'),
  greetingAr: text('greeting_ar'),
  name: text('name').default('Karim Abdelaziz').notNull(),
  nameAr: text('name_ar'),
  tagline: text('tagline'),
  taglineAr: text('tagline_ar'),
  ctaPrimaryText: text('cta_primary_text'),
  ctaPrimaryTextAr: text('cta_primary_text_ar'),
  ctaPrimaryLink: text('cta_primary_link'),
  ctaSecondaryText: text('cta_secondary_text'),
  ctaSecondaryTextAr: text('cta_secondary_text_ar'),
  ctaSecondaryLink: text('cta_secondary_link'),
  image: text('image'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══ STATS ═══
export const stats = pgTable('stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  order: integer('order').notNull(),
  number: text('number').notNull(),
  label: text('label').notNull(),
  labelAr: text('label_ar'),
  icon: text('icon'),
  active: boolean('active').default(true),
});

// ═══ BRANDS ═══
export const brands = pgTable('brands', {
  id: uuid('id').primaryKey().defaultRandom(),
  order: integer('order').notNull(),
  name: text('name').notNull(),
  logo: text('logo'),
  style: text('style'),
  active: boolean('active').default(true),
});

// ═══ SERVICES ═══
export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  order: integer('order').notNull(),
  title: text('title').notNull(),
  titleAr: text('title_ar'),
  description: text('description').notNull(),
  descriptionAr: text('description_ar'),
  icon: text('icon'),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══ PORTFOLIO WORK ═══
export const works = pgTable('works', {
  id: uuid('id').primaryKey().defaultRandom(),
  order: integer('order').notNull(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  titleAr: text('title_ar'),
  category: text('category').notNull(),
  categoryAr: text('category_ar'),
  description: text('description'),
  descriptionAr: text('description_ar'),
  thumbnail: text('thumbnail'),
  videoUrl: text('video_url'),
  featured: boolean('featured').default(false),
  comingSoon: boolean('coming_soon').default(false),
  active: boolean('active').default(true),
  serviceId: uuid('service_id').references(() => services.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══ TESTIMONIALS ═══
export const testimonials = pgTable('testimonials', {
  id: uuid('id').primaryKey().defaultRandom(),
  order: integer('order').notNull(),
  name: text('name').notNull(),
  role: text('role'),
  avatar: text('avatar'),
  text: text('text').notNull(),
  textAr: text('text_ar'),
  rating: integer('rating').default(5),
  isVideo: boolean('is_video').default(false),
  videoUrl: text('video_url'),
  isFeatured: boolean('is_featured').default(false),
  row: integer('row').default(1),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ═══ TRAINING ═══
export const trainingInfo = pgTable('training_info', {
  id: text('id').primaryKey().default('main'),
  title: text('title'),
  titleAr: text('title_ar'),
  description: text('description'),
  descriptionAr: text('description_ar'),
  points: json('points').$type<string[]>(),
  pointsAr: json('points_ar').$type<string[]>(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const trainingStats = pgTable('training_stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  order: integer('order').notNull(),
  number: text('number').notNull(),
  label: text('label').notNull(),
  labelAr: text('label_ar'),
});

// ═══ PROCESS STEPS ═══
export const processSteps = pgTable('process_steps', {
  id: uuid('id').primaryKey().defaultRandom(),
  order: integer('order').notNull(),
  title: text('title').notNull(),
  titleAr: text('title_ar'),
  description: text('description').notNull(),
  descriptionAr: text('description_ar'),
  icon: text('icon'),
  timeLabel: text('time_label'),
  timeLabelAr: text('time_label_ar'),
  active: boolean('active').default(true),
});

// ═══ ABOUT / STORY CHAPTERS ═══
export const storyChapters = pgTable('story_chapters', {
  id: uuid('id').primaryKey().defaultRandom(),
  order: integer('order').notNull(),
  eyebrow: text('eyebrow'),
  eyebrowAr: text('eyebrow_ar'),
  title: text('title').notNull(),
  titleAr: text('title_ar'),
  text: text('text'),
  textAr: text('text_ar'),
  image: text('image'),
  imageBadge: text('image_badge'),
  imageBadgeAr: text('image_badge_ar'),
  stats: json('stats').$type<{ number: string; label: string; labelAr?: string }[]>(),
  reversed: boolean('reversed').default(false),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══ COUNTRIES ═══
export const countries = pgTable('countries', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  nameAr: text('name_ar'),
  code: text('code').notNull(),
  flag: text('flag'),
  isHome: boolean('is_home').default(false),
  active: boolean('active').default(true),
});

// ═══ FAQ ═══
export const faqs = pgTable('faqs', {
  id: uuid('id').primaryKey().defaultRandom(),
  order: integer('order').notNull(),
  question: text('question').notNull(),
  questionAr: text('question_ar'),
  answer: text('answer').notNull(),
  answerAr: text('answer_ar'),
  active: boolean('active').default(true),
});

// ═══ SOCIAL LINKS ═══
export const socialLinks = pgTable('social_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  order: integer('order').notNull(),
  platform: text('platform').notNull(),
  url: text('url').notNull(),
  label: text('label'),
  icon: text('icon'),
  active: boolean('active').default(true),
});

// ═══ CONTACT INFO ═══
export const contactInfo = pgTable('contact_info', {
  id: text('id').primaryKey().default('main'),
  whatsapp: text('whatsapp'),
  email: text('email'),
  phone: text('phone'),
  tagline: text('tagline'),
  taglineAr: text('tagline_ar'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══ MEDIA LIBRARY ═══
export const media = pgTable('media', {
  id: uuid('id').primaryKey().defaultRandom(),
  url: text('url').notNull(),
  filename: text('filename').notNull(),
  type: text('type').notNull(),
  size: integer('size'),
  width: integer('width'),
  height: integer('height'),
  alt: text('alt'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ═══ CONTACT SUBMISSIONS ═══
export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  projectType: text('project_type'),
  budget: text('budget'),
  timeline: text('timeline'),
  message: text('message'),
  source: text('source'),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ═══ BOOKING: EVENT TYPES ═══
export const eventTypes = pgTable('event_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  durationMinutes: integer('duration_minutes').default(30).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).default('0'),
  color: text('color').default('#5fa3e0'),
  isActive: boolean('is_active').default(true),
  bufferBefore: integer('buffer_before').default(0),
  bufferAfter: integer('buffer_after').default(0),
  maxPerDay: integer('max_per_day'),
  startTimeIncrement: integer('start_time_increment').default(30),
  timezoneDisplay: text('timezone_display').default('auto'),
  lockedTimezone: text('locked_timezone'),
  allowGuests: boolean('allow_guests').default(false),
  inviteeQuestions: json('invitee_questions').$type<{ text: string; required: boolean; answer_type: string; status: boolean }[]>().default([]),
  communicationMethods: json('communication_methods').$type<string[]>().default(['google_meet']),
  confirmationRedirect: text('confirmation_redirect'),
  emailReminderHours: integer('email_reminder_hours'),
  emailFollowupHours: integer('email_followup_hours'),
  minNoticeHours: integer('min_notice_hours').default(4),
  maxFutureDays: integer('max_future_days').default(60),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══ BOOKING: AVAILABILITY ═══
export const availability = pgTable('availability', {
  id: uuid('id').primaryKey().defaultRandom(),
  dayOfWeek: integer('day_of_week').notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ═══ BOOKING: DATE OVERRIDES ═══
export const availabilityOverrides = pgTable('availability_overrides', {
  id: uuid('id').primaryKey().defaultRandom(),
  date: date('date').notNull().unique(),
  slots: json('slots').$type<{ start: string; end: string }[]>().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ═══ BOOKING: BOOKINGS ═══
export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventTypeId: uuid('event_type_id').references(() => eventTypes.id),
  bookingDate: date('booking_date').notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  clientName: text('client_name').notNull(),
  clientEmail: text('client_email').notNull(),
  customAnswers: json('custom_answers').$type<Record<string, string>>().default({}),
  paymentStatus: text('payment_status', { enum: ['pending', 'paid', 'cancelled'] }).default('pending'),
  meetingLink: text('meeting_link'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ═══ SETTINGS (key-value store for booking profile etc.) ═══
export const settings = pgTable('settings', {
  key: text('key').primaryKey(),
  value: json('value'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══ EMAILS ═══
export const emails = pgTable('emails', {
  id: uuid('id').primaryKey().defaultRandom(),
  resendId: text('resend_id'),
  direction: text('direction', { enum: ['sent', 'received'] }).notNull(),
  fromEmail: text('from_email').notNull(),
  fromName: text('from_name'),
  toEmail: text('to_email').notNull(),
  toName: text('to_name'),
  subject: text('subject').notNull(),
  body: text('body').notNull(),
  bodyText: text('body_text'),
  status: text('status', { enum: ['sent', 'delivered', 'bounced', 'failed'] }).default('sent'),
  read: boolean('read').default(false),
  starred: boolean('starred').default(false),
  folder: text('folder', { enum: ['inbox', 'sent', 'drafts', 'trash'] }).default('inbox'),
  threadId: text('thread_id'),
  replyToId: uuid('reply_to_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
