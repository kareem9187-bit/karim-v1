# Code Section Audit Report: `#about`, `#map`, and `#process`

This report documents the structural, element, styling, and class-name comparisons between the original flat HTML file (`d:/karim/index_33.html`) and the React component (`d:/karim/karim-portfolio/src/app/client-page.tsx`).

---

## 1. `#about` Section Audit

### Findings:
- **Structural Alignment**: Fully aligned. Background layers, floating particles, and journey node lines are mapped exactly.
- **Attributes & Syntax**: React correctly uses `className`, `strokeWidth` (for SVGs), and client-side safe event handlers.
- **Bug/Warning Identified**: In **Chapter Three** (line 671 of `client-page.tsx`), a standard `class` attribute was used instead of `className`:
  ```tsx
  <span class="story-stat-num" data-count-target="8">0</span>
  ```
  This causes a console warning in React and has been corrected to `className="story-stat-num"` in the proposed JSX replacement below.

### proposed JSX Replacement (`#about` Section):
```tsx
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
          <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={1.5}>
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
          <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={1}>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>

  </div>
</section>
```

---

## 2. `#map` Section Audit

### Findings:
- **Structural Alignment**: Fully aligned.
- **Attributes & Syntax**: All definitions correctly formatted for React (`stopColor`, `stopOpacity`, and nested inline style objects).
- No discrepancies.

### proposed JSX Replacement (`#map` Section):
```tsx
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
      <stop offset="100%" stopColor="#aedcff" stop/>
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
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(127,196,255,0.06)" strokeWidth={0.5}/>
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
```

---

## 3. `#process` Section Audit

### Findings:
- **Tailwind Grid Override Discrepancies**:
  - React used `className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"` where original HTML has `class="process-grid"`.
  - React used `className="exp-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"` where original HTML has `class="exp-grid"`.
- **Impact**: These utility Tailwind grid classes overrode the CSS custom rules defined in the style block (which lay out `process-grid` in 4 columns and `exp-grid` in a balanced 2x2 grid on desktop). 
- **Reconciliation**: Reverted to custom CSS grid classes `process-grid` and `exp-grid` only, removing all Tailwind classes.

### proposed JSX Replacement (`#process` Section):
```tsx
{/* HOW I WORK */}
<section id="process" data-page="about">
  <div className="container">
    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
      <div className="eyebrow" data-en="The Process" data-ar="رحلة العمل">The Process</div>
      <h2 className="heading" data-en="Simple. Transparent. Fast." data-ar="بسيط. واضح. سريع.">Simple. Transparent. Fast.</h2>
      <p className="lead" data-en="From the first message to final delivery — here's exactly how we'll work together." data-ar="من أول رسالة لحد التسليم النهائي — اعرف بالظبط هنشتغل مع بعض إزاي.">From the first message to final delivery — here's exactly how we'll work together.</p>
    </div>

    <div className="process-grid">
      <div className="process-step">
        <div className="process-num">01</div>
        <div className="process-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
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
      <div className="exp-grid">
        <div className="exp-item">
          <div className="exp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div className="exp-content">
            <h4 className="exp-item-title" data-en="Quick feedback" data-ar="فيدباك سريع">Quick feedback</h4>
            <p className="exp-item-desc" data-en="Reviews within 48 hours. Delayed feedback delays delivery — simple as that." data-ar="مراجعة الفيدباك في خلال ٤٨ ساعة. التأخير في الفيدباك بيأخر التسليم — ببساطة كده.">Reviews within 48 hours. Delayed feedback delays delivery — simple as that.</p>
          </div>
        </div>
        <div className="exp-item">
          <div className="exp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <div className="exp-content">
            <h4 className="exp-item-title" data-en="Clear brief" data-ar="بريف واضح">Clear brief</h4>
            <p className="exp-item-desc" data-en="A simple doc with your goals, audience, and references. I'll guide you if needed." data-ar="مستند بسيط فيه أهدافك، الجمهور، والـ references. هساعدك تكتبه لو محتاج.">A simple doc with your goals, audience, and references. I'll guide you if needed.</p>
          </div>
        </div>
        <div className="exp-item">
          <div className="exp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </div>
          <div className="exp-content">
            <h4 className="exp-item-title" data-en="Open communication" data-ar="تواصل مفتوح">Open communication</h4>
            <p className="exp-item-desc" data-en="Tell me when something doesn't feel right. Honest feedback makes better work — always." data-ar="قوللي لو حاجة مش ماشية صح. الفيدباك الصريح بيعمل شغل أحسن — دايماً.">Tell me when something doesn't feel right. Honest feedback makes better work — always.</p>
          </div>
        </div>
        <div className="exp-item">
          <div className="exp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>
</section>
```
