const fs = require('fs');
const file = 'd:/karim/karim-portfolio/src/app/client-page.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `<section id="hero" data-page="home">
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
      <a href="#work" onClick={(e) => { e.preventDefault(); if(typeof window !== "undefined" && window.spaGo) { window.spaGo('work'); } } } className="cta-secondary">
        <span data-en="See My Work" data-ar="شاهد أعمالي">See My Work</span>
      </a>
    </div>`;

const replacement = `<section id="hero" data-page="home">
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
    </div>`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content);
  console.log('Fixed hero section exactly');
} else {
  console.log('Target string not found');
}
