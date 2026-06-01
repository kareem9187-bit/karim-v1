import { db } from './index';
import {
  users, hero, welcomeChapters, stats, brands, services,
  faqs, socialLinks, contactInfo, siteSettings, eventTypes, availability,
} from './schema';
import { hash } from 'bcryptjs';

async function seed() {
  console.log('🌱 Seeding database...');

  // Admin user
  const hashedPassword = await hash('admin123', 12);
  await db.insert(users).values({
    email: 'admin@karimabdelaziz.com',
    name: 'Karim Abdelaziz',
    password: hashedPassword,
    role: 'admin',
  }).onConflictDoNothing();

  // Site settings
  await db.insert(siteSettings).values({
    id: 'main',
    siteName: 'Karim Abdelaziz',
    siteNameAr: 'كريم عبدالعزيز',
    description: 'Cinematic film director, video editor, and documentary storyteller based in Cairo.',
    themeColor: '#04060a',
  }).onConflictDoNothing();

  // Hero
  await db.insert(hero).values({
    id: 'main',
    name: 'Karim Abdelaziz',
    nameAr: 'كريم عبدالعزيز',
    greeting: 'Film Director & Video Editor',
    tagline: 'Cinematic editing, documentary storytelling, and brand content that <em>resonates</em>. Based in Cairo, working worldwide.',
    taglineAr: 'مونتاج سينمائي، أفلام وثائقية، ومحتوى <em>يوصل</em>. من القاهرة، للعالم.',
    ctaPrimaryText: 'See my work',
    ctaPrimaryTextAr: 'شوف أعمالي',
    ctaPrimaryLink: '/work',
    ctaSecondaryText: 'Book a call',
    ctaSecondaryTextAr: 'احجز مكالمة',
    ctaSecondaryLink: '/book',
  }).onConflictDoNothing();

  // Welcome chapters
  await db.insert(welcomeChapters).values([
    { order: 0, number: 'KA', suffix: null, label: 'Karim Abdelaziz', labelAr: 'كريم عبدالعزيز', phrase: '<strong>Karim</strong> Abdelaziz', phraseAr: '<strong>كريم</strong> عبدالعزيز', subText: 'A story told in numbers', subTextAr: 'قصة تُروى بالأرقام', isIntro: true, isFinal: false },
    { order: 1, number: '8', suffix: 'years', suffixAr: 'سنوات', label: 'Chapter 01 · The Beginning', labelAr: 'الفصل ٠١ · البداية', phrase: 'It started with a <em>borrowed camera</em> and a story to tell.', phraseAr: 'بدأت بـ<em>كاميرا مستعارة</em> وقصة لأرويها.', subText: '2017 — Cairo', subTextAr: '٢٠١٧ — القاهرة', isIntro: false, isFinal: false },
    { order: 2, number: '1318', suffix: '+', label: 'Chapter 02 · The Craft', labelAr: 'الفصل ٠٢ · الحرفة', phrase: '<strong>Projects shipped.</strong> Each one a chance to get a little sharper.', phraseAr: '<strong>مشروع منجز.</strong> كل واحد فرصة لأصبح أكثر دقة.', subText: 'From reels to feature films', subTextAr: 'من الريلز للأفلام الطويلة', isIntro: false, isFinal: false },
    { order: 3, number: '470', suffix: '+', label: 'Chapter 03 · The Trust', labelAr: 'الفصل ٠٣ · الثقة', phrase: '<strong>Clients</strong> who came back. <em>Trust is earned frame by frame.</em>', phraseAr: '<strong>عميل</strong> رجعوا تاني. <em>الثقة تُكتسب لقطة بلقطة.</em>', subText: 'Samsung · CUPRA · 9GAG · Artlist · Asus', subTextAr: 'Samsung · CUPRA · 9GAG · Artlist · Asus', isIntro: false, isFinal: false },
    { order: 4, number: '14', suffix: 'countries', suffixAr: 'دولة', label: 'Chapter 04 · The Reach', labelAr: 'الفصل ٠٤ · المدى', phrase: 'From Cairo, the work travels. <em>Egypt, the Gulf, Europe — and beyond.</em>', phraseAr: 'من القاهرة، الشغل بيسافر. <em>مصر، الخليج، أوروبا — وأبعد.</em>', subText: 'One studio · Global reach', subTextAr: 'استوديو واحد · انتشار عالمي', isIntro: false, isFinal: false },
    { order: 5, number: '200', suffix: '+', label: 'Chapter 05 · The Giveback', labelAr: 'الفصل ٠٥ · العطاء', phrase: '<strong>Editors mentored.</strong> The craft only grows when you <em>pass it on.</em>', phraseAr: '<strong>مونتير اتدرّب.</strong> الحرفة بتكبر لما <em>تنقلها لغيرك.</em>', subText: 'Cairo · Riyadh · Online — worldwide', subTextAr: 'القاهرة · الرياض · أونلاين — عالمياً', isIntro: false, isFinal: false },
    { order: 6, number: '', suffix: null, label: 'One More Number', labelAr: 'رقم أخير', phrase: 'The next one is <em>yours.</em>', phraseAr: 'الرقم القادم <em>ليك.</em>', subText: null, isIntro: false, isFinal: true },
  ]).onConflictDoNothing();

  // Stats
  await db.insert(stats).values([
    { order: 1, number: '8+', label: 'Years', labelAr: 'سنوات' },
    { order: 2, number: '1,318+', label: 'Projects', labelAr: 'مشروع' },
    { order: 3, number: '470+', label: 'Clients', labelAr: 'عميل' },
    { order: 4, number: '14', label: 'Countries', labelAr: 'دولة' },
  ]).onConflictDoNothing();

  // Brands
  await db.insert(brands).values([
    { order: 1, name: 'Samsung', style: null },
    { order: 2, name: 'CUPRA', style: 'bold-uppercase' },
    { order: 3, name: '9GAG', style: 'condensed' },
    { order: 4, name: 'Artlist', style: 'italic' },
    { order: 5, name: 'Asus', style: null },
  ]).onConflictDoNothing();

  // Services
  await db.insert(services).values([
    { order: 1, title: 'Film Direction', titleAr: 'إخراج أفلام', description: 'Cinematic storytelling from concept to final cut', descriptionAr: 'سرد سينمائي من الفكرة للمنتج النهائي', icon: 'film' },
    { order: 2, title: 'Video Editing', titleAr: 'مونتاج فيديو', description: 'Precision editing for commercials, docs, and brand content', descriptionAr: 'مونتاج دقيق للإعلانات والأفلام الوثائقية والمحتوى', icon: 'scissors' },
    { order: 3, title: 'Brand Content', titleAr: 'محتوى براندات', description: 'Content that builds brands and drives engagement', descriptionAr: 'محتوى يبني البراند ويزود التفاعل', icon: 'sparkles' },
  ]).onConflictDoNothing();

  // FAQ
  await db.insert(faqs).values([
    { order: 1, question: "What's your turnaround time?", questionAr: 'إيه مدة التسليم؟', answer: 'Depends on project scope. Typically 3-14 days.', answerAr: 'حسب حجم المشروع. عادةً من 3 لـ 14 يوم.' },
    { order: 2, question: 'Do you work with international clients?', questionAr: 'بتشتغل مع عملاء دوليين؟', answer: 'Yes! I work with clients in 14+ countries.', answerAr: 'أيوه! بشتغل مع عملاء في أكتر من 14 دولة.' },
    { order: 3, question: 'What software do you use?', questionAr: 'بتستخدم إيه برامج؟', answer: 'Premiere Pro, DaVinci Resolve, After Effects.', answerAr: 'Premiere Pro, DaVinci Resolve, After Effects.' },
    { order: 4, question: 'Can I see more work samples?', questionAr: 'ممكن أشوف أعمال أكتر؟', answer: 'Absolutely — book a call and I\'ll share relevant work.', answerAr: 'طبعاً — احجز مكالمة وهبعتلك أعمال مناسبة.' },
  ]).onConflictDoNothing();

  // Social links
  await db.insert(socialLinks).values([
    { order: 1, platform: 'instagram', url: 'https://instagram.com/karimabdelaziz', label: 'Instagram' },
    { order: 2, platform: 'youtube', url: 'https://youtube.com/@karimabdelaziz', label: 'YouTube' },
    { order: 3, platform: 'twitter', url: 'https://twitter.com/karimabdelaziz', label: 'Twitter' },
    { order: 4, platform: 'linkedin', url: 'https://linkedin.com/in/karimabdelaziz', label: 'LinkedIn' },
    { order: 5, platform: 'behance', url: 'https://behance.net/karimabdelaziz', label: 'Behance' },
  ]).onConflictDoNothing();

  // Contact info
  await db.insert(contactInfo).values({
    id: 'main',
    whatsapp: '+201234567890',
    email: 'hello@karimabdelaziz.com',
    tagline: "Let's create something cinematic together.",
    taglineAr: 'يلا نعمل حاجة سينمائية مع بعض.',
  }).onConflictDoNothing();

  // Booking: Event types
  await db.insert(eventTypes).values([
    { title: 'Discovery Call', slug: 'discovery-call', description: 'Quick 15-min call to discuss your project and see if we\'re a good fit.', durationMinutes: 15, price: '0', color: '#5fa3e0', isActive: true, startTimeIncrement: 15, minNoticeHours: 4, maxFutureDays: 30 },
    { title: 'Project Consultation', slug: 'project-consultation', description: '45-min deep dive into your project — scope, timeline, and creative direction.', durationMinutes: 45, price: '0', color: '#3a7fc7', isActive: true, startTimeIncrement: 30, minNoticeHours: 24, maxFutureDays: 60 },
    { title: 'Mentorship Session', slug: 'mentorship-session', description: '60-min 1-on-1 editing mentorship — bring your project, leave with clarity.', durationMinutes: 60, price: '50', color: '#224f81', isActive: true, startTimeIncrement: 30, minNoticeHours: 24, maxFutureDays: 60 },
  ]).onConflictDoNothing();

  // Booking: Availability (Sun-Thu, 10:00-18:00 Cairo time)
  await db.insert(availability).values([
    { dayOfWeek: 0, startTime: '10:00:00', endTime: '18:00:00' }, // Sunday
    { dayOfWeek: 1, startTime: '10:00:00', endTime: '18:00:00' }, // Monday
    { dayOfWeek: 2, startTime: '10:00:00', endTime: '18:00:00' }, // Tuesday
    { dayOfWeek: 3, startTime: '10:00:00', endTime: '18:00:00' }, // Wednesday
    { dayOfWeek: 4, startTime: '10:00:00', endTime: '18:00:00' }, // Thursday
  ]).onConflictDoNothing();

  console.log('✅ Seed complete!');
  process.exit(0);
}

seed().catch((e) => {
  console.error('❌ Seed failed:', e);
  process.exit(1);
});
