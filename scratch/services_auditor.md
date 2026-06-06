# Code Audit Report: Reconciling `#services`, `#training`, and `#contact`

This report highlights the differences in HTML structure, styling, and class names between `index_33.html` (legacy flat HTML) and `client-page.tsx` (React page) for the `#services`, `#training`, and `#contact` sections, and provides the reconciled JSX replacement code that keeps React logic intact.

---

## 1. Summary of Mismatches

| Section | Element / Class / Feature | Legacy HTML (`index_33.html`) | React JSX (`client-page.tsx`) | Impact & Reconciled Decision |
| :--- | :--- | :--- | :--- | :--- |
| **`#services`** | Header Wrapper | Direct rendering under `.container` | Wrapped in an extra flex column: `<div className="text-center flex flex-col items-center mb-16">` | Remove React's extra wrapper to restore the legacy design. |
| **`#services`** | Sub-paragraph | Not present | `<p className="lead">...` | Remove the tag to match legacy HTML exactly. |
| **`#services`** | Grid Classes | `services-grid` | `services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` | Remove Tailwind responsive grid classes, reverting to base `services-grid` styling container. |
| **`#training`** | Button Handlers | `onclick="openQuickBrief();return false;"` | `onClick={() => { if(typeof window !== "undefined" && window.qbOpen) { window.qbOpen();return false; } } }` | Keep the React window modal hook (`window.qbOpen`) for proper React routing/bindings. |
| **`#training`** | Stats Container | `training-stats` | `training-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` | Revert to base `training-stats` to avoid stylesheet duplication/clashing. |
| **`#training`** | Reviews Grid | `video-reviews-grid` | `video-reviews-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` | Revert to base `video-reviews-grid`. |
| **`#training`** | Inline Style syntax | `style="animation-delay:.5s;"` | `style={{ animationDelay: '.5s' }}` | Retain style object conversion for JSX compilation compatibility. |
| **`#contact`** | Actions / CTA Cards | 2 main buttons (WhatsApp and Email) | 3 main buttons (WhatsApp, Email, and Meeting link to `/book`) | Remove the third "Book a Session" CTA to match the legacy HTML's 2-card actions list exactly. |

---

## 2. Reconciled JSX Code Blocks

Below are the exact JSX replacements for the three sections in `d:/karim/karim-portfolio/src/app/client-page.tsx`.

### Reconciled `#services` Section (JSX)
*Location: Replace lines 925–997 in `client-page.tsx`*

```tsx
{/* SERVICES (clickable cards) */}
<section id="services" data-page="services">
  <div className="container">
    <div className="eyebrow" data-en="What I Do" data-ar="خدماتي">What I Do</div>
    <h2 className="heading" data-en="Crafted services." data-ar="خدمات احترافية">Crafted services.</h2>

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
    <div className="services-grid">
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
```

---

### Reconciled `#training` Section (JSX)
*Location: Replace lines 1010–1119 in `client-page.tsx`*

```tsx
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
      <div className="training-stats">
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
      <div className="video-reviews-grid">
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
```

---

### Reconciled `#contact` Section (JSX)
*Location: Replace lines 1121–1190 in `client-page.tsx`*

```tsx
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        <div className="contact-cta-text">
          <div className="contact-cta-label" data-en="Project Brief" data-ar="بريف المشروع">Project Brief</div>
          <div className="contact-cta-action" data-en="Send via Email" data-ar="ارسل عبر الإيميل">Send via Email</div>
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
```
