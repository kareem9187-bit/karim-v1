const fs = require('fs');

let c = fs.readFileSync('src/app/client-page.tsx', 'utf8');

function replaceSection(id, newContent) {
  const s = '<section id="' + id + '"';
  const e = '</section>';
  const si = c.indexOf(s);
  if (si === -1) return;
  const ei = c.indexOf(e, si) + e.length;
  c = c.substring(0, si) + newContent + c.substring(ei);
}

const hero = `<section id="hero" data-page="home">
  <div className="hero-image">
    <div className="photo-bg" style={{ backgroundImage: heroData?.image ? \`url(\${heroData.image})\` : undefined }}></div>
  </div>
  <div className="hero-content">
    <div className="hero-greet" data-en={heroData?.greeting || "Hi I'm"} data-ar={heroData?.greetingAr || "أهلاً، أنا"}>{heroData?.greeting || "Hi I'm"}</div>
    <h1 className="hero-name" data-en-only="true">
      <span style={{ display: 'block' }}>{heroData?.name ? heroData.name.split(' ')[0] : 'Karim'}</span>
      <span style={{ display: 'block' }}>{heroData?.name ? heroData.name.split(' ').slice(1).join(' ') : 'Abdelaziz'}</span>
    </h1>
    <div className="hero-roles" data-en={heroData?.roles || "Filmmaker & Editor"} data-ar={heroData?.rolesAr || "صانع أفلام ومونتير"}>{heroData?.roles || "Filmmaker & Editor"}</div>
    <div className="hero-desc" data-en={heroData?.description || "I craft cinematic experiences..."} data-ar={heroData?.descriptionAr || "أصنع تجارب سينمائية..."}>{heroData?.description || "I craft cinematic experiences..."}</div>
    <div className="hero-actions">
      <a href="#work" onClick={(e) => { e.preventDefault(); (window as any).spaGo('work'); }} className="btn-primary">
        <span className="btn-text" data-en="See My Work" data-ar="شاهد أعمالي">See My Work</span>
        <div className="btn-hover-fx"></div>
      </a>
      <a href="#contact" onClick={(e) => { e.preventDefault(); (window as any).spaGo('contact'); }} className="btn-outline">
        <span className="btn-text" data-en="Let's Talk" data-ar="لنتحدث">Let's Talk</span>
        <div className="btn-hover-fx"></div>
      </a>
    </div>
  </div>
</section>`;

const brands = `<section id="home-brands" data-page="home">
  <div className="brands-strip">
    <div className="brands-track">
      {(brandsData?.brands || []).map((b: any, i: number) => (
        <div key={i} className="brand-logo">
          {b.logo ? (
            <img src={b.logo} alt={b.name || "Brand"} className="brand-img" />
          ) : (
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff', letterSpacing: '2px' }}>{b.name}</span>
          )}
        </div>
      ))}
      {(brandsData?.brands || []).map((b: any, i: number) => (
        <div key={'dup-'+i} className="brand-logo">
          {b.logo ? (
            <img src={b.logo} alt={b.name || "Brand"} className="brand-img" />
          ) : (
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff', letterSpacing: '2px' }}>{b.name}</span>
          )}
        </div>
      ))}
    </div>
  </div>
</section>`;

const services = `<section id="home-services" data-page="home">
  <div className="section-header">
    <h2 className="section-title" data-en="Services" data-ar="خدمات">Services</h2>
    <div className="section-line"></div>
  </div>
  <div className="services-grid">
    {(servicesData?.services || []).map((svc: any, i: number) => {
      // Find matching works
      const svcWorks = (worksData?.works || []).filter((w: any) => w.serviceId === svc._id);
      
      return (
        <div key={i} className="service-card group">
          <div className="service-icon" dangerouslySetInnerHTML={{ __html: svc.iconSvg || '<i class="fa fa-star"></i>' }}></div>
          <h3 className="service-title" data-en={svc.title} data-ar={svc.titleAr}>{svc.title}</h3>
          <p className="service-desc" data-en={svc.description} data-ar={svc.descriptionAr}>{svc.description}</p>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            if(svcWorks.length > 0) {
              // Open modal with works from this service
              const worksHtml = svcWorks.map((w:any) => 
                '<div class="work-modal-item" style="margin-bottom:1rem; border-bottom:1px solid #333; padding-bottom:1rem;">' +
                  (w.youtubeUrl ? '<iframe width="100%" height="200" src="'+w.youtubeUrl.replace("watch?v=","embed/")+'" frameborder="0" allowfullscreen></iframe>' : '') +
                  '<h4 style="margin-top:0.5rem; color:#f0f0f0;">'+w.title+'</h4>' +
                  (w.description ? '<p style="color:#aaa; font-size:0.9rem;">'+w.description+'</p>' : '') +
                '</div>'
              ).join('');
              
              (window as any).qbOpen('View Work', worksHtml);
            } else {
              (window as any).qbOpen('View Work', '<p>No work available for this service yet.</p>');
            }
          }} className="service-link">
            <span className="link-text" data-en="View Work" data-ar="شاهد أعمالي">View Work</span>
            <div className="link-arrow"></div>
          </a>
        </div>
      );
    })}
  </div>
</section>`;

replaceSection('hero', hero);
replaceSection('home-brands', brands);
replaceSection('home-services', services);

fs.writeFileSync('src/app/client-page.tsx', c);
console.log('Successfully refactored sections');
