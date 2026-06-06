### Code Section Audit Report

I have completed the audit of the `#hero`, `#home-cta`, and `#testimonials` sections between the old flat HTML (`d:/karim/index_33.html`) and the Next.js/React page (`d:/karim/karim-portfolio/src/app/client-page.tsx`).

The findings and exact JSX/TSX replacements are detailed below. You can save this report to `d:/karim/karim-portfolio/scratch/home_auditor.md`.

---

### 1. Section: `#hero` (Lines 410–449 in `client-page.tsx`)

#### Mismatches Identified
1. **Missing Primary CTA:** The primary CTA (`Book a Free Discovery Call` with class `cta-primary` and its SVG arrow) was completely omitted in the JSX code.
2. **Incorrect Secondary CTA Target:** The secondary CTA target linked to `#work` and triggered `window.spaGo('work')` instead of `#services` and `window.spaGo('services')` as in the original HTML.
3. **Inconsistent Tagline Fallbacks:** The fallback text inside translation attributes `data-en` and `data-ar` of `<p className="hero-tagline">` was truncated compared to the full sentences in the flat HTML.
4. **Extra Layout Classes:** The wrapper `<div className="hero-ctas">` had Tailwind classes (`flex flex-col md:flex-row gap-4`) appended, which did not exist in the original styling.

#### Proposed Reconciled JSX Code
```tsx
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
      data-en={heroData?.tagline || "I edit branded videos that turn <em>viewers into customers.</em> Cinematic craft for brands that need their content to <em>perform</em> — not just look pretty."} 
      data-ar={heroData?.taglineAr || "بعمل فيديوهات براند بتحوّل <em>المشاهدين لعملاء.</em> حرفة سينمائية للبراندات اللي محتاجة محتواها <em>يحقق نتائج</em> — مش بس يبقى جميل."}
      dangerouslySetInnerHTML={{ __html: heroData?.tagline || "I edit branded videos that turn <em>viewers into customers.</em> Cinematic craft for brands that need their content to <em>perform</em> — not just look pretty." }}
    ></p>
    <div className="hero-ctas">
      <a href="#" onClick={(e) => { e.preventDefault(); if(typeof window !== "undefined" && (window as any).qbOpen) { (window as any).qbOpen(); } }} className="cta-primary">
        <span data-en="Book a Free Discovery Call" data-ar="احجز جلسة استكشاف مجانية">Book a Free Discovery Call</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
      </a>
      <a href="#services" onClick={(e) => { e.preventDefault(); if(typeof window !== "undefined" && (window as any).spaGo) { (window as any).spaGo('services'); } }} className="cta-secondary">
        <span data-en="See My Work" data-ar="شاهد أعمالي">See My Work</span>
      </a>
    </div>
    <div className="hero-trust">
      <div className="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12"/></svg>
        <span data-en="Free 30-min consultation" data-ar="استشارة مجانية ٣٠ دقيقة">Free 30-min consultation</span>
      </div>
      <div className="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12"/></svg>
        <span data-en="No commitment required" data-ar="بدون أي التزام">No commitment required</span>
      </div>
      <div className="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12"/></svg>
        <span data-en="Reply within 24h" data-ar="رد خلال ٢٤ ساعة">Reply within 24h</span>
      </div>
    </div>
  </div>
</section>
```

---

### 2. Section: `#home-cta` (Lines 527–544 in `client-page.tsx`)

#### Mismatches Identified
1. **Extra Layout Classes:** The wrapper `<div className="home-cta-actions">` had Tailwind utility classes (`flex flex-col md:flex-row gap-4`) appended, which did not exist in the original styling.

#### Proposed Reconciled JSX Code
```tsx
{/* ═══════════════════ HOME — FINAL CTA ═══════════════════ */}
<section id="home-cta" data-page="home">
  <div className="container">
    <div className="home-cta-wrap reveal">
      <div className="home-cta-eyebrow" data-en="Let's create together" data-ar="خلينا نبدع سوا">Let's create together</div>
      <h2 className="home-cta-title" data-en="Ready to make <em>something real?</em>" data-ar="جاهز نعمل <em>حاجة حقيقية؟</em>">Ready to make <em>something real?</em></h2>
      <p className="home-cta-sub" data-en="A free 30-minute call. No commitment. Just a conversation about your project." data-ar="مكالمة مجانية ٣٠ دقيقة. بدون أي التزام. مجرد كلام عن مشروعك.">A free 30-minute call. No commitment. Just a conversation about your project.</p>
      <div className="home-cta-actions">
        <a href="#" onClick={(e) => { e.preventDefault(); if(typeof window !== "undefined" && (window as any).qbOpen) { (window as any).qbOpen(); } }} className="cta-primary">
          <span data-en="Start your project" data-ar="ابدأ مشروعك">Start your project</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="#about" onClick={(e) => { e.preventDefault(); if(typeof window !== "undefined" && (window as any).spaGo) { (window as any).spaGo('about'); } }} className="cta-secondary">
          <span data-en="Learn more about Karim" data-ar="اعرف أكثر عن كريم">Learn more about Karim</span>
        </a>
      </div>
    </div>
  </div>
</section>
```

---

### 3. Section: `#testimonials` (Lines 576–587 in `client-page.tsx`)

#### Mismatches Identified
- **None:** The structure and content of this section are already fully reconciled and identical to the original HTML layout (except for JSX-specific conversions like `className` and `style={{ ... }}`).

#### Proposed Reconciled JSX Code
```tsx
<section id="testimonials" data-page="home">
  <div className="container">
    <div style={{ textAlign: 'center' }}>
      <div className="eyebrow" data-en="See My Customers" data-ar="عملائي">See My Customers</div>
      <h2 className="heading" data-en="Awesome Clients." data-ar="عملاء مميزون">Awesome Clients.</h2>
      <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '540px', margin: '0 auto', lineHeight: '1.6' }} data-en="My foundation is in storytelling, with a keen eye for craft. I specialize in creating cinematic, engaging, and impactful video content." data-ar="أساسي هو حكاية القصص بعين فنية. متخصص في صناعة محتوى video سينمائي مؤثر وجذاب.">My foundation is in storytelling, with a keen eye for craft. I specialize in creating cinematic, engaging, and impactful video content.</p>
    </div>
  </div>
  <div className="testi-marquee-wrap" id="testiCarousel">
    {/* Rows are generated by JS */}
  </div>
</section>
```
