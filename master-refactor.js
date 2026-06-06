const fs = require('fs');
const file = 'd:/karim/karim-portfolio/src/app/client-page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Helper to replace section by ID
function replaceSection(id, newContent) {
  const startTag = '<section id="' + id + '"';
  const endTag = '</section>';
  const startIndex = content.indexOf(startTag);
  if (startIndex === -1) {
    console.log('Section ' + id + ' not found!');
    return;
  }
  const endIndex = content.indexOf(endTag, startIndex) + endTag.length;
  const block = content.substring(startIndex, endIndex);
  content = content.replace(block, newContent);
  console.log('Refactored ' + id);
}

// 1. Hero CTAs
const heroReplacement = `<section id="hero" data-page="home">
  <div className="hero-image">
    <div className="photo-bg" style={{ backgroundImage: heroData?.image ? \`url(\${heroData.image})\` : undefined }}></div>
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
      <a href={heroData?.ctaPrimaryLink || "#"} onClick={(e) => { if (heroData?.ctaPrimaryLink?.startsWith('#')) { e.preventDefault(); if(typeof window !== "undefined" && window.spaGo) { window.spaGo(heroData.ctaPrimaryLink.substring(1)); } } else { e.preventDefault(); if(typeof window !== "undefined" && window.qbOpen) { window.qbOpen(); } } } } className="cta-primary">
        <span data-en={heroData?.ctaPrimaryText || "Book a Free Discovery Call"} data-ar={heroData?.ctaPrimaryTextAr || "احجز جلسة استكشاف مجانية"}>{heroData?.ctaPrimaryText || "Book a Free Discovery Call"}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
      </a>
      <a href={heroData?.ctaSecondaryLink || "#work"} onClick={(e) => { if(heroData?.ctaSecondaryLink?.startsWith('#')) { e.preventDefault(); if(typeof window !== "undefined" && window.spaGo) { window.spaGo(heroData.ctaSecondaryLink.substring(1)); } } else if(heroData?.ctaSecondaryLink?.startsWith('/work')) { e.preventDefault(); if(typeof window !== "undefined" && window.spaGo) { window.spaGo('work'); } } } } className="cta-secondary">
        <span data-en={heroData?.ctaSecondaryText || "See My Work"} data-ar={heroData?.ctaSecondaryTextAr || "شاهد أعمالي"}>{heroData?.ctaSecondaryText || "See My Work"}</span>
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
</section>`;
replaceSection('hero', heroReplacement);

// 2. Welcome Stats & Chapters
const welcomeStart = '<div className="welcome-stats">';
const welcomeEnd = '</div>\n    </div>';
if (content.indexOf(welcomeStart) !== -1) {
  const block = content.substring(content.indexOf(welcomeStart), content.indexOf(welcomeEnd) + welcomeEnd.length);
  const newWelcome = `<div className="welcome-stats">
      {(statsData || []).filter((s: any) => s.active).map((stat: any, index: number) => (
        <div key={stat.id} className="stat-card">
          <div className="stat-num"><span className="count" data-target={stat.number.replace(/[^0-9]/g, '')} data-suffix={stat.suffix || ''}>{stat.number}</span></div>
          <div className="stat-label" data-en={stat.label} data-ar={stat.labelAr || stat.label}>{stat.label}</div>
        </div>
      ))}
    </div>
    <div className="welcome-chapters">
      {(welcomeChaptersData || []).filter((c: any) => c.active).map((chapter: any, index: number) => (
        <div key={chapter.id} className="wch-card reveal" style={{ transitionDelay: \`\${index * 150}ms\` }}>
          <div className="wch-icon"><svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
          <div className="wch-title" data-en={chapter.title} data-ar={chapter.titleAr || chapter.title}>{chapter.title}</div>
          <div className="wch-desc" data-en={chapter.description} data-ar={chapter.descriptionAr || chapter.description}>{chapter.description}</div>
        </div>
      ))}
    </div>`;
  content = content.replace(block, newWelcome);
  console.log("Refactored Welcome");
}

// 3. Home Brands
const homeBrandsReplacement = `<section id="home-brands" data-page="home">
  <div className="container">
    <div className="home-brands-wrap reveal">
      <div className="home-brands-label" data-en="Trusted by teams at" data-ar="بثقة فرق من">Trusted by teams at</div>
      <div className="home-brands-marquee">
        <div className="home-brands-track" style={{ animation: 'marquee 20s linear infinite', display: 'flex', gap: '2rem' }}>
          {[...(brandsData || []), ...(brandsData || [])].filter((b: any) => b.active).map((brand: any, i: number) => (
            <React.Fragment key={i}>
              <span className="hb-item" style={{ whiteSpace: 'nowrap' }}>
                {brand.logo ? <img src={brand.logo} alt={brand.name} style={{height: '24px', display: 'inline-block'}} /> : brand.name}
              </span>
              <span className="hb-dot">●</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>`;
replaceSection('home-brands', homeBrandsReplacement);

// 4. Home Services (Keep UI same, just map)
const homeServicesReplacement = `<section id="home-services" data-page="home">
  <div className="container">
    <div className="text-center mb-16 reveal">
      <div className="eyebrow" data-en="Expertise" data-ar="الخبرات">Expertise</div>
      <h2 className="heading" data-en="What I do." data-ar="ماذا أقدم">What I do.</h2>
    </div>
    <div className="hs-grid">
      {(servicesData || []).filter((s: any) => s.active).slice(0, 3).map((service: any, index: number) => (
        <div key={service.id} className="hs-card reveal" style={{ transitionDelay: \`\${index * 150}ms\` }}>
          <div className="hs-icon" dangerouslySetInnerHTML={{ __html: service.icon || '<svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>' }}></div>
          <h3 data-en={service.title} data-ar={service.titleAr || service.title}>{service.title}</h3>
          <p data-en={service.description} data-ar={service.descriptionAr || service.description}>{service.description}</p>
          <a href="#services" onClick={(e) => { e.preventDefault(); if(typeof window !== "undefined" && window.spaGo) { window.spaGo('services'); } } } className="hs-link" data-en="Learn more" data-ar="اكتشف المزيد">Learn more &rarr;</a>
        </div>
      ))}
    </div>
    <div className="text-center mt-12 reveal">
      <a href="#services" onClick={(e) => { e.preventDefault(); if(typeof window !== "undefined" && window.spaGo) { window.spaGo('services'); } } } className="cta-secondary">
        <span data-en="View all services" data-ar="شاهد كل الخدمات">View all services</span>
      </a>
    </div>
  </div>
</section>`;
replaceSection('home-services', homeServicesReplacement);

// 5. Testimonials
const testimonialsReplacement = `<section id="testimonials" data-page="home">
  <div className="container">
    <div className="testi-carousel reveal">
      <div className="testi-track" style={{ display: 'flex', overflowX: 'auto', gap: '2rem', scrollSnapType: 'x mandatory' }}>
        {(testimonialsData || []).filter((t: any) => t.active).map((testimonial: any) => (
          <div key={testimonial.id} className="testi-card" style={{ flex: '0 0 100%', scrollSnapAlign: 'start' }}>
            <div className="testi-q">"</div>
            <p className="testi-text" data-en={testimonial.content} data-ar={testimonial.contentAr || testimonial.content}>{testimonial.content}</p>
            <div className="testi-author">
              {testimonial.image ? <img src={testimonial.image} alt={testimonial.name} style={{width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover'}} /> : null}
              <div>
                <strong data-en={testimonial.name} data-ar={testimonial.nameAr || testimonial.name}>{testimonial.name}</strong>
                <span data-en={testimonial.role} data-ar={testimonial.roleAr || testimonial.role}>{testimonial.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>`;
replaceSection('testimonials', testimonialsReplacement);

// 6. About (Story)
const aboutReplacement = `<section id="about" data-page="about">
  <div className="container">
    <div className="about-grid">
      <div className="about-text reveal">
        <div className="eyebrow" data-en="The Story" data-ar="القصة">The Story</div>
        <h2 className="heading" data-en="Editing isn't just cutting footage." data-ar="المونتاج مش مجرد قص فيديوهات.">Editing isn't just cutting footage.</h2>
        <div className="about-content">
          {(storyData || []).filter((s: any) => s.active).map((story: any) => (
            <div key={story.id}>
              <h3 data-en={story.title} data-ar={story.titleAr || story.title}>{story.title}</h3>
              <p data-en={story.content} data-ar={story.contentAr || story.content}>{story.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="about-visual reveal">
        <div className="about-img-wrap">
          <div className="photo-bg" style={{ backgroundImage: "url('/images/about.jpg')" }}></div>
          <div className="about-badge">
            <span className="count" data-target="8">8</span>+ <span data-en="Years Exp" data-ar="سنوات خبرة">Years Exp</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
replaceSection('about', aboutReplacement);

// 7. Process
const processReplacement = `<section id="process" data-page="about">
  <div className="container">
    <div className="text-center mb-16 reveal">
      <div className="eyebrow" data-en="Workflow" data-ar="سير العمل">Workflow</div>
      <h2 className="heading" data-en="How we collaborate." data-ar="إزاي بنشتغل مع بعض">How we collaborate.</h2>
    </div>
    <div className="process-timeline">
      {(processData || []).filter((p: any) => p.active).map((step: any, index: number) => (
        <div key={step.id} className="proc-step reveal">
          <div className="proc-num">{String(index + 1).padStart(2, '0')}</div>
          <div className="proc-content">
            <h3 data-en={step.title} data-ar={step.titleAr || step.title}>{step.title}</h3>
            <p data-en={step.description} data-ar={step.descriptionAr || step.description}>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>`;
replaceSection('process', processReplacement);

// 8. Services (Main)
const servicesReplacement = `<section id="services" data-page="services">
  <div className="container">
    <div className="text-center mb-16 reveal">
      <div className="eyebrow" data-en="Services" data-ar="الخدمات">Services</div>
      <h2 className="heading" data-en="Crafted services." data-ar="خدمات احترافية">Crafted services.</h2>
      <p className="lead" data-en="Whether it's a 15-second social ad or a 60-minute documentary, the goal is the same: make them feel it." data-ar="سواء إعلان ١٥ ثانية أو وثائقي ٦٠ دقيقة، الهدف واحد: نخليهم يعيشوا الإحساس.">Whether it's a 15-second social ad or a 60-minute documentary, the goal is the same: make them feel it.</p>
    </div>

    <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(servicesData || []).filter((s: any) => s.active).map((service: any) => (
        <div key={service.id} className="svc-card reveal" data-service={service.id}>
          <div className="svc-icon" dangerouslySetInnerHTML={{ __html: service.icon || '<svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>' }}></div>
          <div className="svc-card-body">
            <div className="svc-title" data-en={service.title} data-ar={service.titleAr || service.title}>{service.title}</div>
            <p className="svc-desc" data-en={service.description} data-ar={service.descriptionAr || service.description}>{service.description}</p>
          </div>
          <span className="svc-cta" data-en="View Work" data-ar="شاهد الأعمال">View Work</span>
        </div>
      ))}
    </div>
  </div>
</section>`;
replaceSection('services', servicesReplacement);

// 9. Training
const trainingReplacement = `<section id="training" data-page="training">
  <div className="container">
    <div className="eyebrow" data-en={trainingData?.eyebrow || "Level Up"} data-ar={trainingData?.eyebrowAr || "ارتقي بمستواك"}>{trainingData?.eyebrow || "Level Up"}</div>
    <h2 className="heading" data-en={trainingData?.title || "Editing mentorship."} data-ar={trainingData?.titleAr || "برنامج تدريب المونتاج"}>{trainingData?.title || "Editing mentorship."}</h2>
    <div className="training-card">
      <div>
        <h3 data-en={trainingData?.subtitle || "Learn from a working professional."} data-ar={trainingData?.subtitleAr || "تعلم من محترف يمارس المجال"}>{trainingData?.subtitle || "Learn from a working professional."}</h3>
        <p data-en={trainingData?.description || "Focused, practical training..."} data-ar={trainingData?.descriptionAr || trainingData?.description} dangerouslySetInnerHTML={{ __html: trainingData?.description || "Get 1-on-1 guidance to level up your editing skills." }}></p>
        <div className="consult-btn-wrap mt-8">
          <a href="#" onClick={(e) => { e.preventDefault(); if(typeof window !== "undefined" && window.qbOpen) { window.qbOpen(); } } } className="consult-btn">
            <span data-en={trainingData?.ctaText || "Book a Consultation"} data-ar={trainingData?.ctaTextAr || "احجز استشارة"}>{trainingData?.ctaText || "Book a Consultation"}</span>
          </a>
        </div>
      </div>
      <div className="training-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(trainingStatsData || []).filter((s: any) => s.active).map((stat: any) => (
          <div key={stat.id} className="ts">
            <div className="ts-n">
              {stat.number && stat.number !== '' ? <span className="count" data-target={stat.number.replace(/[^0-9]/g, '')} data-suffix={stat.suffix || ''}>{stat.number}</span> : <span data-en={stat.label} data-ar={stat.labelAr || stat.label}>{stat.label}</span>}
            </div>
            {stat.number && stat.number !== '' && <div className="ts-l" data-en={stat.label} data-ar={stat.labelAr || stat.label}>{stat.label}</div>}
            {stat.subtext && <div className="text-xs text-white/40 mt-1" data-en={stat.subtext} data-ar={stat.subtextAr || stat.subtext}>{stat.subtext}</div>}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>`;
replaceSection('training', trainingReplacement);

// 10. FAQs
const newFaqBlock = `<div className="contact-faq">
      {(faqsData || []).filter((f: any) => f.active).map((faq: any) => (
        <div key={faq.id} className="faq-item">
          <div className="faq-q" data-en={faq.question} data-ar={faq.questionAr || faq.question}>{faq.question}</div>
          <div className="faq-a" data-en={faq.answer} data-ar={faq.answerAr || faq.answer}>{faq.answer}</div>
        </div>
      ))}
    </div>
    <div className="socials">`;
content = content.replace(/<div className="contact-faq">[\s\S]*?<\/div>\s*<div className="socials">/g, newFaqBlock);
console.log("Refactored FAQs");

// 11. Socials
const newSocialsBlock = `<div className="socials">
      {(socialData || []).filter((s: any) => s.active).map((social: any) => {
        let iconClass = "fa-solid fa-link";
        if (social.platform.toLowerCase().includes('instagram')) iconClass = "fa-brands fa-instagram";
        else if (social.platform.toLowerCase().includes('youtube')) iconClass = "fa-brands fa-youtube";
        else if (social.platform.toLowerCase().includes('behance')) iconClass = "fa-brands fa-behance";
        else if (social.platform.toLowerCase().includes('facebook')) iconClass = "fa-brands fa-facebook";
        else if (social.platform.toLowerCase().includes('twitter') || social.platform.toLowerCase().includes('x')) iconClass = "fa-brands fa-x-twitter";
        else if (social.platform.toLowerCase().includes('github')) iconClass = "fa-brands fa-github";
        
        return (
          <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="social-rail-dot" aria-label={social.platform}>
            {social.icon ? (
               <div dangerouslySetInnerHTML={{ __html: social.icon }} />
            ) : (
               <i className={iconClass} style={{ fontSize: '1.2rem', color: 'currentColor' }}></i>
            )}
            <span className="social-rail-tooltip" data-en={social.platform} data-ar={social.platform}>{social.platform}</span>
          </a>
        );
      })}
    </div>
  </div>
</section>`;
content = content.replace(/<div className="socials">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/g, newSocialsBlock);
console.log("Refactored Socials");

fs.writeFileSync(file, content);
console.log("DONE");
