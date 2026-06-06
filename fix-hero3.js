const fs = require('fs');
const file = 'd:/karim/karim-portfolio/src/app/client-page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetStart = `<div className="hero-ctas`;
const targetEnd = `      </div>\n      <div className="hero-trust">`;

const startIndex = content.indexOf(targetStart);
const endIndex = content.indexOf(targetEnd, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const block = content.substring(startIndex, endIndex + `      </div>`.length);
  
  const replacement = `<div className="hero-ctas flex flex-col md:flex-row gap-4">
        <a href={heroData?.ctaPrimaryLink || "#"} onClick={(e) => { if (heroData?.ctaPrimaryLink?.startsWith('#')) { e.preventDefault(); if(typeof window !== "undefined" && window.spaGo) { window.spaGo(heroData.ctaPrimaryLink.substring(1)); } } else { e.preventDefault(); if(typeof window !== "undefined" && window.qbOpen) { window.qbOpen(); } } } } className="cta-primary">
          <span data-en={heroData?.ctaPrimaryText || "Book a Free Discovery Call"} data-ar={heroData?.ctaPrimaryTextAr || "احجز جلسة استكشاف مجانية"}>{heroData?.ctaPrimaryText || "Book a Free Discovery Call"}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href={heroData?.ctaSecondaryLink || "#work"} onClick={(e) => { if(heroData?.ctaSecondaryLink?.startsWith('#')) { e.preventDefault(); if(typeof window !== "undefined" && window.spaGo) { window.spaGo(heroData.ctaSecondaryLink.substring(1)); } } else if(heroData?.ctaSecondaryLink?.startsWith('/work')) { e.preventDefault(); if(typeof window !== "undefined" && window.spaGo) { window.spaGo('work'); } } } } className="cta-secondary">
          <span data-en={heroData?.ctaSecondaryText || "See My Work"} data-ar={heroData?.ctaSecondaryTextAr || "شاهد أعمالي"}>{heroData?.ctaSecondaryText || "See My Work"}</span>
        </a>
      </div>`;

  content = content.replace(block, replacement);
  fs.writeFileSync(file, content);
  console.log('Fixed hero ctas exactly');
} else {
  console.log('Target string not found for hero ctas');
}
