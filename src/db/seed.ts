import { db } from './index';
import {
  users, hero, welcomeChapters, stats, brands, services,
  faqs, socialLinks, contactInfo, siteSettings, eventTypes, availability,
  testimonials, processSteps, storyChapters, trainingInfo, trainingStats, countries,
} from './schema';
import { hash } from 'bcryptjs';
import { sql } from 'drizzle-orm/sql';

async function seed() {
  console.log('🌱 Seeding database with original index_33.html content...');

  // Clear existing data from targeted tables to avoid conflicts
  console.log('Cleaning existing tables...');
  await db.delete(welcomeChapters);
  await db.delete(stats);
  await db.delete(brands);
  await db.delete(services);
  await db.delete(testimonials);
  await db.delete(processSteps);
  await db.delete(storyChapters);
  await db.delete(faqs);
  await db.delete(socialLinks);
  await db.delete(countries);
  await db.delete(trainingStats);

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
    greeting: "Hi I'm",
    greetingAr: 'أهلاً، أنا',
    tagline: 'I edit branded videos that turn <em>viewers into customers.</em> Cinematic craft for brands that need their content to <em>perform</em> — not just look pretty.',
    taglineAr: 'بعمل فيديوهات براند بتحوّل <em>المشاهدين لعملاء.</em> حرفة سينمائية للبراندات اللي محتاجة محتواها <em>يحقق نتائج</em> — مش بس يبقى جميل.',
    ctaPrimaryText: 'Book a Free Discovery Call',
    ctaPrimaryTextAr: 'احجز جلسة استكشاف مجانية',
    ctaPrimaryLink: '#',
    ctaSecondaryText: 'See My Work',
    ctaSecondaryTextAr: 'شاهد أعمالي',
    ctaSecondaryLink: '#services',
    image: '/images/karim.jpg',
  }).onConflictDoUpdate({
    target: hero.id,
    set: {
      greeting: "Hi I'm",
      greetingAr: 'أهلاً، أنا',
      tagline: 'I edit branded videos that turn <em>viewers into customers.</em> Cinematic craft for brands that need their content to <em>perform</em> — not just look pretty.',
      taglineAr: 'بعمل فيديوهات براند بتحوّل <em>المشاهدين لعملاء.</em> حرفة سينمائية للبراندات اللي محتاجة محتواها <em>يحقق نتائج</em> — مش بس يبقى جميل.',
      ctaPrimaryText: 'Book a Free Discovery Call',
      ctaPrimaryTextAr: 'احجز جلسة استكشاف مجانية',
      ctaPrimaryLink: '#',
      ctaSecondaryText: 'See My Work',
      ctaSecondaryTextAr: 'شاهد أعمالي',
      ctaSecondaryLink: '#services',
      image: '/images/karim.jpg',
    }
  });

  // Welcome chapters
  await db.insert(welcomeChapters).values([
    { order: 0, number: 'KA', suffix: null, label: 'Karim Abdelaziz', labelAr: 'كريم عبدالعزيز', phrase: '<strong>Karim</strong> Abdelaziz', phraseAr: '<strong>كريم</strong> عبدالعزيز', subText: 'A story told in numbers', subTextAr: 'قصة تُروى بالأرقام', isIntro: true, isFinal: false },
    { order: 1, number: '8', suffix: 'years', suffixAr: 'سنوات', label: 'Chapter 01 · The Beginning', labelAr: 'الفصل ٠١ · البداية', phrase: 'It started with a <em>borrowed camera</em> and a story to tell.', phraseAr: 'بدأت بـ<em>كاميرا مستعارة</em> وقصة لأرويها.', subText: '2017 — Cairo', subTextAr: '٢٠١٧ — القاهرة', isIntro: false, isFinal: false },
    { order: 2, number: '1318', suffix: '+', label: 'Chapter 02 · The Craft', labelAr: 'الفصل ٠٢ · الحرفة', phrase: '<strong>Projects shipped.</strong> Each one a chance to get a little sharper.', phraseAr: '<strong>مشروع منجز.</strong> كل واحد فرصة لأصبح أكثر دقة.', subText: 'From reels to feature films', subTextAr: 'من الريلز للأفلام الطويلة', isIntro: false, isFinal: false },
    { order: 3, number: '470', suffix: '+', label: 'Chapter 03 · The Trust', labelAr: 'الفصل ٠٣ · الثقة', phrase: '<strong>Clients</strong> who came back. <em>Trust is earned frame by frame.</em>', phraseAr: '<strong>عميل</strong> رجعوا تاني. <em>الثقة تُكتسب لقطة بلقطة.</em>', subText: 'Samsung · CUPRA · 9GAG · Artlist · Asus', subTextAr: 'Samsung · CUPRA · 9GAG · Artlist · Asus', isIntro: false, isFinal: false },
    { order: 4, number: '14', suffix: 'countries', suffixAr: 'دولة', label: 'Chapter 04 · The Reach', labelAr: 'الفصل ٠٤ · المدى', phrase: 'From Cairo, the work travels. <em>Egypt, the Gulf, Europe — and beyond.</em>', phraseAr: 'من القاهرة، الشغل بيسافر. <em>مصر، الخليج، أوروبا — وأبعد.</em>', subText: 'One studio · Global reach', subTextAr: 'استوديو واحد · انتشار عالمي', isIntro: false, isFinal: false },
    { order: 5, number: '200', suffix: '+', label: 'Chapter 05 · The Giveback', labelAr: 'الفصل ٠٥ · العطاء', phrase: '<strong>Editors mentored.</strong> The craft only grows when you <em>pass it on.</em>', phraseAr: '<strong>مونتير اتدرّب.</strong> الحرفة بتكبر لما <em>تنقلها لغيرك.</em>', subText: 'Cairo · Riyadh · Online — worldwide', subTextAr: 'القاهرة · الرياض · أونلاين — عالمياً', isIntro: false, isFinal: false },
    { order: 6, number: '', suffix: null, label: 'One More Number', labelAr: 'رقم أخير', phrase: 'The next one is <em>yours.</em>', phraseAr: 'الرقم القادم <em>ليك.</em>', subText: null, isIntro: false, isFinal: true },
  ]);

  // Stats
  await db.insert(stats).values([
    { order: 1, number: '8+', label: 'Years', labelAr: 'سنوات' },
    { order: 2, number: '1,318+', label: 'Projects', labelAr: 'مشروع' },
    { order: 3, number: '470+', label: 'Clients', labelAr: 'عميل' },
    { order: 4, number: '14', label: 'Countries', labelAr: 'دولة' },
  ]);

  // Brands
  await db.insert(brands).values([
    { order: 1, name: 'Samsung', style: null },
    { order: 2, name: 'CUPRA', style: 'bold-uppercase' },
    { order: 3, name: '9GAG', style: 'condensed' },
    { order: 4, name: 'Artlist', style: 'italic' },
    { order: 5, name: 'Asus', style: null },
  ]);

  // Services (6 services from index_33.html)
  await db.insert(services).values([
    { order: 1, title: 'Video Editing', titleAr: 'مونتاج الفيديو', description: 'Cinematic cuts, seamless transitions, and color grading that turn raw footage into compelling visual stories.', descriptionAr: 'مونتاج سينمائي، انتقالات سلسة، وتدريج ألوان بيحوّل المواد الخام لقصص بصرية مؤثرة.', icon: 'editing' },
    { order: 2, title: 'Cinematography', titleAr: 'التصوير السينمائي', description: 'Full videography service — directing, shooting, and capturing footage with a cinematic eye.', descriptionAr: 'خدمة فيديو كاملة — إخراج، تصوير، والتقاط مواد بعين سينمائية.', icon: 'cinematography' },
    { order: 3, title: 'Social Content', titleAr: 'محتوى السوشيال', description: 'Reels, TikToks, and short-form content engineered for maximum reach and engagement.', descriptionAr: 'ريلز، تيك توك، ومحتوى قصير مصمم لأقصى وصول وتفاعل.', icon: 'social' },
    { order: 4, title: 'Documentary & Brand', titleAr: 'وثائقي وبراند', description: 'Long-form storytelling that captures brand identity, human stories, and real emotion.', descriptionAr: 'سرد طويل بيلتقط هوية البراند والقصص الإنسانية والإحساس الحقيقي.', icon: 'documentary' },
    { order: 5, title: 'Training & Mentorship', titleAr: 'تدريب وإرشاد', description: 'One-on-one and group coaching for editors and videographers ready to level up.', descriptionAr: 'جلسات فردية وجماعية للمونتيرز والمصورين الجاهزين يطوروا.', icon: 'mentorship' },
    { order: 6, title: 'Motion & Graphics', titleAr: 'موشن جرافيكس', description: 'Animated titles, logo reveals, and motion graphics that elevate production value.', descriptionAr: 'عناوين متحركة، شعارات، وموشن جرافيكس بترفع قيمة الإنتاج.', icon: 'motion' },
  ]);

  // Testimonials (both clientReviews and studentReviews)
  await db.insert(testimonials).values([
    // Client reviews (row 1 & 2 in client page)
    { order: 1, name: 'Ahmed Metwaly', role: 'Owner of Persona Gurus', text: "Kareem isn't just an editor. He's a creative force. His work consistently raised the quality of our content and his energy made every project better.", textAr: "كريم مش مجرد مونتير. هو طاقة إبداعية. شغله رفع مستوى المحتوى بتاعنا، وطاقته خلت كل مشروع أحسن.", rating: 5, isVideo: false, isFeatured: true, row: 1 },
    { order: 2, name: 'Mohamed Ghonaim', role: 'Owner of Yallastep Production', text: "Karim's creativity, professionalism, and videography skills had a real impact on our work at YallaStep. A top contributor and a true team player.", textAr: "إبداع كريم واحترافيته ومهاراته في التصوير كان ليها تأثير حقيقي على شغلنا في يلا ستب. مساهم متميز وعضو فريق حقيقي.", rating: 5, isVideo: false, isFeatured: true, row: 1 },
    { order: 3, name: 'Omar Ghanem', role: 'Owner of Blue Planet Production', text: "A highly organized, dedicated, fast, and professional video editor! He makes editing any project smooth and easy. I trust him to handle any large project we have.", textAr: "مونتير منظم ومتفاني وسريع ومحترف! بيخلي مونتاج أي مشروع سلس وسهل. باثق فيه إنه يتولى أي مشروع كبير عندنا.", rating: 5, isVideo: false, isFeatured: true, row: 1 },
    { order: 4, name: 'Khaled Mo', role: 'Owner of Tawseq', text: "Karim, I've seen your journey up close. We've worked together several times, and every time, it's been clear how much you've grown — constantly learning, upgrading your tools, and expanding your mindset.", textAr: "كريم، شفت رحلتك عن قرب. اشتغلنا مع بعض كذا مرة، وفي كل مرة كان واضح إنك بتتطور — بتتعلم باستمرار وبتحدّث أدواتك وبتوسّع تفكيرك.", rating: 5, isVideo: false, isFeatured: true, row: 1 },
    { order: 5, name: 'Sarah Ali', role: 'Marketing Director, Cairo', text: "Working with Karim transformed our brand presence. His attention to detail and storytelling instinct elevated every single piece of content we delivered.", textAr: "الشغل مع كريم غيّر حضور البراند بتاعنا. اهتمامه بالتفاصيل وحسه القصصي رفع مستوى كل قطعة محتوى قدّمناها.", rating: 5, isVideo: false, isFeatured: true, row: 1 },
    { order: 6, name: 'Hassan Tarek', role: 'Founder, NorthStar Media', text: "Karim brings a rare combination of technical mastery and creative vision. He understood our brand instantly and delivered work that exceeded all expectations.", textAr: "كريم بيجمع بين الإتقان التقني والرؤية الإبداعية بشكل نادر. فهم البراند بتاعنا فوراً وقدّم شغل فاق كل التوقعات.", rating: 5, isVideo: false, isFeatured: true, row: 1 },
    { order: 7, name: 'Layla Mansour', role: 'Content Lead, Saudi Arabia', text: "From concept to final cut, Karim's process is seamless. The reels he edited for our campaign hit record engagement numbers — pure magic.", textAr: "من الفكرة لحد الـ final cut، شغل كريم سلس جداً. الريلز اللي عملها للحملة بتاعتنا حققت أرقام تفاعل قياسية — سحر حقيقي.", rating: 5, isVideo: false, isFeatured: true, row: 1 },
    { order: 8, name: 'Yousef Kamal', role: 'CEO, MediaWorks Dubai', text: "What sets Karim apart is his commitment. Tight deadlines, complex briefs — he delivers cinematic quality every single time. A true professional.", textAr: "اللي بيميّز كريم هو التزامه. مواعيد ضيقة، بريفات معقدة — بيقدّم جودة سينمائية كل مرة. محترف حقيقي.", rating: 5, isVideo: false, isFeatured: true, row: 1 },

    // Student reviews (for mentorship section, marked with row: 0)
    { order: 9, name: 'Student A', role: 'Micro Mentorship', text: "The session was excellent and I genuinely benefited from it. Portfolio rated 8/10 with fair, focused feedback on the points I need to work on. Definitely going to the next level. Karim saved me time and clearly answered my 'how' questions — he focuses on a specific type of editing and sharpens the skills with details. He always identifies what separates a beginner from a mid-level from a senior. Final rating: 9/10.", textAr: "السيشن كانت كويسة جداً واستفدت فعلاً منها. تقييم البورتفوليو كان 8/10 وكان تقييم عادل مع التركيز على بعض النقاط اللي لو اتعملت أكيد هدخل في النكست ليفل. كريم وفّر وقت وأجاب سؤال إزاي بيباه عن طريق التركيز على نوع معين من الإيديت وصقل المهارة فيه بالتفاصيل دايماً في عين المتخصص هي اللي بتفرق المبتدئ عن المتوسط عن السينيور. التقييم 9/10.", rating: 5, isVideo: false, isFeatured: false, row: 0 },
    { order: 10, name: 'Student B', role: 'Micro Mentorship', text: "Karim helped me a lot — honestly, anyone who hasn't been through this path doesn't really understand how things work. I learned a ton and I'm going to start applying everything I was told. The portfolio review was precise — he identified my weak points clearly. He saved me real time. The most practical thing was him personally pointing out my weaknesses and giving me real solutions from his industry experience. 100% honest rating.", textAr: "أكيد ساعدني بشكل كبير فعلاً، أنا اللي مش حد مش مش الطريق قبلي وفهم الدنيا ماشية إزاي فعلاً والله استفدت كتير وهبدا أطبّق كل اللي اتقالي من باشمهندس كريم. تقييم البورتفوليو كان بشكل دقيق عرّفني نقاط الضعف اللي أنا محتاج أركّز عليها فعلاً ووراني العميل هيشوف البروتفوليو إزاي في تقييمي ليه 10 والله مش مبالغة. أكيد وفرت عليا وقت وورّاني أنا محتاج أركّز على إيه فعلاً عشان أوصل للمستوى اللي عايزه. التقييم بصدق 100% فعلاً.", rating: 5, isVideo: false, isFeatured: false, row: 0 },
    { order: 11, name: 'Student C', role: 'Micro Mentorship', text: "It helped me so much. Was very strong. I was scattered between many things and I figured out the most important thing for me — my niche — so I can move forward without hesitation. Pricing was the hardest part for me to figure out, and he made it a huge problem solved. The way Karim communicates is amazing. The content is incredible. Hoping we sit again because Karim has serious experience in this market, mashallah.", textAr: "ساعدتني جداً جداً، كانت قوية جداً جداً. كنت مشتت بين حاجات كتير أبدا فيها وعرفت أهم حاجة بالنسبالي اللي هي النيش اللي هقدر من خلالها انطلق للآخر مش هبقى واخد نص خطوة عشان التردد مع أساسيات الديزاين عشان حاجة زي الكومبوزيشن. جزء التسعير لإنه كان أصعب حاجة أقدر أحدّدها وعاملي مشكلة كبيرة. العفوية اللي اتكلمنا بيها كانت هايلة جداً. المحتوى رائع، وأكيد أتمنى كل فترة نقعد تاني لأنه كريم عنده خبرة في السوق كويسة ما شاء الله.", rating: 5, isVideo: false, isFeatured: false, row: 0 },
    { order: 12, name: 'Student D', role: 'Micro Mentorship', text: "Very helpful. Rated it 11/10 — I was able to talk with someone who genuinely understood what I was saying with ease. The whole discussion was open and saved me time on things I needed to talk about more. Karim handled the time really smoothly. The online notes he writes appear with me in full. Solid 11/10.", textAr: "جداً جداً. التقييم 11/10. جداً عشان قدرت أتكلم مع حد فاهم اللي بقوله بسهولة. المناقشة كلها بشكل عام وفرت عليا وقت اتكلم في حاجات أكتر وطبعاً إن كريم تعامل بسلاسة في موضوع الوقت. يكون في أونلاين نوت من اللي بيكتبه كريم بيظهر لي معاه في الكول. التقييم 11/10.", rating: 5, isVideo: false, isFeatured: false, row: 0 },
    { order: 13, name: 'Student E', role: 'Micro Mentorship', text: "Honestly, it made a real difference and gave my brain a complete restart. The session shifted things massively for me. I rate it 100/10. It actually pulled me out of confusion I was in. Karim and I discussed pricing, task division, and how to deal with clients in depth. Karim doesn't need any development — he's brilliant and skilled, mashallah.", textAr: "حقيقي فرق معايا جداً وعمل ريستارت في دماغي. السيشن فرق معايا جداً. التقييم 100/10. هي فعلاً زفرت توهة أنا كنت فيها. فرقت معايا في موضوع التسعير وتقسيم المهام وكيفية التعامل مع العملاء جداً. مش محتاجة تطوير، كريم شاطر جداً ما شاء الله.", rating: 5, isVideo: false, isFeatured: false, row: 0 },

    // Student video review placeholders (is_video: true)
    { order: 14, name: 'Student A', role: 'Mentorship Graduate', text: "Video testimonial coming soon", textAr: "شهادة فيديو قريباً", rating: 5, isVideo: true, isFeatured: false, row: 0, videoUrl: '#' },
    { order: 15, name: 'Student B', role: 'Mentorship Graduate', text: "Video testimonial coming soon", textAr: "شهادة فيديو قريباً", rating: 5, isVideo: true, isFeatured: false, row: 0, videoUrl: '#' },
    { order: 16, name: 'Student C', role: 'Mentorship Graduate', text: "Video testimonial coming soon", textAr: "شهادة فيديو قريباً", rating: 5, isVideo: true, isFeatured: false, row: 0, videoUrl: '#' },
    { order: 17, name: 'Student D', role: 'Mentorship Graduate', text: "Video testimonial coming soon", textAr: "شهادة فيديو قريباً", rating: 5, isVideo: true, isFeatured: false, row: 0, videoUrl: '#' },
  ] as (typeof testimonials.$inferInsert)[]);

  // Process Steps
  await db.insert(processSteps).values([
    { order: 1, title: 'Discovery Call', titleAr: 'جلسة الاستكشاف', description: 'A free 30-min call to understand your vision, goals, audience, and timeline. No commitment.', descriptionAr: 'مكالمة مجانية ٣٠ دقيقة نفهم فيها رؤيتك وأهدافك وجمهورك. بدون أي التزام.', icon: 'discovery', timeLabel: '30 min · Free', timeLabelAr: '٣٠ دقيقة · مجاناً' },
    { order: 2, title: 'Custom Proposal', titleAr: 'عرض مخصص', description: 'You receive a clear proposal: scope, deliverables, timeline, and transparent pricing — within 24 hours.', descriptionAr: 'بتستلم عرض واضح: نطاق الشغل، الـ deliverables، المدة، والتسعير الشفاف — خلال ٢٤ ساعة.', icon: 'proposal', timeLabel: 'Within 24 hours', timeLabelAr: 'خلال ٢٤ ساعة' },
    { order: 3, title: 'Production & Edit', titleAr: 'الإنتاج والمونتاج', description: "I get to work — shooting, editing, color grading, sound. You get progress updates and a preview before final cut.", descriptionAr: 'ببدأ شغل — تصوير، مونتاج، تصحيح ألوان، صوت. بتاخد تحديثات منتظمة و preview قبل الـ final cut.', icon: 'production', timeLabel: '3-14 days typical', timeLabelAr: '٣ - ١٤ يوم غالباً' },
    { order: 4, title: 'Delivery & Revisions', titleAr: 'التسليم والمراجعات', description: 'You get the final files in all formats you need. 2 free rounds of revisions to make it perfect.', descriptionAr: 'بتستلم الملفات النهائية في كل الصيغ اللي محتاجها. مع جولتين مراجعة مجانية للوصول للنتيجة المثالية.', icon: 'delivery', timeLabel: 'Same day delivery', timeLabelAr: 'تسليم في نفس اليوم' },
  ]);

  // Story Chapters
  await db.insert(storyChapters).values([
    {
      order: 1,
      eyebrow: 'Chapter One', eyebrowAr: 'الفصل الأول',
      title: 'A boy with a <em>camera.</em>', titleAr: 'ولد ومعاه <em>كاميرا.</em>',
      text: 'It started in 2017. A borrowed camera. A small editing program. And a stubborn belief that stories deserved to be told the right way.',
      textAr: 'بدأت في ٢٠١٧. كاميرا مستعارة. برنامج مونتاج بسيط. وإيمان عنيد إن القصص لازم تتروى صح.',
      image: '/images/karim.jpg', imageBadge: '2017', imageBadgeAr: '٢٠١٧',
      stats: [], reversed: false
    },
    {
      order: 2,
      eyebrow: 'Chapter Two', eyebrowAr: 'الفصل الثاني',
      title: 'The first <em>spark.</em>', titleAr: 'أول <em>شرارة.</em>',
      text: 'The first project paid in experience, not money. Then the second. Then the tenth. Each cut taught me something the last one didn\'t.',
      textAr: 'أول مشروع كان دفعه خبرة مش فلوس. وبعدين التاني. وبعدين العاشر. كل مونتاج علّمني حاجة جديدة.',
      image: null, imageBadge: null, imageBadgeAr: null,
      stats: [{ number: '100', label: 'early projects', labelAr: 'مشروع البداية' }],
      reversed: true
    },
    {
      order: 3,
      eyebrow: 'Chapter Three', eyebrowAr: 'الفصل الثالث',
      title: 'Mastering the <em>craft.</em>', titleAr: 'إتقان <em>الحرفة.</em>',
      text: 'Eight years of late nights. Of color grading until sunrise. Of rebuilding sequences three times to find the one cut that makes it sing.',
      textAr: '٨ سنين من السهر. من تدريج الألوان لحد طلوع الشمس. من إعادة بناء السكوينس ٣ مرات عشان نلاقي المونتاج اللي بيخلي الفيلم يغني.',
      image: '/images/karim.jpg', imageBadge: 'The craft', imageBadgeAr: 'الحرفة',
      stats: [
        { number: '1318', label: 'projects shipped', labelAr: 'مشروع منجز' },
        { number: '8', label: 'years crafting', labelAr: 'سنوات إبداع' }
      ],
      reversed: false
    },
    {
      order: 4,
      eyebrow: 'Chapter Four', eyebrowAr: 'الفصل الرابع',
      title: 'Stories that <em>travel.</em>', titleAr: 'قصص <em>بتسافر.</em>',
      text: 'From Cairo, the work reached fourteen countries. From small startups to global brands like Samsung, CUPRA, and Artlist. Every story unique. Every cut intentional.',
      textAr: 'من القاهرة، الشغل وصل لـ ١٤ دولة. من شركات ناشئة صغيرة لبراندات عالمية زي Samsung، CUPRA و Artlist. كل قصة فريدة. كل قطعة مونتاج مقصودة.',
      image: null, imageBadge: null, imageBadgeAr: null,
      stats: [
        { number: '14', label: 'countries', labelAr: 'دولة' },
        { number: '470', label: 'clients', labelAr: 'عميل' }
      ],
      reversed: true
    },
    {
      order: 5,
      eyebrow: 'And Today', eyebrowAr: 'واليوم',
      title: 'The story <em>continues.</em>', titleAr: 'القصة <em>مستمرة.</em>',
      text: 'Still chasing that perfect cut. Still up at 3am refining a sequence. Still believing every brand has a story worth telling — and that I\'m here to tell it.',
      textAr: 'لسه ببحث عن المونتاج المثالي. لسه صاحي الساعة ٣ الفجر بحسّن سكوينس. لسه مؤمن إن كل براند عنده قصة تستاهل تتحكي — وإني هنا عشان أحكيها.',
      image: null, imageBadge: null, imageBadgeAr: null,
      stats: [], reversed: false
    }
  ]);

  // Countries (for the world map pinouts)
  await db.insert(countries).values([
    { name: 'USA', code: 'USA', flag: '🇺🇸', isHome: false },
    { name: 'Canada', code: 'CAN', flag: '🇨🇦', isHome: false },
    { name: 'United Kingdom', code: 'GBR', flag: '🇬🇧', isHome: false },
    { name: 'Norway', code: 'NOR', flag: '🇳🇴', isHome: false },
    { name: 'Turkey', code: 'TUR', flag: '🇹🇷', isHome: false },
    { name: 'Syria', code: 'SYR', flag: '🇸🇾', isHome: false },
    { name: 'Lebanon', code: 'LBN', flag: '🇱🇧', isHome: false },
    { name: 'Iraq', code: 'IRQ', flag: '🇮🇶', isHome: false },
    { name: 'Jordan', code: 'JOR', flag: '🇯🇴', isHome: false },
    { name: 'Egypt', code: 'EGY', flag: '🇪🇬', isHome: true },
    { name: 'Kuwait', code: 'KWT', flag: '🇰🇼', isHome: false },
    { name: 'Saudi Arabia', code: 'SAU', flag: '🇸🇦', isHome: false },
    { name: 'UAE', code: 'ARE', flag: '🇦🇪', isHome: false },
    { name: 'Australia', code: 'AUS', flag: '🇦🇺', isHome: false },
  ]);

  // FAQs
  await db.insert(faqs).values([
    { order: 1, question: "How fast do you reply?", questionAr: "بترد بسرعة قد إيه؟", answer: "Within 24 hours — usually much faster.", answerAr: "خلال ٢٤ ساعة — وغالباً أسرع بكتير." },
    { order: 2, question: "Do you work remote?", questionAr: "بتشتغل عن بُعد؟", answer: "Yes — I work with clients globally across 14 countries.", answerAr: "أيوه — بشتغل مع عملاء حول العالم في ١٤ دولة." },
    { order: 3, question: "What's your typical budget?", questionAr: "ما هي ميزانيتك المعتادة؟", answer: "Flexible — let's discuss your scope first, then I'll propose options.", answerAr: "مرنة — هنناقش نطاق المشروع الأول، وبعدين هقترح خيارات." },
    { order: 4, question: "Languages?", questionAr: "اللغات؟", answer: "Bilingual production — Arabic & English fluently.", answerAr: "إنتاج ثنائي اللغة — عربي وإنجليزي بطلاقة." },
  ]);

  // Social Links
  await db.insert(socialLinks).values([
    { order: 1, platform: 'instagram', url: 'https://instagram.com/karimabdelaziz', label: 'Instagram', icon: 'fa-brands fa-instagram' },
    { order: 2, platform: 'tiktok', url: 'https://tiktok.com/@karimabdelaziz', label: 'TikTok', icon: 'fa-brands fa-tiktok' },
    { order: 3, platform: 'linkedin', url: 'https://linkedin.com/in/karimabdelaziz', label: 'LinkedIn', icon: 'fa-brands fa-linkedin' },
    { order: 4, platform: 'youtube', url: 'https://youtube.com/@karimabdelaziz', label: 'YouTube', icon: 'fa-brands fa-youtube' },
  ]);

  // Contact Info
  await db.insert(contactInfo).values({
    id: 'main',
    whatsapp: '+201234567890',
    email: 'hello@karimabdelaziz.com',
    phone: null,
    tagline: 'Have a project in mind? Book a free 30-min discovery call — no pressure, just a real conversation about your vision.',
    taglineAr: 'عندك مشروع في بالك؟ احجز جلسة استكشاف مجانية ٣٠ دقيقة — بدون أي ضغط، مجرد حوار حقيقي حول رؤيتك.',
  }).onConflictDoUpdate({
    target: contactInfo.id,
    set: {
      whatsapp: '+201234567890',
      email: 'hello@karimabdelaziz.com',
      tagline: 'Have a project in mind? Book a free 30-min discovery call — no pressure, just a real conversation about your vision.',
      taglineAr: 'عندك مشروع في بالك؟ احجز جلسة استكشاف مجانية ٣٠ دقيقة — بدون أي ضغط، مجرد حوار حقيقي حول رؤيتك.',
    }
  });

  // Training Info
  await db.insert(trainingInfo).values({
    id: 'main',
    title: 'Editing mentorship.',
    titleAr: 'برنامج تدريب المونتاج',
    description: 'Focused, practical training for aspiring editors and videographers who want real-world skills — not textbook theory.',
    descriptionAr: 'تدريب عملي ومركز للمونتيرز والمصورين الطامحين اللي عايزين مهارات حقيقية — مش نظريات.',
    points: [
      'Premiere Pro & DaVinci Resolve workflows',
      'Color grading & LUT creation',
      'Short-form editing for Reels & TikTok',
      'Storytelling and pacing techniques',
      'Building your portfolio & finding clients'
    ],
    pointsAr: [
      'سير عمل Premiere Pro و DaVinci Resolve',
      'تدريج الألوان وصنع LUTs',
      'مونتاج المحتوى القصير للريلز والتيك توك',
      'تقنيات السرد والإيقاع',
      'بناء البورتفوليو والوصول للعملاء'
    ],
  }).onConflictDoUpdate({
    target: trainingInfo.id,
    set: {
      title: 'Editing mentorship.',
      titleAr: 'برنامج تدريب المونتاج',
      description: 'Focused, practical training for aspiring editors and videographers who want real-world skills — not textbook theory.',
      descriptionAr: 'تدريب عملي ومركز للمونتيرز والمصورين الطامحين اللي عايزين مهارات حقيقية — مش نظريات.',
      points: [
        'Premiere Pro & DaVinci Resolve workflows',
        'Color grading & LUT creation',
        'Short-form editing for Reels & TikTok',
        'Storytelling and pacing techniques',
        'Building your portfolio & finding clients'
      ],
      pointsAr: [
        'سير عمل Premiere Pro و DaVinci Resolve',
        'تدريج الألوان وصنع LUTs',
        'مونتاج المحتوى القصير للريلز والتيك توك',
        'تقنيات السرد والإيقاع',
        'بناء البورتفوليو والوصول للعملاء'
      ],
    }
  });

  // Training Stats
  await db.insert(trainingStats).values([
    { order: 1, number: '200+', label: 'Students Trained', labelAr: 'طالب مدرّب' },
    { order: 2, number: '1:1', label: 'Personalized', labelAr: 'جلسات فردية' },
    { order: 3, number: 'Online', label: 'Available Worldwide', labelAr: 'متاح عالمياً' },
  ]);

  // Booking: Event types
  await db.insert(eventTypes).values([
    { title: 'Discovery Call', slug: 'discovery-call', description: 'Quick 15-min call to discuss your project and see if we\'re a good fit.', durationMinutes: 15, price: '0', color: '#5fa3e0', isActive: true, startTimeIncrement: 15, minNoticeHours: 4, maxFutureDays: 30 },
    { title: 'Project Consultation', slug: 'project-consultation', description: '45-min deep dive into your project Deep scope and direction.', durationMinutes: 45, price: '0', color: '#3a7fc7', isActive: true, startTimeIncrement: 30, minNoticeHours: 24, maxFutureDays: 60 },
  ]).onConflictDoNothing();

  // Booking: Availability (Sun-Thu, 10:00-18:00 Cairo time)
  await db.insert(availability).values([
    { dayOfWeek: 0, startTime: '10:00:00', endTime: '18:00:00' }, // Sunday
    { dayOfWeek: 1, startTime: '10:00:00', endTime: '18:00:00' }, // Monday
    { dayOfWeek: 2, startTime: '10:00:00', endTime: '18:00:00' }, // Tuesday
    { dayOfWeek: 3, startTime: '10:00:00', endTime: '18:00:00' }, // Wednesday
    { dayOfWeek: 4, startTime: '10:00:00', endTime: '18:00:00' }, // Thursday
  ]).onConflictDoNothing();

  console.log('✅ Seeding complete!');
  process.exit(0);
}

seed().catch((e) => {
  console.error('❌ Seeding failed:', e);
  process.exit(1);
});
