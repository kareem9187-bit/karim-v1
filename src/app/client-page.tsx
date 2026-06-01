"use client";

import { SpaNavbar } from '@/components/public/SpaNavbar';
import { useEffect } from 'react';

export default function ClientPage({ 
  heroData,
  servicesData,
  statsData,
  brandsData,
  testimonialsData,
  trainingData,
  trainingStatsData,
  processData,
  storyData,
  countriesData,
  faqsData,
  socialData,
  worksData
}: { 
  heroData: any,
  servicesData: any[],
  statsData: any[],
  brandsData: any[],
  testimonialsData: any[],
  trainingData: any,
  trainingStatsData: any[],
  processData: any[],
  storyData: any[],
  countriesData: any[],
  faqsData: any[],
  socialData: any[],
  worksData?: any[]
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__WORKS_DATA__ = worksData;
    }
  }, [worksData]);

  return (
    <main>
{/* ══════════════════ LOADING SCREEN ══════════════════ */}
<div id="pageLoader" className="page-loader">
  <div className="loader-inner">
    <div className="loader-logo">
      <img src="/images/karim.jpg" id="loaderPhotoBase" className="loader-photo-base" alt="Karim" />
      <img src="/images/karim.jpg" id="loaderPhotoColor" className="loader-photo-color" alt="Karim" />
    </div>
    <div className="loader-name">Karim Abdelaziz</div>
    <div className="loader-bar"><div className="loader-bar-fill" id="loaderBarFill"></div></div>
    <div className="loader-percentage" id="loaderPercentage">0%</div>
  </div>
</div>

{/* ══════════════════ PAGE TRANSITION OVERLAY ══════════════════ */}
<div className="page-transition" id="pageTransition">
  <div className="page-transition-panel"></div>
  <div className="page-transition-panel"></div>
  <div className="page-transition-panel"></div>
</div>

{/* ══════════════════ WELCOME SECTION ══════════════════ */}
<div id="welcome-section">


{/* Scroll track (gives scrollable length) */}
<div className="scroll-track"></div>

{/* Fixed viewport where everything renders */}
<div className="viewport">
  {/* Atmosphere */}
  <div className="orb orb1"></div>
  <div className="orb orb2"></div>
  <div className="orb orb3"></div>

  {/* Photo reveal layer */}
  <div className="photo-reveal" id="photoReveal">
    <div className="photo-reveal-img" id="photoRevealImg"></div>
  </div>

  {/* Stage */}
  <div className="stage" id="stage">

    {/* Chapter 0 — INTRO */}
    <div className="chapter chapter-intro active" data-chapter="0">
      <div className="chapter-inner">
        <div className="intro-logo">
          <img src="/images/karim.jpg" alt="Karim" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
        </div>
        <h1 className="intro-title" data-en='<strong>Karim</strong> Abdelaziz' data-ar='<strong>كريم</strong> عبدالعزيز'><strong>Karim</strong> Abdelaziz</h1>
        <p className="intro-sub" data-en="A story told in numbers" data-ar="قصة تُروى بالأرقام">A story told in numbers</p>
      </div>
    </div>

    {/* Chapter 1 — 8 YEARS */}
    <div className="chapter" data-chapter="1">
      <div className="chap-glow"></div>
      <div className="chapter-inner">
        <div className="chap-label">
          <div className="chap-label-line"></div>
          <span data-en="Chapter 01 · The Beginning" data-ar="الفصل ٠١ · البداية">Chapter 01 · The Beginning</span>
          <div className="chap-label-line"></div>
        </div>
        <div className="chap-number"><span className="num-counter" data-target="8">0</span><span className="num-suffix" data-en="years" data-ar="سنوات">years</span></div>
        <p className="chap-phrase" data-en='It started with a <em>borrowed camera</em> and a story to tell.' data-ar='بدأت بـ<em>كاميرا مستعارة</em> وقصة لأرويها.'>It started with a <em>borrowed camera</em> and a story to tell.</p>
        <div className="chap-sub" data-en="2017 — Cairo" data-ar="٢٠١٧ — القاهرة">2017 — Cairo</div>
      </div>
    </div>

    {/* Chapter 2 — 1,318 PROJECTS */}
    <div className="chapter" data-chapter="2">
      <div className="chap-glow"></div>
      <div className="chapter-inner">
        <div className="chap-label">
          <div className="chap-label-line"></div>
          <span data-en="Chapter 02 · The Craft" data-ar="الفصل ٠٢ · الحرفة">Chapter 02 · The Craft</span>
          <div className="chap-label-line"></div>
        </div>
        <div className="chap-number"><span className="num-counter" data-target="1318">0</span><span className="num-suffix">+</span></div>
        <p className="chap-phrase" data-en='<strong>Projects shipped.</strong> Each one a chance to get a little sharper.' data-ar='<strong>مشروع منجز.</strong> كل واحد فرصة لأصبح أكثر دقة.'><strong>Projects shipped.</strong> Each one a chance to get a little sharper.</p>
        <div className="chap-sub" data-en="From reels to feature films" data-ar="من الريلز للأفلام الطويلة">From reels to feature films</div>
      </div>
    </div>

    {/* Chapter 3 — 470 CLIENTS */}
    <div className="chapter" data-chapter="3">
      <div className="chap-glow"></div>
      <div className="chapter-inner">
        <div className="chap-label">
          <div className="chap-label-line"></div>
          <span data-en="Chapter 03 · The Trust" data-ar="الفصل ٠٣ · الثقة">Chapter 03 · The Trust</span>
          <div className="chap-label-line"></div>
        </div>
        <div className="chap-number"><span className="num-counter" data-target="470">0</span><span className="num-suffix">+</span></div>
        <p className="chap-phrase" data-en='<strong>Clients</strong> who came back. <em>Trust is earned frame by frame.</em>' data-ar='<strong>عميل</strong> رجعوا تاني. <em>الثقة تُكتسب لقطة بلقطة.</em>'><strong>Clients</strong> who came back. <em>Trust is earned frame by frame.</em></p>
        <div className="chap-sub" data-en="Samsung · CUPRA · 9GAG · Artlist · Asus" data-ar="Samsung · CUPRA · 9GAG · Artlist · Asus">Samsung · CUPRA · 9GAG · Artlist · Asus</div>
      </div>
    </div>

    {/* Chapter 4 — 14 COUNTRIES */}
    <div className="chapter" data-chapter="4">
      <div className="chap-glow"></div>
      <div className="chapter-inner">
        <div className="chap-label">
          <div className="chap-label-line"></div>
          <span data-en="Chapter 04 · The Reach" data-ar="الفصل ٠٤ · المدى">Chapter 04 · The Reach</span>
          <div className="chap-label-line"></div>
        </div>
        <div className="chap-number"><span className="num-counter" data-target="14">0</span><span className="num-suffix" data-en="countries" data-ar="دولة">countries</span></div>
        <p className="chap-phrase" data-en='From Cairo, the work travels. <em>Egypt, the Gulf, Europe — and beyond.</em>' data-ar='من القاهرة، الشغل بيسافر. <em>مصر، الخليج، أوروبا — وأبعد.</em>'>From Cairo, the work travels. <em>Egypt, the Gulf, Europe — and beyond.</em></p>
        <div className="chap-sub" data-en="One studio · Global reach" data-ar="استوديو واحد · انتشار عالمي">One studio · Global reach</div>
      </div>
    </div>

    {/* Chapter 5 — 200+ STUDENTS */}
    <div className="chapter" data-chapter="5">
      <div className="chap-glow"></div>
      <div className="chapter-inner">
        <div className="chap-label">
          <div className="chap-label-line"></div>
          <span data-en="Chapter 05 · The Giveback" data-ar="الفصل ٠٥ · العطاء">Chapter 05 · The Giveback</span>
          <div className="chap-label-line"></div>
        </div>
        <div className="chap-number"><span className="num-counter" data-target="200">0</span><span className="num-suffix">+</span></div>
        <p className="chap-phrase" data-en='<strong>Editors mentored.</strong> The craft only grows when you <em>pass it on.</em>' data-ar='<strong>مونتير اتدرّب.</strong> الحرفة بتكبر لما <em>تنقلها لغيرك.</em>'><strong>Editors mentored.</strong> The craft only grows when you <em>pass it on.</em></p>
        <div className="chap-sub" data-en="Cairo · Riyadh · Online — worldwide" data-ar="القاهرة · الرياض · أونلاين — عالمياً">Cairo · Riyadh · Online — worldwide</div>
      </div>
    </div>

    {/* Chapter 6 — FINAL CTA */}
    <div className="chapter chapter-final" data-chapter="6">
      <div className="chap-glow"></div>
      <div className="chapter-inner">
        <div className="chap-label">
          <div className="chap-label-line"></div>
          <span data-en="One More Number" data-ar="رقم أخير">One More Number</span>
          <div className="chap-label-line"></div>
        </div>
        <h2 className="final-title" data-en='The next one is <em>yours.</em>' data-ar='الرقم القادم <em>ليك.</em>'>The next one is <em>yours.</em></h2>

      </div>
    </div>

  </div>
</div>

{/* Top Bar */}
<div className="top-bar">
  <div className="brand-mark">
    <div className="brand-mark-logo">
      <img src="/images/karim.jpg" alt="Karim" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
    </div>
    <span data-en="Karim Abdelaziz" data-ar="كريم عبدالعزيز">Karim Abdelaziz</span>
  </div>
  <div className="top-actions flex flex-col md:flex-row gap-4">
    <button className="lang-btn" id="langBtn">العربية</button>
  </div>
</div>

{/* Large floating skip button (always visible during welcome) */}
<button className="skip-btn-floating" onClick={() => { if(typeof window !== "undefined" && (window as any).enterSite) { (window as any).enterSite() } } } id="welcomeSkipBtn">
  <span data-en="Skip to Portfolio" data-ar="تخطي للمعرض">Skip to Portfolio</span>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
</button>

{/* Progress Rail (vertical line on left) */}
<div className="progress-rail">
  <div className="rail-track">
    <div className="rail-fill" id="railFill"></div>
    <div className="loader-logo">
      <img src="/images/karim.jpg" id="loaderPhotoBase" className="loader-photo-base" alt="Karim" />
      <img src="/images/karim.jpg" id="loaderPhotoColor" className="loader-photo-color" alt="Karim" />
    </div>
    <div className="loader-name">Karim Abdelaziz</div>
    <div className="loader-bar"><div className="loader-bar-fill" id="loaderBarFill"></div></div>
    <div className="loader-percentage" id="loaderPercentage">0%</div>
  </div>
</div>

{/* ══════════════════ PAGE TRANSITION OVERLAY ══════════════════ */}
<div className="page-transition" id="pageTransition">
  <div className="page-transition-panel"></div>
  <div className="page-transition-panel"></div>
  <div className="page-transition-panel"></div>
</div>

{/* ══════════════════ WELCOME SECTION ══════════════════ */}
<div id="welcome-section">


{/* Scroll track (gives scrollable length) */}
<div className="scroll-track"></div>

{/* Fixed viewport where everything renders */}
<div className="viewport">
  {/* Atmosphere */}
  <div className="orb orb1"></div>
  <div className="orb orb2"></div>
  <div className="orb orb3"></div>

  {/* Photo reveal layer */}
  <div className="photo-reveal" id="photoReveal">
    <div className="photo-reveal-img" id="photoRevealImg"></div>
  </div>

  {/* Stage */}
  <div className="stage" id="stage">

    {/* Chapter 0 — INTRO */}
    <div className="chapter chapter-intro active" data-chapter="0">
      <div className="chapter-inner">
        <div className="intro-logo">
          <img src="/images/karim.jpg" alt="Karim" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
        </div>
        <h1 className="intro-title" data-en='<strong>Karim</strong> Abdelaziz' data-ar='<strong>كريم</strong> عبدالعزيز'><strong>Karim</strong> Abdelaziz</h1>
        <p className="intro-sub" data-en="A story told in numbers" data-ar="قصة تُروى بالأرقام">A story told in numbers</p>
      </div>
    </div>

    {/* Chapter 1 — 8 YEARS */}
    <div className="chapter" data-chapter="1">
      <div className="chap-glow"></div>
      <div className="chapter-inner">
        <div className="chap-label">
          <div className="chap-label-line"></div>
          <span data-en="Chapter 01 · The Beginning" data-ar="الفصل ٠١ · البداية">Chapter 01 · The Beginning</span>
          <div className="chap-label-line"></div>
        </div>
        <div className="chap-number"><span className="num-counter" data-target="8">0</span><span className="num-suffix" data-en="years" data-ar="سنوات">years</span></div>
        <p className="chap-phrase" data-en='It started with a <em>borrowed camera</em> and a story to tell.' data-ar='بدأت بـ<em>كاميرا مستعارة</em> وقصة لأرويها.'>It started with a <em>borrowed camera</em> and a story to tell.</p>
        <div className="chap-sub" data-en="2017 — Cairo" data-ar="٢٠١٧ — القاهرة">2017 — Cairo</div>
      </div>
    </div>

    {/* Chapter 2 — 1,318 PROJECTS */}
    <div className="chapter" data-chapter="2">
      <div className="chap-glow"></div>
      <div className="chapter-inner">
        <div className="chap-label">
          <div className="chap-label-line"></div>
          <span data-en="Chapter 02 · The Craft" data-ar="الفصل ٠٢ · الحرفة">Chapter 02 · The Craft</span>
          <div className="chap-label-line"></div>
        </div>
        <div className="chap-number"><span className="num-counter" data-target="1318">0</span><span className="num-suffix">+</span></div>
        <p className="chap-phrase" data-en='<strong>Projects shipped.</strong> Each one a chance to get a little sharper.' data-ar='<strong>مشروع منجز.</strong> كل واحد فرصة لأصبح أكثر دقة.'><strong>Projects shipped.</strong> Each one a chance to get a little sharper.</p>
        <div className="chap-sub" data-en="From reels to feature films" data-ar="من الريلز للأفلام الطويلة">From reels to feature films</div>
      </div>
    </div>

    {/* Chapter 3 — 470 CLIENTS */}
    <div className="chapter" data-chapter="3">
      <div className="chap-glow"></div>
      <div className="chapter-inner">
        <div className="chap-label">
          <div className="chap-label-line"></div>
          <span data-en="Chapter 03 · The Trust" data-ar="الفصل ٠٣ · الثقة">Chapter 03 · The Trust</span>
          <div className="chap-label-line"></div>
        </div>
        <div className="chap-number"><span className="num-counter" data-target="470">0</span><span className="num-suffix">+</span></div>
        <p className="chap-phrase" data-en='<strong>Clients</strong> who came back. <em>Trust is earned frame by frame.</em>' data-ar='<strong>عميل</strong> رجعوا تاني. <em>الثقة تُكتسب لقطة بلقطة.</em>'><strong>Clients</strong> who came back. <em>Trust is earned frame by frame.</em></p>
        <div className="chap-sub" data-en="Samsung · CUPRA · 9GAG · Artlist · Asus" data-ar="Samsung · CUPRA · 9GAG · Artlist · Asus">Samsung · CUPRA · 9GAG · Artlist · Asus</div>
      </div>
    </div>

    {/* Chapter 4 — 14 COUNTRIES */}
    <div className="chapter" data-chapter="4">
      <div className="chap-glow"></div>
      <div className="chapter-inner">
        <div className="chap-label">
          <div className="chap-label-line"></div>
          <span data-en="Chapter 04 · The Reach" data-ar="الفصل ٠٤ · المدى">Chapter 04 · The Reach</span>
          <div className="chap-label-line"></div>
        </div>
        <div className="chap-number"><span className="num-counter" data-target="14">0</span><span className="num-suffix" data-en="countries" data-ar="دولة">countries</span></div>
        <p className="chap-phrase" data-en='From Cairo, the work travels. <em>Egypt, the Gulf, Europe — and beyond.</em>' data-ar='من القاهرة، الشغل بيسافر. <em>مصر، الخليج، أوروبا — وأبعد.</em>'>From Cairo, the work travels. <em>Egypt, the Gulf, Europe — and beyond.</em></p>
        <div className="chap-sub" data-en="One studio · Global reach" data-ar="استوديو واحد · انتشار عالمي">One studio · Global reach</div>
      </div>
    </div>

    {/* Chapter 5 — 200+ STUDENTS */}
    <div className="chapter" data-chapter="5">
      <div className="chap-glow"></div>
      <div className="chapter-inner">
        <div className="chap-label">
          <div className="chap-label-line"></div>
          <span data-en="Chapter 05 · The Giveback" data-ar="الفصل ٠٥ · العطاء">Chapter 05 · The Giveback</span>
          <div className="chap-label-line"></div>
        </div>
        <div className="chap-number"><span className="num-counter" data-target="200">0</span><span className="num-suffix">+</span></div>
        <p className="chap-phrase" data-en='<strong>Editors mentored.</strong> The craft only grows when you <em>pass it on.</em>' data-ar='<strong>مونتير اتدرّب.</strong> الحرفة بتكبر لما <em>تنقلها لغيرك.</em>'><strong>Editors mentored.</strong> The craft only grows when you <em>pass it on.</em></p>
        <div className="chap-sub" data-en="Cairo · Riyadh · Online — worldwide" data-ar="القاهرة · الرياض · أونلاين — عالمياً">Cairo · Riyadh · Online — worldwide</div>
      </div>
    </div>

    {/* Chapter 6 — FINAL CTA */}
    <div className="chapter chapter-final" data-chapter="6">
      <div className="chap-glow"></div>
      <div className="chapter-inner">
        <div className="chap-label">
          <div className="chap-label-line"></div>
          <span data-en="One More Number" data-ar="رقم أخير">One More Number</span>
          <div className="chap-label-line"></div>
        </div>
        <h2 className="final-title" data-en='The next one is <em>yours.</em>' data-ar='الرقم القادم <em>ليك.</em>'>The next one is <em>yours.</em></h2>

      </div>
    </div>

  </div>
</div>

{/* Top Bar */}
<div className="top-bar">
  <div className="brand-mark">
    <div className="brand-mark-logo">
      <img src="/images/karim.jpg" alt="Karim" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
    </div>
    <span data-en="Karim Abdelaziz" data-ar="كريم عبدالعزيز">Karim Abdelaziz</span>
  </div>
  <div className="top-actions flex flex-col md:flex-row gap-4">
    <button className="lang-btn" id="langBtn">العربية</button>
  </div>
</div>

{/* Large floating skip button (always visible during welcome) */}
<button className="skip-btn-floating" onClick={() => { if(typeof window !== "undefined" && (window as any).enterSite) { (window as any).enterSite() } } } id="welcomeSkipBtn">
  <span data-en="Skip to Portfolio" data-ar="تخطي للمعرض">Skip to Portfolio</span>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
</button>

{/* Progress Rail (vertical line on left) */}
<div className="progress-rail">
  <div className="rail-track">
    <div className="rail-fill" id="railFill"></div>
  </div>
  <div className="rail-labels" id="railLabels"></div>
</div>

{/* Chapter counter */}
<div className="chapter-counter">
  <span className="chapter-counter-current" id="chapterCurrent">01</span>
  <div className="chapter-counter-divider"></div>
  <span data-en="of 07" data-ar="من ٠٧">of 07</span>
</div>

{/* Scroll hint */}
<div className="scroll-hint" id="scrollHint">
  <span data-en="Scroll to begin" data-ar="مرر للبدء">Scroll to begin</span>
  <div className="scroll-hint-icon"></div>
</div>



</div>

{/* ══════════════════ PORTFOLIO SECTION ══════════════════ */}
<div id="portfolio-section">


<div className="atmosphere"></div>
<div className="orb orb-1"></div>
<div className="orb orb-2"></div>
<div className="orb orb-3"></div>

{/* NAV */}
<SpaNavbar />

{/* HERO (original style with portrait BG) */}
<section id="hero" data-page="home">
  <div className="hero-image">
    <div className="photo-bg" style={{ backgroundImage: heroData?.image ? `url(${heroData.image})` : undefined }}></div>
  </div>
  <div className="hero-content">
    <div className="hero-greet" data-en={heroData?.greeting || "Hi I'm"} data-ar={heroData?.greetingAr || "أهلاً، أنا"}>{heroData?.greeting || "Hi I'm"}</div>
    <h1 className="hero-name" data-en-only="true">
      <span style={{ display: 'block' }}>{heroData?.name ? heroData.name.split(' ')[0] : 'Karim'}</span>
      <span style={{ display: 'block' }}>{heroData?.name ? heroData.name.split(' ').slice(1).join(' ') : 'Abdelaziz'}</span>
    </h1>
    <h1 className="hero-name" data-ar-only="true" style={{ display: 'none' }}>
      {heroData?.nameAr || 'كريم عبدالعزيز'}
    </h1>
    <p 
      className="hero-tagline" 
      data-en={heroData?.tagline || "I edit branded videos that turn <em>viewers into customers.</em>"} 
      data-ar={heroData?.taglineAr || "بعمل فيديوهات براند بتحوّل <em>المشاهدين لعملاء.</em>"}
      dangerouslySetInnerHTML={{ __html: heroData?.tagline || "I edit branded videos that turn <em>viewers into customers.</em> Cinematic craft for brands that need their content to <em>perform</em> — not just look pretty." }}
    ></p>
    <div className="hero-ctas flex flex-col md:flex-row gap-4">
      <a href="#work" onClick={(e) => { e.preventDefault(); if(typeof window !== "undefined" && window.spaGo) { window.spaGo('work'); } } } className="cta-secondary">
        <span data-en="See My Work" data-ar="شاهد أعمالي">See My Work</span>
      </a>
    </div>
    <div className="hero-trust">
      <div className="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span data-en="Free 30-min consultation" data-ar="استشارة مجانية ٣٠ دقيقة">Free 30-min consultation</span>
      </div>
      <div className="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span data-en="No commitment required" data-ar="بدون أي التزام">No commitment required</span>
      </div>
      <div className="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span data-en="Reply within 24h" data-ar="رد خلال ٢٤ ساعة">Reply within 24h</span>
      </div>
    </div>
  </div>
</section>

{/* ═══════════════════ HOME — BRANDS TEASER ═══════════════════ */}
<section id="home-brands" data-page="home">
  <div className="container">
    <div className="home-brands-wrap reveal">
      <div className="home-brands-label" data-en="Trusted by teams at" data-ar="بثقة فرق من">Trusted by teams at</div>
      <div className="home-brands-marquee">
        <div className="home-brands-track">
          <span className="hb-item">Samsung</span>
          <span className="hb-dot">●</span>
          <span className="hb-item">CUPRA</span>
          <span className="hb-dot">●</span>
          <span className="hb-item">9GAG</span>
          <span className="hb-dot">●</span>
          <span className="hb-item">Artlist</span>
          <span className="hb-dot">●</span>
          <span className="hb-item">Asus</span>
          <span className="hb-dot">●</span>
          <span className="hb-item">Samsung</span>
          <span className="hb-dot">●</span>
          <span className="hb-item">CUPRA</span>
          <span className="hb-dot">●</span>
          <span className="hb-item">9GAG</span>
          <span className="hb-dot">●</span>
          <span className="hb-item">Artlist</span>
          <span className="hb-dot">●</span>
          <span className="hb-item">Asus</span>
          <span className="hb-dot">●</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ═══════════════════ HOME — SERVICES TEASER ═══════════════════ */}
<section id="home-services" data-page="home">
  <div className="container" style={{ position: 'relative', zIndex: 2 }}>
    <div className="text-center flex flex-col items-center mb-12">
      <div className="eyebrow reveal" data-en="What I Do" data-ar="خدماتي">What I Do</div>
      <h2 className="heading reveal" data-en="Crafted for the moment." data-ar="مصنوع للحظة.">Crafted for the moment.</h2>
      <p className="home-section-sub reveal max-w-2xl" data-en="From cinematic edits to brand stories — every project gets the same care." data-ar="من مونتاج سينمائي لقصص براندات — كل مشروع بياخد نفس الاهتمام.">From cinematic edits to brand stories — every project gets the same care.</p>
    </div>

    <div className="home-svc-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="home-svc-card reveal" onClick={() => { if(typeof window !== "undefined" && window.spaGo) { window.spaGo('services'); } } }>
        <div className="home-svc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
        </div>
        <div className="home-svc-title" data-en="Video Editing" data-ar="مونتاج الفيديو">Video Editing</div>
        <div className="home-svc-desc" data-en="Cinematic cuts that turn footage into stories." data-ar="مونتاج سينمائي بيحوّل الفيديو لقصص.">Cinematic cuts that turn footage into stories.</div>
      </div>
      <div className="home-svc-card reveal" onClick={() => { if(typeof window !== "undefined" && window.spaGo) { window.spaGo('services'); } } }>
        <div className="home-svc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <div className="home-svc-title" data-en="Cinematography" data-ar="التصوير السينمائي">Cinematography</div>
        <div className="home-svc-desc" data-en="Directing and shooting with a cinematic eye." data-ar="إخراج وتصوير بعين سينمائية.">Directing and shooting with a cinematic eye.</div>
      </div>
      <div className="home-svc-card reveal" onClick={() => { if(typeof window !== "undefined" && window.spaGo) { window.spaGo('services'); } } }>
        <div className="home-svc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div className="home-svc-title" data-en="Brand &amp; Documentary" data-ar="براند ووثائقي">Brand &amp; Documentary</div>
        <div className="home-svc-desc" data-en="Long-form storytelling with real emotion." data-ar="سرد طويل بإحساس حقيقي.">Long-form storytelling with real emotion.</div>
      </div>
    </div>

    <div className="home-section-cta reveal">
      <a href="#services" onClick={() => { if(typeof window !== "undefined" && window.spaGo) { window.spaGo('services');return false; } } } className="ghost-link">
        <span data-en="See all services" data-ar="شاهد كل الخدمات">See all services</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>
</section>

{/* ═══════════════════ HOME — FINAL CTA ═══════════════════ */}
<section id="home-cta" data-page="home">
  <div className="container">
    <div className="home-cta-wrap reveal">
      <div className="home-cta-eyebrow" data-en="Let's create together" data-ar="خلينا نبدع سوا">Let's create together</div>
      <h2 className="home-cta-title" data-en="Ready to make <em>something real?</em>" data-ar="جاهز نعمل <em>حاجة حقيقية؟</em>">Ready to make <em>something real?</em></h2>
      <p className="home-cta-sub" data-en="A free 30-minute call. No commitment. Just a conversation about your project." data-ar="مكالمة مجانية ٣٠ دقيقة. بدون أي التزام. مجرد كلام عن مشروعك.">A free 30-minute call. No commitment. Just a conversation about your project.</p>
      <div className="home-cta-actions flex flex-col md:flex-row gap-4">
        <a href="#" onClick={() => { if(typeof window !== "undefined" && window.qbOpen) { window.qbOpen();return false; } } } className="cta-primary">
          <span data-en="Start your project" data-ar="ابدأ مشروعك">Start your project</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="#about" onClick={() => { if(typeof window !== "undefined" && window.spaGo) { window.spaGo('about');return false; } } } className="cta-secondary">
          <span data-en="Learn more about Karim" data-ar="اعرف أكثر عن كريم">Learn more about Karim</span>
        </a>
      </div>
    </div>
  </div>
</section>

  <section id="work" data-page="work">
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="eyebrow" data-en="Selected Projects" data-ar="مشاريع مختارة">Selected Projects</div>
        <h2 className="heading" data-en="My Portfolio." data-ar="معرض أعمالي">My Portfolio.</h2>
      </div>
      
      <div className="work-grid">
        {(worksData || []).filter((w: any) => w.active).map((work: any) => (
          <a key={work.id} href={/work/ + work.slug} className="work-card">
            <div className="work-thumbnail">
              <img src={work.thumbnail || '/images/karim.jpg'} alt={work.title} />
              <div className="work-overlay">
                <div className="play-icon">▶</div>
              </div>
            </div>
            <div className="work-info">
              <h3 className="work-title" data-en={work.title} data-ar={work.titleAr || work.title}>{work.title}</h3>
              <div className="work-category" data-en={work.category} data-ar={work.categoryAr || work.category}>{work.category}</div>
            </div>
          </a>
        ))}
      </div>
      
      {(!worksData || worksData.filter((w: any) => w.active).length === 0) && (
        <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '2rem 0' }} data-en="No projects added yet." data-ar="لا توجد مشاريع مضافة حالياً.">No projects added yet.</div>
      )}
    </div>
  </section>

  <section id="testimonials" data-page="home">
  <div className="container">
    <div style={{ textAlign: 'center' }}>
      <div className="eyebrow" data-en="See My Customers" data-ar="عملائي">See My Customers</div>
      <h2 className="heading" data-en="Awesome Clients." data-ar="عملاء مميزون">Awesome Clients.</h2>
      <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '540px', margin: '0 auto', lineHeight: '1.6' }} data-en="My foundation is in storytelling, with a keen eye for craft. I specialize in creating cinematic, engaging, and impactful video content." data-ar="أساسي هو حكاية القصص بعين فنية. متخصص في صناعة محتوى فيديو سينمائي مؤثر وجذاب.">My foundation is in storytelling, with a keen eye for craft. I specialize in creating cinematic, engaging, and impactful video content.</p>
    </div>
  </div>
  <div className="testi-marquee-wrap" id="testiCarousel">
    {/* Rows are generated by JS */}
  </div>
</section>

{/* MERGED ABOUT + GLOBAL */}
<section id="about" data-page="about">
  {/* Cinematic storytelling — scroll-driven journey */}
  <div className="story-stage">
    {/* Background atmosphere layers */}
    <div className="story-bg-layer story-bg-1"></div>
    <div className="story-bg-layer story-bg-2"></div>
    <div className="story-bg-layer story-bg-3"></div>

    {/* Floating particles */}
    <div className="story-particles">
      <span className="particle"></span><span className="particle"></span><span className="particle"></span>
      <span className="particle"></span><span className="particle"></span><span className="particle"></span>
      <span className="particle"></span><span className="particle"></span><span className="particle"></span>
      <span className="particle"></span><span className="particle"></span><span className="particle"></span>
    </div>

    {/* Journey line — vertical thread that grows with scroll, connecting chapters */}
    <div className="journey-line">
      <div className="journey-line-track"></div>
      <div className="journey-line-progress" id="journeyProgress"></div>
      <div className="journey-line-tip" id="journeyTip">
        <div className="journey-tip-pulse"></div>
        <div className="journey-tip-core"></div>
      </div>
      {/* Connection nodes at each chapter */}
      <div className="journey-node" data-node="1"></div>
      <div className="journey-node" data-node="2"></div>
      <div className="journey-node" data-node="3"></div>
      <div className="journey-node" data-node="4"></div>
      <div className="journey-node" data-node="5"></div>
    </div>

    {/* Vertical progress rail (sticky) */}
    {/* CHAPTER 1: The Opening */}
    <div className="story-chapter" data-story-chapter="1">
      <div className="story-content">
        <div className="story-eyebrow reveal-story"><span data-en="Chapter One" data-ar="الفصل الأول">Chapter One</span></div>
        <h2 className="story-title reveal-story" data-en='A boy with a <em>camera.</em>' data-ar='ولد ومعاه <em>كاميرا.</em>'>A boy with a <em>camera.</em></h2>
        <p className="story-text reveal-story" data-en="It started in 2017. A borrowed camera. A small editing program. And a stubborn belief that stories deserved to be told the right way." data-ar="بدأت في ٢٠١٧. كاميرا مستعارة. برنامج مونتاج بسيط. وإيمان عنيد إن القصص لازم تتروى صح.">It started in 2017. A borrowed camera. A small editing program. And a stubborn belief that stories deserved to be told the right way.</p>
        <div className="story-year reveal-story" data-en="2017" data-ar="٢٠١٧">2017</div>
      </div>
      <div className="story-visual">
        <div className="story-photo-frame">
          <div className="story-photo-bg" id="storyPhoto1"></div>
          <div className="story-photo-overlay"></div>
        </div>
      </div>
    </div>

    {/* CHAPTER 2: The Spark */}
    <div className="story-chapter story-chapter-reverse" data-story-chapter="2">
      <div className="story-content">
        <div className="story-eyebrow reveal-story"><span data-en="Chapter Two" data-ar="الفصل الثاني">Chapter Two</span></div>
        <h2 className="story-title reveal-story" data-en='The first <em>spark.</em>' data-ar='أول <em>شرارة.</em>'>The first <em>spark.</em></h2>
        <p className="story-text reveal-story" data-en="The first project paid in experience, not money. Then the second. Then the tenth. Each cut taught me something the last one didn't." data-ar="أول مشروع كان دفعه خبرة مش فلوس. وبعدين التاني. وبعدين العاشر. كل مونتاج علّمني حاجة جديدة.">The first project paid in experience, not money. Then the second. Then the tenth. Each cut taught me something the last one didn't.</p>
        <div className="story-stats reveal-story">
          <div className="story-stat-item"><span className="story-stat-num" data-count-target="100">0</span><span className="story-stat-lbl" data-en="early projects" data-ar="مشروع البداية">early projects</span></div>
        </div>
      </div>
      <div className="story-visual">
        <div className="story-glyph">
          <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="100" cy="100" r="80" opacity="0.3"/>
            <circle cx="100" cy="100" r="60" opacity="0.5"/>
            <circle cx="100" cy="100" r="40" opacity="0.7"/>
            <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.8"/>
            <path d="M100 20 L100 180 M20 100 L180 100" opacity="0.2"/>
          </svg>
        </div>
      </div>
    </div>

    {/* CHAPTER 3: The Craft */}
    <div className="story-chapter" data-story-chapter="3">
      <div className="story-content">
        <div className="story-eyebrow reveal-story"><span data-en="Chapter Three" data-ar="الفصل الثالث">Chapter Three</span></div>
        <h2 className="story-title reveal-story" data-en='Mastering the <em>craft.</em>' data-ar='إتقان <em>الحرفة.</em>'>Mastering the <em>craft.</em></h2>
        <p className="story-text reveal-story" data-en="Eight years of late nights. Of color grading until sunrise. Of rebuilding sequences three times to find the one cut that makes it sing." data-ar="٨ سنين من السهر. من تدريج الألوان لحد طلوع الشمس. من إعادة بناء السكوينس ٣ مرات عشان نلاقي المونتاج اللي بيخلي الفيلم يغني.">Eight years of late nights. Of color grading until sunrise. Of rebuilding sequences three times to find the one cut that makes it sing.</p>
        <div className="story-stats reveal-story">
          <div className="story-stat-item"><span className="story-stat-num" data-count-target="1318">0</span><span className="story-stat-lbl" data-en="projects shipped" data-ar="مشروع منجز">projects shipped</span></div>
          <div className="story-stat-item"><span className="story-stat-num" data-count-target="8">0</span><span className="story-stat-lbl" data-en="years crafting" data-ar="سنوات إبداع">years crafting</span></div>
        </div>
      </div>
      <div className="story-visual">
        <div className="story-photo-frame story-photo-tilted">
          <div className="story-photo-bg" id="storyPhoto2"></div>
          <div className="story-photo-overlay"></div>
          <div className="story-photo-badge"><span data-en="The craft" data-ar="الحرفة">The craft</span></div>
        </div>
      </div>
    </div>

    {/* CHAPTER 4: The Reach */}
    <div className="story-chapter story-chapter-reverse" data-story-chapter="4">
      <div className="story-content">
        <div className="story-eyebrow reveal-story"><span data-en="Chapter Four" data-ar="الفصل الرابع">Chapter Four</span></div>
        <h2 className="story-title reveal-story" data-en='Stories that <em>travel.</em>' data-ar='قصص <em>بتسافر.</em>'>Stories that <em>travel.</em></h2>
        <p className="story-text reveal-story" data-en="From Cairo, the work reached fourteen countries. From small startups to global brands like Samsung, CUPRA, and Artlist. Every story unique. Every cut intentional." data-ar="من القاهرة، الشغل وصل لـ ١٤ دولة. من شركات ناشئة صغيرة لبراندات عالمية زي Samsung، CUPRA و Artlist. كل قصة فريدة. كل قطعة مونتاج مقصودة.">From Cairo, the work reached fourteen countries. From small startups to global brands like Samsung, CUPRA, and Artlist. Every story unique. Every cut intentional.</p>
        <div className="story-stats reveal-story">
          <div className="story-stat-item"><span className="story-stat-num" data-count-target="14">0</span><span className="story-stat-lbl" data-en="countries" data-ar="دولة">countries</span></div>
          <div className="story-stat-item"><span className="story-stat-num" data-count-target="470">0</span><span className="story-stat-lbl" data-en="clients" data-ar="عميل">clients</span></div>
        </div>
      </div>
      <div className="story-visual">
        <div className="story-globe">
          <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="100" cy="100" r="85" opacity="0.4"/>
            <ellipse cx="100" cy="100" rx="85" ry="35" opacity="0.4"/>
            <ellipse cx="100" cy="100" rx="85" ry="55" opacity="0.3"/>
            <ellipse cx="100" cy="100" rx="35" ry="85" opacity="0.4"/>
            <ellipse cx="100" cy="100" rx="55" ry="85" opacity="0.3"/>
            <circle cx="100" cy="100" r="3" fill="#5fa3e0"/>
            <circle cx="55" cy="80" r="2" fill="#5fa3e0"/>
            <circle cx="140" cy="120" r="2" fill="#5fa3e0"/>
            <circle cx="70" cy="140" r="2" fill="#5fa3e0"/>
            <circle cx="155" cy="65" r="2" fill="#5fa3e0"/>
          </svg>
        </div>
      </div>
    </div>

    {/* CHAPTER 5: The Today */}
    <div className="story-chapter story-chapter-final" data-story-chapter="5">
      <div className="story-content story-content-centered">
        <div className="story-eyebrow reveal-story"><span data-en="And Today" data-ar="واليوم">And Today</span></div>
        <h2 className="story-title-big reveal-story" data-en='The story <em>continues.</em>' data-ar='القصة <em>مستمرة.</em>'>The story <em>continues.</em></h2>
        <p className="story-text-big reveal-story" data-en="Still chasing that perfect cut. Still up at 3am refining a sequence. Still believing every brand has a story worth telling — and that I'm here to tell it." data-ar="لسه ببحث عن المونتاج المثالي. لسه صاحي الساعة ٣ الفجر بحسّن سكوينس. لسه مؤمن إن كل براند عنده قصة تستاهل تتحكي — وإني هنا عشان أحكيها.">Still chasing that perfect cut. Still up at 3am refining a sequence. Still believing every brand has a story worth telling — and that I'm here to tell it.</p>
        <div className="story-cta-wrap reveal-story">
          <a href="#" onClick={() => { if(typeof window !== "undefined" && window.qbOpen) { window.qbOpen();return false; } } } className="cta-primary">
            <span data-en="Let's create together" data-ar="خلينا نبدع سوا">Let's create together</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>

  </div>
</section>

{/* WORLD MAP (SPA section) */}
<section id="map" data-page="about">
  <div className="container">
    {/* World map full width below the about grid */}
    <div style={{ marginTop: '0' }}>
      <div className="world-stats-bar">
        <div className="ws-item"><span className="ws-num"><span className="count" data-target="1318" data-suffix="+">0</span></span><span className="ws-lbl" data-en="Projects" data-ar="مشروع">Projects</span></div>
        <span className="ws-globe">🌍</span>
        <div className="ws-divider"></div>
        <div className="ws-item"><span className="ws-num"><span className="count" data-target="14" data-suffix="+">0</span></span><span className="ws-lbl" data-en="Countries" data-ar="دولة">Countries</span></div>
        <div className="ws-divider"></div>
        <div className="ws-item"><span className="ws-num"><span className="count" data-target="470" data-suffix="+">0</span></span><span className="ws-lbl" data-en="Clients" data-ar="عميل">Clients</span></div>
      </div>

      <div className="map-frame">
        <div className="map-wrap">
          <div id="map-container">
<div className="map-loading" id="mapLoading">
  <div className="map-loading-spinner"></div>
  <div className="map-loading-text" data-en="Loading world map..." data-ar="جاري تحميل الخريطة...">Loading world map...</div>
</div>
<svg id="world-svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}>
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stopColor="#1a3a6e" stopOpacity="0.5"/>
      <stop offset="50%" stopColor="#0a1830" stopOpacity="0.25"/>
      <stop offset="100%" stopColor="#020812" stopOpacity="0"/>
    </radialGradient>
    <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
      <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6"/>
      <stop offset="55%" stopColor="#7fc4ff" stopOpacity="0.2"/>
      <stop offset="100%" stopColor="#7fc4ff" stopOpacity="0"/>
    </radialGradient>
    <radialGradient id="homeHaloGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
      <stop offset="15%" stopColor="#ffffff" stopOpacity="0.85"/>
      <stop offset="50%" stopColor="#aedcff" stopOpacity="0.4"/>
      <stop offset="100%" stopColor="#aedcff" stopOpacity="0"/>
    </radialGradient>
    <filter id="lineGlow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="1.2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="continentGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="0.6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(127,196,255,0.06)" strokeWidth="0.5"/>
    </pattern>
  </defs>
  <rect width="1000" height="500" fill="url(#gridPattern)"/>
  <rect width="1000" height="500" fill="url(#bgGrad)"/>
  <g id="continents-paths"></g>
  <g id="glows"></g>
  <g id="lines"></g>
  <g id="markers" style={{ pointerEvents: 'auto' }}></g>
</svg>
</div>
        </div>
        <div className="map-countries">
          <span className="ctry home">🇪🇬 Egypt</span>
          <span className="ctry">🇸🇦 Saudi Arabia</span><span className="ctry">🇦🇪 UAE</span>
          <span className="ctry">🇰🇼 Kuwait</span><span className="ctry">🇱🇧 Lebanon</span>
          <span className="ctry">🇸🇾 Syria</span><span className="ctry">🇯🇴 Jordan</span>
          <span className="ctry">🇮🇶 Iraq</span><span className="ctry">🇹🇷 Turkey</span>
          <span className="ctry">🇳🇴 Norway</span><span className="ctry">🇬🇧 UK</span>
          <span className="ctry">🇺🇸 USA</span><span className="ctry">🇨🇦 Canada</span>
          <span className="ctry">🇦🇺 Australia</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* HOW I WORK */}
<section id="process" data-page="about">
  <div className="container">
    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
      <div className="eyebrow" data-en="The Process" data-ar="رحلة العمل">The Process</div>
      <h2 className="heading" data-en="Simple. Transparent. Fast." data-ar="بسيط. واضح. سريع.">Simple. Transparent. Fast.</h2>
      <p className="lead" data-en="From the first message to final delivery — here's exactly how we'll work together." data-ar="من أول رسالة لحد التسليم النهائي — اعرف بالظبط هنشتغل مع بعض إزاي.">From the first message to final delivery — here's exactly how we'll work together.</p>
    </div>

    <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="process-step">
        <div className="process-num">01</div>
        <div className="process-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </div>
        <h3 className="process-title" data-en="Discovery Call" data-ar="جلسة الاستكشاف">Discovery Call</h3>
        <p className="process-desc" data-en="A free 30-min call to understand your vision, goals, audience, and timeline. No commitment." data-ar="مكالمة مجانية ٣٠ دقيقة نفهم فيها رؤيتك وأهدافك وجمهورك. بدون أي التزام.">A free 30-min call to understand your vision, goals, audience, and timeline. No commitment.</p>
        <div className="process-time" data-en="30 min · Free" data-ar="٣٠ دقيقة · مجاناً">30 min · Free</div>
      </div>

      <div className="process-step">
        <div className="process-num">02</div>
        <div className="process-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
        <h3 className="process-title" data-en="Custom Proposal" data-ar="عرض مخصص">Custom Proposal</h3>
        <p className="process-desc" data-en="You receive a clear proposal: scope, deliverables, timeline, and transparent pricing — within 24 hours." data-ar="بتستلم عرض واضح: نطاق الشغل، الـ deliverables، المدة، والتسعير الشفاف — خلال ٢٤ ساعة.">You receive a clear proposal: scope, deliverables, timeline, and transparent pricing — within 24 hours.</p>
        <div className="process-time" data-en="Within 24 hours" data-ar="خلال ٢٤ ساعة">Within 24 hours</div>
      </div>

      <div className="process-step">
        <div className="process-num">03</div>
        <div className="process-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="23 7 16 12 23 17 23 7"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
        </div>
        <h3 className="process-title" data-en="Production & Edit" data-ar="الإنتاج والمونتاج">Production & Edit</h3>
        <p className="process-desc" data-en="I get to work — shooting, editing, color grading, sound. You get progress updates and a preview before final cut." data-ar="ببدأ شغل — تصوير، مونتاج، تصحيح ألوان، صوت. بتاخد تحديثات منتظمة و preview قبل الـ final cut.">I get to work — shooting, editing, color grading, sound. You get progress updates and a preview before final cut.</p>
        <div className="process-time" data-en="3-14 days typical" data-ar="٣ - ١٤ يوم غالباً">3-14 days typical</div>
      </div>

      <div className="process-step">
        <div className="process-num">04</div>
        <div className="process-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h3 className="process-title" data-en="Delivery & Revisions" data-ar="التسليم والمراجعات">Delivery & Revisions</h3>
        <p className="process-desc" data-en="You get the final files in all formats you need. 2 free rounds of revisions to make it perfect." data-ar="بتستلم الملفات النهائية في كل الصيغ اللي محتاجها. مع جولتين مراجعة مجانية للوصول للنتيجة المثالية.">You get the final files in all formats you need. 2 free rounds of revisions to make it perfect.</p>
        <div className="process-time" data-en="Same day delivery" data-ar="تسليم في نفس اليوم">Same day delivery</div>
      </div>
    </div>

    {/* What I Need From You — Collaboration expectations */}
    <div className="process-expectations reveal">
      <div className="exp-header">
        <div className="exp-eyebrow" data-en="Your Part" data-ar="دورك">Your Part</div>
        <h3 className="exp-title" data-en="What I'll need from <em>you</em>" data-ar="اللي محتاجه <em>منك</em>">What I'll need from <em>you</em></h3>
        <p className="exp-sub" data-en="Great work is a two-way street. Here's how we'll keep your project moving without delays." data-ar="الشغل العظيم بيتعمل سوا. ده اللي بيخلي مشروعك يمشي بدون تأخير.">Great work is a two-way street. Here's how we'll keep your project moving without delays.</p>
      </div>
      <div className="exp-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="exp-item">
          <div className="exp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div className="exp-content">
            <h4 className="exp-item-title" data-en="Quick feedback" data-ar="فيدباك سريع">Quick feedback</h4>
            <p className="exp-item-desc" data-en="Reviews within 48 hours. Delayed feedback delays delivery — simple as that." data-ar="مراجعة الفيدباك في خلال ٤٨ ساعة. التأخير في الفيدباك بيأخر التسليم — ببساطة كده.">Reviews within 48 hours. Delayed feedback delays delivery — simple as that.</p>
          </div>
        </div>
        <div className="exp-item">
          <div className="exp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <div className="exp-content">
            <h4 className="exp-item-title" data-en="Clear brief" data-ar="بريف واضح">Clear brief</h4>
            <p className="exp-item-desc" data-en="A simple doc with your goals, audience, and references. I'll guide you if needed." data-ar="مستند بسيط فيه أهدافك، الجمهور، والـ references. هساعدك تكتبه لو محتاج.">A simple doc with your goals, audience, and references. I'll guide you if needed.</p>
          </div>
        </div>
        <div className="exp-item">
          <div className="exp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </div>
          <div className="exp-content">
            <h4 className="exp-item-title" data-en="Open communication" data-ar="تواصل مفتوح">Open communication</h4>
            <p className="exp-item-desc" data-en="Tell me when something doesn't feel right. Honest feedback makes better work — always." data-ar="قوللي لو حاجة مش ماشية صح. الفيدباك الصريح بيعمل شغل أحسن — دايماً.">Tell me when something doesn't feel right. Honest feedback makes better work — always.</p>
          </div>
        </div>
        <div className="exp-item">
          <div className="exp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div className="exp-content">
            <h4 className="exp-item-title" data-en="Approval on time" data-ar="موافقة في الوقت">Approval on time</h4>
            <p className="exp-item-desc" data-en="Once we agree on milestones, sign off on time so we can move forward together." data-ar="لما نتفق على المراحل، وافق في الميعاد عشان نقدر نكمل سوا.">Once we agree on milestones, sign off on time so we can move forward together.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="process-cta">
      <a href="#" onClick={() => { if(typeof window !== "undefined" && window.qbOpen) { window.qbOpen();return false; } } } className="cta-primary">
        <span data-en="Start Your Project" data-ar="ابدأ مشروعك">Start Your Project</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>
</section>

{/* SERVICES (clickable cards) */}
<section id="services" data-page="services">
  <div className="container">
    <div className="text-center flex flex-col items-center mb-16">
      <div className="eyebrow" data-en="What I Do" data-ar="خدماتي">What I Do</div>
      <h2 className="heading" data-en="Crafted services." data-ar="خدمات احترافية">Crafted services.</h2>
      <p className="lead" data-en="Whether it's a 15-second social ad or a 60-minute documentary, the goal is the same: make them feel it." data-ar="سواء إعلان ١٥ ثانية أو وثائقي ٦٠ دقيقة، الهدف واحد: نخليهم يعيشوا الإحساس.">Whether it's a 15-second social ad or a 60-minute documentary, the goal is the same: make them feel it.</p>
    </div>

    {/* Rotating description text */}
    <div className="svc-rotator">
      <span className="svc-rotator-prefix" data-en="Here you'll find" data-ar="هنا هتلاقي">Here you'll find</span>
      <span className="svc-rotator-words" id="svcRotator">
        <span className="svc-rword active" data-en="cinematic editing that turns moments into stories." data-ar="مونتاج سينمائي بيحوّل اللحظات لقصص.">cinematic editing that turns moments into stories.</span>
        <span className="svc-rword" data-en="full cinematography — directed, shot, and crafted." data-ar="تصوير سينمائي كامل — إخراج وتصوير بحرفية.">full cinematography — directed, shot, and crafted.</span>
        <span className="svc-rword" data-en="documentary storytelling that captures real emotion." data-ar="سرد وثائقي بيلتقط المشاعر الحقيقية.">documentary storytelling that captures real emotion.</span>
        <span className="svc-rword" data-en="brand content that speaks to your audience." data-ar="محتوى براند بيتكلم مع جمهورك.">brand content that speaks to your audience.</span>
        <span className="svc-rword" data-en="motion graphics that elevate every frame." data-ar="موشن جرافيكس بيرفع قيمة كل لقطة.">motion graphics that elevate every frame.</span>
        <span className="svc-rword" data-en="color grading that gives your footage soul." data-ar="تدريج ألوان بيدّي لقطاتك روح.">color grading that gives your footage soul.</span>
      </span>
    </div>
    <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="svc-card reveal" data-service="editing">
        <div className="svc-icon"><svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg></div>
        <div className="svc-card-body">
          <div className="svc-title" data-en="Video Editing" data-ar="مونتاج الفيديو">Video Editing</div>
          <p className="svc-desc" data-en="Cinematic cuts, seamless transitions, and color grading that turn raw footage into compelling visual stories." data-ar="مونتاج سينمائي، انتقالات سلسة، وتدريج ألوان بيحوّل المواد الخام لقصص بصرية مؤثرة.">Cinematic cuts, seamless transitions, and color grading that turn raw footage into compelling visual stories.</p>
        </div>
        <span className="svc-cta" data-en="View Work" data-ar="شاهد الأعمال">View Work</span>
      </div>
      <div className="svc-card reveal" data-service="cinematography">
        <div className="svc-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
        <div className="svc-card-body">
          <div className="svc-title" data-en="Cinematography" data-ar="التصوير السينمائي">Cinematography</div>
          <p className="svc-desc" data-en="Full videography service — directing, shooting, and capturing footage with a cinematic eye." data-ar="خدمة فيديو كاملة — إخراج، تصوير، والتقاط مواد بعين سينمائية.">Full videography service — directing, shooting, and capturing footage with a cinematic eye.</p>
        </div>
        <span className="svc-cta" data-en="View Work" data-ar="شاهد الأعمال">View Work</span>
      </div>
      <div className="svc-card reveal" data-service="social">
        <div className="svc-icon"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
        <div className="svc-card-body">
          <div className="svc-title" data-en="Social Content" data-ar="محتوى السوشيال">Social Content</div>
          <p className="svc-desc" data-en="Reels, TikToks, and short-form content engineered for maximum reach and engagement." data-ar="ريلز، تيك توك، ومحتوى قصير مصمم لأقصى وصول وتفاعل.">Reels, TikToks, and short-form content engineered for maximum reach and engagement.</p>
        </div>
        <span className="svc-cta" data-en="View Work" data-ar="شاهد الأعمال">View Work</span>
      </div>
      <div className="svc-card reveal" data-service="documentary">
        <div className="svc-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
        <div className="svc-card-body">
          <div className="svc-title" data-en="Documentary &amp; Brand" data-ar="وثائقي وبراند">Documentary &amp; Brand</div>
          <p className="svc-desc" data-en="Long-form storytelling that captures brand identity, human stories, and real emotion." data-ar="سرد طويل بيلتقط هوية البراند والقصص الإنسانية والإحساس الحقيقي.">Long-form storytelling that captures brand identity, human stories, and real emotion.</p>
        </div>
        <span className="svc-cta" data-en="View Work" data-ar="شاهد الأعمال">View Work</span>
      </div>
      <div className="svc-card reveal" data-service="mentorship">
        <div className="svc-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20v-2a8 8 0 0 1 16 0v2"/></svg></div>
        <div className="svc-card-body">
          <div className="svc-title" data-en="Training &amp; Mentorship" data-ar="تدريب وإرشاد">Training &amp; Mentorship</div>
          <p className="svc-desc" data-en="One-on-one and group coaching for editors and videographers ready to level up." data-ar="جلسات فردية وجماعية للمونتيرز والمصورين الجاهزين يطوروا.">One-on-one and group coaching for editors and videographers ready to level up.</p>
        </div>
        <span className="svc-cta" data-en="View Work" data-ar="شاهد الأعمال">View Work</span>
      </div>
      <div className="svc-card reveal" data-service="motion">
        <div className="svc-icon"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
        <div className="svc-card-body">
          <div className="svc-title" data-en="Motion &amp; Graphics" data-ar="موشن جرافيكس">Motion &amp; Graphics</div>
          <p className="svc-desc" data-en="Animated titles, logo reveals, and motion graphics that elevate production value." data-ar="عناوين متحركة، شعارات، وموشن جرافيكس بترفع قيمة الإنتاج.">Animated titles, logo reveals, and motion graphics that elevate production value.</p>
        </div>
        <span className="svc-cta" data-en="View Work" data-ar="شاهد الأعمال">View Work</span>
      </div>
    </div>
  </div>
</section>

{/* MODAL for service work */}
<div className="modal-overlay" id="modal">
  <div className="modal">
    <button className="modal-close" id="modalClose">✕</button>
    <div className="modal-eyebrow" id="modalEyebrow">Selected Work</div>
    <h2 className="modal-title" id="modalTitle">Video Editing</h2>
    <div className="modal-works" id="modalWorks"></div>
  </div>
</div>

{/* TESTIMONIALS — Carousel */}
{/* TRAINING + STUDENT REVIEWS */}
<section id="training" data-page="training">
  <div className="container">
    <div className="eyebrow" data-en="Level Up" data-ar="ارتقي بمستواك">Level Up</div>
    <h2 className="heading" data-en="Editing mentorship." data-ar="برنامج تدريب المونتاج">Editing mentorship.</h2>
    <div className="training-card">
      <div>
        <h3 data-en="Learn from a working professional." data-ar="تعلم من محترف يمارس المجال">Learn from a working professional.</h3>
        <p data-en="Focused, practical training for aspiring editors and videographers who want real-world skills — not textbook theory." data-ar="تدريب عملي ومركز للمونتيرز والمصورين الطامحين اللي عايزين مهارات حقيقية — مش نظريات.">Focused, practical training for aspiring editors and videographers who want real-world skills — not textbook theory.</p>
        <p data-en="Whether you're starting out or trying to break into professional work, my mentorship is built around your specific goals." data-ar="سواء بتبدأ أو بتحاول تدخل المجال الاحترافي، الإرشاد بتاعي مصمم حوالين أهدافك الخاصة.">Whether you're starting out or trying to break into professional work, my mentorship is built around your specific goals.</p>
        <ul className="training-list">
          <li data-en="Premiere Pro &amp; DaVinci Resolve workflows" data-ar="سير عمل Premiere Pro و DaVinci Resolve">Premiere Pro &amp; DaVinci Resolve workflows</li>
          <li data-en="Color grading &amp; LUT creation" data-ar="تدريج الألوان وصنع LUTs">Color grading &amp; LUT creation</li>
          <li data-en="Short-form editing for Reels &amp; TikTok" data-ar="مونتاج المحتوى القصير للريلز والتيك توك">Short-form editing for Reels &amp; TikTok</li>
          <li data-en="Storytelling and pacing techniques" data-ar="تقنيات السرد والإيقاع">Storytelling and pacing techniques</li>
          <li data-en="Building your portfolio &amp; finding clients" data-ar="بناء البورتفوليو والوصول للعملاء">Building your portfolio &amp; finding clients</li>
        </ul>
        <div className="consult-btn-wrap">
          <a href="#" onClick={() => { if(typeof window !== "undefined" && window.qbOpen) { window.qbOpen();return false; } } } className="consult-btn">
            <span data-en="Book a Consultation" data-ar="احجز استشارة">Book a Consultation</span>
          </a>
        </div>
      </div>
      <div className="training-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="ts"><div className="ts-n"><span className="count" data-target="200" data-suffix="+">0</span></div><div className="ts-l" data-en="Students Trained" data-ar="طالب مدرّب">Students Trained</div></div>
        <div className="ts"><div className="ts-n fade-pulse">1:1</div><div className="ts-l fade-pulse" data-en="Personalized" data-ar="جلسات فردية" style={{ animationDelay: '.5s' }}>Personalized</div></div>
        <div className="ts"><div className="ts-n" data-en="Online" data-ar="أونلاين" style={{ fontSize: '32px' }}>Online</div><div className="ts-l" data-en="Available Worldwide" data-ar="متاح عالمياً">Available Worldwide</div></div>
      </div>
    </div>

    {/* Student Reviews — Carousel */}
    <div className="student-reviews">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="eyebrow" data-en="Student Stories" data-ar="قصص الطلاب">Student Stories</div>
        <h3 data-en="From my mentees." data-ar="آراء طلابي">From my mentees.</h3>
      </div>
      <div className="student-reviews-wrap">
        <div className="student-reviews-row" id="studentReviews">
          {/* Generated by JS */}
        </div>
      </div>
    </div>

    {/* Video Reviews */}
    <div className="video-reviews">
      <div className="video-reviews-header">
        <div className="eyebrow" data-en="Video Testimonials" data-ar="شهادات بالفيديو">Video Testimonials</div>
        <h3 style={{ fontSize: '32px', fontWeight: '600', color: 'var(--white)', letterSpacing: '-.8px', marginTop: '12px' }} data-en="Hear it from them." data-ar="اسمعها منهم">Hear it from them.</h3>
        <p style={{ fontSize: '15px', color: 'var(--muted)', maxWidth: '520px', margin: '16px auto 0', lineHeight: '1.6' }} data-en="Real students sharing their journey and transformation." data-ar="طلاب حقيقيون يشاركون رحلتهم وتطورهم.">Real students sharing their journey and transformation.</p>
      </div>
      <div className="video-reviews-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="video-card">
          <div className="video-card-glow"></div>
          <div className="video-card-bg"></div>
          <div className="video-card-quote">"</div>
          <div className="video-card-play">
            <svg viewBox="0 0 24 24"><polygon points="6,4 20,12 6,20"/></svg>
          </div>
          <div className="video-card-info">
            <div className="video-card-text" data-en="Video testimonial coming soon" data-ar="شهادة فيديو قريباً">Video testimonial coming soon</div>
            <div className="video-card-name">Student A</div>
            <div className="video-card-role" data-en="Mentorship Graduate" data-ar="خريج برنامج التدريب">Mentorship Graduate</div>
          </div>
        </div>

        <div className="video-card">
          <div className="video-card-glow"></div>
          <div className="video-card-bg"></div>
          <div className="video-card-quote">"</div>
          <div className="video-card-play">
            <svg viewBox="0 0 24 24"><polygon points="6,4 20,12 6,20"/></svg>
          </div>
          <div className="video-card-info">
            <div className="video-card-text" data-en="Video testimonial coming soon" data-ar="شهادة فيديو قريباً">Video testimonial coming soon</div>
            <div className="video-card-name">Student B</div>
            <div className="video-card-role" data-en="Mentorship Graduate" data-ar="خريج برنامج التدريب">Mentorship Graduate</div>
          </div>
        </div>

        <div className="video-card">
          <div className="video-card-glow"></div>
          <div className="video-card-bg"></div>
          <div className="video-card-quote">"</div>
          <div className="video-card-play">
            <svg viewBox="0 0 24 24"><polygon points="6,4 20,12 6,20"/></svg>
          </div>
          <div className="video-card-info">
            <div className="video-card-text" data-en="Video testimonial coming soon" data-ar="شهادة فيديو قريباً">Video testimonial coming soon</div>
            <div className="video-card-name">Student C</div>
            <div className="video-card-role" data-en="Mentorship Graduate" data-ar="خريج برنامج التدريب">Mentorship Graduate</div>
          </div>
        </div>

        <div className="video-card">
          <div className="video-card-glow"></div>
          <div className="video-card-bg"></div>
          <div className="video-card-quote">"</div>
          <div className="video-card-play">
            <svg viewBox="0 0 24 24"><polygon points="6,4 20,12 6,20"/></svg>
          </div>
          <div className="video-card-info">
            <div className="video-card-text" data-en="Video testimonial coming soon" data-ar="شهادة فيديو قريباً">Video testimonial coming soon</div>
            <div className="video-card-name">Student D</div>
            <div className="video-card-role" data-en="Mentorship Graduate" data-ar="خريج برنامج التدريب">Mentorship Graduate</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* CONTACT */}
<section id="contact" data-page="contact">
  <div className="contact-inner">
    <div className="eyebrow" data-en="Start a Project" data-ar="ابدأ مشروع">Start a Project</div>
    <h2 className="heading" data-en="Let's create something." data-ar="هيا نبدع معاً">Let's create something.</h2>
    <p className="contact-tagline" data-en="Have a project in mind? Book a free 30-min discovery call — no pressure, just a real conversation about your vision." data-ar="عندك مشروع في بالك؟ احجز جلسة استكشاف مجانية ٣٠ دقيقة — بدون أي ضغط، مجرد حوار حقيقي حول رؤيتك.">Have a project in mind? Book a free 30-min discovery call — no pressure, just a real conversation about your vision.</p>

    {/* Two main CTAs */}
    <div className="contact-actions">
      <a href="#" onClick={() => { if(typeof window !== "undefined" && window.qbOpen) { window.qbOpen();return false; } } } className="contact-cta-primary">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <div className="contact-cta-text">
          <div className="contact-cta-label" data-en="Quick Chat" data-ar="محادثة سريعة">Quick Chat</div>
          <div className="contact-cta-action" data-en="Message on WhatsApp" data-ar="راسلني على واتساب">Message on WhatsApp</div>
        </div>
      </a>

      <a href="#" onClick={() => { if(typeof window !== "undefined" && window.qbOpen) { window.qbOpen();return false; } } } className="contact-cta-secondary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        <div className="contact-cta-text">
          <div className="contact-cta-label" data-en="Project Brief" data-ar="بريف المشروع">Project Brief</div>
          <div className="contact-cta-action" data-en="Send via Email" data-ar="ارسل عبر الإيميل">Send via Email</div>
        </div>
      </a>

      <a href="/book" className="contact-cta-secondary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <div className="contact-cta-text">
          <div className="contact-cta-label" data-en="Meeting" data-ar="اجتماع">Meeting</div>
          <div className="contact-cta-action" data-en="Book a Session" data-ar="احجز موعد">Book a Session</div>
        </div>
      </a>
    </div>

    {/* Quick FAQ */}
    <div className="contact-faq">
      <div className="faq-item">
        <div className="faq-q" data-en="How fast do you reply?" data-ar="بترد بسرعة قد إيه؟">How fast do you reply?</div>
        <div className="faq-a" data-en="Within 24 hours — usually much faster." data-ar="خلال ٢٤ ساعة — وغالباً أسرع بكتير.">Within 24 hours — usually much faster.</div>
      </div>
      <div className="faq-item">
        <div className="faq-q" data-en="Do you work remote?" data-ar="بتشتغل عن بُعد؟">Do you work remote?</div>
        <div className="faq-a" data-en="Yes — I work with clients globally across 14 countries." data-ar="أيوه — بشتغل مع عملاء حول العالم في ١٤ دولة.">Yes — I work with clients globally across 14 countries.</div>
      </div>
      <div className="faq-item">
        <div className="faq-q" data-en="What's your typical budget?" data-ar="ما هي ميزانيتك المعتادة؟">What's your typical budget?</div>
        <div className="faq-a" data-en="Flexible — let's discuss your scope first, then I'll propose options." data-ar="مرنة — هنناقش نطاق المشروع الأول، وبعدين هقترح خيارات.">Flexible — let's discuss your scope first, then I'll propose options.</div>
      </div>
      <div className="faq-item">
        <div className="faq-q" data-en="Languages?" data-ar="اللغات؟">Languages?</div>
        <div className="faq-a" data-en="Bilingual production — Arabic & English fluently." data-ar="إنتاج ثنائي اللغة — عربي وإنجليزي بطلاقة.">Bilingual production — Arabic & English fluently.</div>
      </div>
    </div>

    <div className="socials">
      <a href="#" className="soc" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
      <a href="#" className="soc" aria-label="TikTok"><svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
      <a href="#" className="soc" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
      <a href="#" className="soc" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg></a>
    </div>
  </div>
</section>



<footer>
  <div className="footer-content">
    <div className="footer-col footer-brand">
      <div className="footer-logo">KA</div>
      <div className="footer-tagline" data-en="Cinematic storytelling for brands that perform." data-ar="سرد سينمائي للبراندات اللي بتحقق نتائج.">Cinematic storytelling for brands that perform.</div>
    </div>
    <div className="footer-col">
      <div className="footer-col-title" data-en="Explore" data-ar="استكشف">Explore</div>
      <a href="#home" onClick={() => { if(typeof window !== "undefined" && window.spaGo) { window.spaGo('home');return false; } } } data-en="Home" data-ar="الرئيسية">Home</a>
      <a href="#about" onClick={() => { if(typeof window !== "undefined" && window.spaGo) { window.spaGo('about');return false; } } } data-en="About" data-ar="عني">About</a>
      <a href="#services" onClick={() => { if(typeof window !== "undefined" && window.spaGo) { window.spaGo('services');return false; } } } data-en="Services" data-ar="خدماتي">Services</a>
      <a href="#contact" onClick={() => { if(typeof window !== "undefined" && window.spaGo) { window.spaGo('contact');return false; } } } data-en="Contact" data-ar="تواصل">Contact</a>
    </div>
    <div className="footer-col">
      <div className="footer-col-title" data-en="For Editors" data-ar="للمونتيرين">For Editors</div>
      <a href="#training" onClick={() => { if(typeof window !== "undefined" && window.spaGo) { window.spaGo('training');return false; } } } data-en="Mentorship & Training" data-ar="التدريب والمنتورنج">Mentorship &amp; Training</a>
      <a href="#training" onClick={() => { if(typeof window !== "undefined" && window.spaGo) { window.spaGo('training');return false; } } } data-en="Student Reviews" data-ar="آراء الطلاب">Student Reviews</a>
    </div>
    <div className="footer-col">
      <div className="footer-col-title" data-en="Connect" data-ar="تواصل">Connect</div>
      <a href="#" onClick={() => { if(typeof window !== "undefined" && window.qbOpen) { window.qbOpen();return false; } } } data-en="Start a project" data-ar="ابدأ مشروع">Start a project</a>
      <a href="#contact" onClick={() => { if(typeof window !== "undefined" && window.spaGo) { window.spaGo('contact');return false; } } } data-en="Get in touch" data-ar="تواصل معي">Get in touch</a>
    </div>
  </div>
  <div className="footer-bottom">
    <div className="footer-text">© 2026 Karim Abdelaziz · <span data-en="Cairo · Worldwide" data-ar="القاهرة · حول العالم">Cairo · Worldwide</span></div>
  </div>
</footer>



{/* ═══════════════════ QUICK BRIEF MODAL ═══════════════════ */}


<div className="qb-modal" id="qbModal">
  <div className="qb-modal-content">
    <button className="qb-close" onClick={() => { if(typeof window !== "undefined" && window.qbClose) { window.qbClose() } } } aria-label="Close">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>

    <div className="qb-header">
      <div className="qb-eyebrow" data-en="Quick Brief" data-ar="نموذج سريع">Quick Brief</div>
      <div className="qb-title" id="qbTitle" data-en="Tell me about your project" data-ar="احكيلي عن مشروعك">Tell me about your project</div>
      <div className="qb-sub" data-en="Takes 30 seconds — and helps me prepare for our chat." data-ar="٣٠ ثانية بس — وبتساعدني أجهز للحوار.">Takes 30 seconds — and helps me prepare for our chat.</div>
    </div>

    <div className="qb-progress">
      <div className="qb-progress-dot active" data-step="1"></div>
      <div className="qb-progress-dot" data-step="2"></div>
      <div className="qb-progress-dot" data-step="3"></div>
      <div className="qb-progress-dot" data-step="4"></div>
      <div className="qb-progress-dot" data-step="5"></div>
    </div>

    {/* STEP 1: Name */}
    <div className="qb-step active" data-step="1">
      <div className="qb-step-label" data-en="What's your name?" data-ar="اسمك إيه؟">What's your name?</div>
      <input type="text" className="qb-input" id="qbName" placeholder="Your name" data-en-placeholder="Your name" data-ar-placeholder="اسمك" />
      <div className="qb-actions">
        <button className="qb-btn qb-btn-primary" onClick={() => { if(typeof window !== "undefined" && window.qbNext) { window.qbNext() } } }>
          <span data-en="Next" data-ar="التالي">Next</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>

    {/* STEP 2: Project Type */}
    <div className="qb-step" data-step="2">
      <div className="qb-step-label" data-en="What kind of project?" data-ar="نوع المشروع؟">What kind of project?</div>
      <div className="qb-options">
        <button className="qb-option" data-field="projectType" data-value="Video Editing">
          <span className="qb-option-icon">🎬</span><span data-en="Video Editing" data-ar="مونتاج فيديو">Video Editing</span>
        </button>
        <button className="qb-option" data-field="projectType" data-value="Cinematography">
          <span className="qb-option-icon">📷</span><span data-en="Cinematography" data-ar="تصوير سينمائي">Cinematography</span>
        </button>
        <button className="qb-option" data-field="projectType" data-value="Brand Content">
          <span className="qb-option-icon">✨</span><span data-en="Brand Content" data-ar="محتوى براند">Brand Content</span>
        </button>
        <button className="qb-option" data-field="projectType" data-value="Documentary">
          <span className="qb-option-icon">🎞️</span><span data-en="Documentary" data-ar="فيلم وثائقي">Documentary</span>
        </button>
        <button className="qb-option" data-field="projectType" data-value="Social Media">
          <span className="qb-option-icon">📱</span><span data-en="Social Media" data-ar="سوشيال ميديا">Social Media</span>
        </button>
        <button className="qb-option" data-field="projectType" data-value="Other">
          <span className="qb-option-icon">💡</span><span data-en="Something else" data-ar="حاجة تانية">Something else</span>
        </button>
      </div>
      <div className="qb-actions">
        <button className="qb-btn qb-btn-ghost" onClick={() => { if(typeof window !== "undefined" && window.qbPrev) { window.qbPrev() } } }>
          <span data-en="Back" data-ar="رجوع">Back</span>
        </button>
        <button className="qb-btn qb-btn-primary" id="qbStep2Next" onClick={() => { if(typeof window !== "undefined" && window.qbNext) { window.qbNext() } } }>
          <span data-en="Next" data-ar="التالي">Next</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>

    {/* STEP 3: Budget */}
    <div className="qb-step" data-step="3">
      <div className="qb-step-label" data-en="Budget range?" data-ar="الميزانية التقريبية؟">Budget range?</div>
      <div className="qb-step-helper" data-en="Helps me suggest the right scope. Honest answers help us both." data-ar="بيساعدني أقترح حاجة مناسبة. الصراحة بتفيدنا الاتنين.">Helps me suggest the right scope. Honest answers help us both.</div>
      <div className="qb-options">
        <button className="qb-option" data-field="budget" data-value="Under $500">
          <span data-en="Under $500" data-ar="أقل من $500">Under $500</span>
        </button>
        <button className="qb-option" data-field="budget" data-value="$500 - $2K">
          <span data-en="$500 — $2K" data-ar="$500 — $2K">$500 — $2K</span>
        </button>
        <button className="qb-option" data-field="budget" data-value="$2K - $5K">
          <span data-en="$2K — $5K" data-ar="$2K — $5K">$2K — $5K</span>
        </button>
        <button className="qb-option" data-field="budget" data-value="$5K+">
          <span data-en="$5K and up" data-ar="$5K وأكثر">$5K and up</span>
        </button>
        <button className="qb-option" data-field="budget" data-value="Not sure yet">
          <span data-en="Not sure yet" data-ar="مش متأكد لسه">Not sure yet</span>
        </button>
        <button className="qb-option" data-field="budget" data-value="Flexible">
          <span data-en="Let's discuss" data-ar="نتفاهم">Let's discuss</span>
        </button>
      </div>
      <div className="qb-actions">
        <button className="qb-btn qb-btn-ghost" onClick={() => { if(typeof window !== "undefined" && window.qbPrev) { window.qbPrev() } } }>
          <span data-en="Back" data-ar="رجوع">Back</span>
        </button>
        <button className="qb-btn qb-btn-primary" id="qbStep3Next" onClick={() => { if(typeof window !== "undefined" && window.qbNext) { window.qbNext() } } }>
          <span data-en="Next" data-ar="التالي">Next</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>

    {/* STEP 4: Timeline + Optional details */}
    <div className="qb-step" data-step="4">
      <div className="qb-step-label" data-en="When do you need it?" data-ar="إمتى محتاجه؟">When do you need it?</div>
      <div className="qb-options" style={{ marginBottom: '24px' }}>
        <button className="qb-option" data-field="timeline" data-value="ASAP (this week)">
          <span className="qb-option-icon">⚡</span><span data-en="ASAP" data-ar="حالاً">ASAP</span>
        </button>
        <button className="qb-option" data-field="timeline" data-value="This month">
          <span className="qb-option-icon">📅</span><span data-en="This month" data-ar="الشهر ده">This month</span>
        </button>
        <button className="qb-option" data-field="timeline" data-value="Next month">
          <span className="qb-option-icon">📆</span><span data-en="Next month" data-ar="الشهر الجاي">Next month</span>
        </button>
        <button className="qb-option" data-field="timeline" data-value="Flexible">
          <span className="qb-option-icon">🌊</span><span data-en="Flexible" data-ar="مرن">Flexible</span>
        </button>
      </div>
      <div className="qb-step-label" data-en="Anything else? (optional)" data-ar="أي حاجة تانية؟ (اختياري)">Anything else? (optional)</div>
      <textarea className="qb-input qb-textarea" id="qbDetails" placeholder="Brief description, references, links..." data-en-placeholder="Brief description, references, links..." data-ar-placeholder="وصف سريع، مراجع، روابط..."></textarea>
      <div className="qb-actions">
        <button className="qb-btn qb-btn-ghost" onClick={() => { if(typeof window !== "undefined" && window.qbPrev) { window.qbPrev() } } }>
          <span data-en="Back" data-ar="رجوع">Back</span>
        </button>
        <button className="qb-btn qb-btn-primary" id="qbStep4Next" onClick={() => { if(typeof window !== "undefined" && window.qbNext) { window.qbNext() } } }>
          <span data-en="Continue" data-ar="استمر">Continue</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>

    {/* STEP 5: Choose channel */}
    <div className="qb-step" data-step="5">
      <div className="qb-step-label" data-en="How should we connect?" data-ar="نتواصل إزاي؟">How should we connect?</div>
      <div className="qb-summary">
        <div className="qb-summary-title" data-en="Your brief" data-ar="ملخص">Your brief</div>
        <div id="qbSummaryItems"></div>
      </div>
      <div className="qb-channels">
        <button className="qb-channel qb-channel-whatsapp" onClick={() => { if(typeof window !== "undefined" && window.qbSend) { window.qbSend('whatsapp') } } }>
          <div className="qb-channel-icon">💬</div>
          <div className="qb-channel-text">
            <div className="qb-channel-title" data-en="Message on WhatsApp" data-ar="رسالة على واتساب">Message on WhatsApp</div>
            <div className="qb-channel-desc" data-en="Fastest reply — usually within hours" data-ar="أسرع رد — عادةً في خلال ساعات">Fastest reply — usually within hours</div>
          </div>
          <div className="qb-channel-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></div>
        </button>
        <button className="qb-channel qb-channel-email" onClick={() => { if(typeof window !== "undefined" && window.qbSend) { window.qbSend('email') } } }>
          <div className="qb-channel-icon">✉️</div>
          <div className="qb-channel-text">
            <div className="qb-channel-title" data-en="Send via Email" data-ar="ابعت عبر الإيميل">Send via Email</div>
            <div className="qb-channel-desc" data-en="For detailed briefs and attachments" data-ar="للتفاصيل والمرفقات">For detailed briefs and attachments</div>
          </div>
          <div className="qb-channel-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></div>
        </button>
        <button className="qb-channel qb-channel-meeting" onClick={() => { if(typeof window !== "undefined" && window.qbSend) { window.qbSend('meeting') } } }>
          <div className="qb-channel-icon">📅</div>
          <div className="qb-channel-text">
            <div className="qb-channel-title" data-en="Book a discovery call" data-ar="احجز مكالمة استكشاف">Book a discovery call</div>
            <div className="qb-channel-desc" data-en="Free 30-min session at your convenience" data-ar="جلسة ٣٠ دقيقة مجانية في وقت يناسبك">Free 30-min session at your convenience</div>
          </div>
          <div className="qb-channel-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></div>
        </button>
      </div>
      <div className="qb-actions">
        <button className="qb-btn qb-btn-ghost" onClick={() => { if(typeof window !== "undefined" && window.qbPrev) { window.qbPrev() } } } style={{ flex: 'none', padding: '14px 28px' }}>
          <span data-en="Back" data-ar="رجوع">Back</span>
        </button>
      </div>
    </div>

    {/* STEP 6: Book a Call (Iframe) */}
    <div className="qb-step" data-step="6">
      <div className="qb-step-label" data-en="Pick a time that works for you" data-ar="اختار الوقت اللي يناسبك">Pick a time that works for you</div>
      <div style={{ width: '100%', height: '500px', borderRadius: '12px', overflow: 'hidden', background: '#fff', marginBottom: '24px' }}>
         {/* Fallback to simple iframe or placeholder for now, since /book is empty */}
         <iframe src="/book" style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
      </div>
      <div className="qb-actions">
        <button className="qb-btn qb-btn-ghost" onClick={() => { if(typeof window !== "undefined" && window.qbClose) { window.qbClose() } } } style={{ flex: 'none', padding: '14px 28px', width: '100%' }}>
          <span data-en="Close" data-ar="إغلاق">Close</span>
        </button>
      </div>
    </div>

  </div>
</div>



{/* ═══════════════════ GLOBAL SOCIAL RAIL ═══════════════════ */}
<div className="social-rail" id="socialRail">
  <div className="social-rail-track"></div>
  {socialData.map((social) => {
    // Basic mapping from platform to icon
    let iconClass = "fa-solid fa-link";
    if (social.platform.toLowerCase().includes('instagram')) iconClass = "fa-brands fa-instagram";
    else if (social.platform.toLowerCase().includes('linkedin')) iconClass = "fa-brands fa-linkedin";
    else if (social.platform.toLowerCase().includes('youtube')) iconClass = "fa-brands fa-youtube";
    else if (social.platform.toLowerCase().includes('behance')) iconClass = "fa-brands fa-behance";
    else if (social.platform.toLowerCase().includes('facebook')) iconClass = "fa-brands fa-facebook";
    else if (social.platform.toLowerCase().includes('twitter') || social.platform.toLowerCase().includes('x')) iconClass = "fa-brands fa-x-twitter";
    else if (social.platform.toLowerCase().includes('github')) iconClass = "fa-brands fa-github";
    
    return (
      <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="social-rail-dot" aria-label={social.platform}>
        <i className={social.icon || iconClass} style={{ fontSize: '1.2rem', color: 'currentColor' }}></i>
        <span className="social-rail-tooltip" data-en={social.platform} data-ar={social.platform}>{social.platform}</span>
      </a>
    );
  })}
</div>


</div>
    </main>
  );
}
