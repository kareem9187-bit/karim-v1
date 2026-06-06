const fs = require('fs');
const file = 'd:/karim/karim-portfolio/src/app/client-page.tsx';
let content = fs.readFileSync(file, 'utf8');

const servicesStart = `<div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;
const servicesEnd = `</section>`;

const svcBlock = content.substring(content.indexOf(servicesStart), content.indexOf(servicesEnd));

if (svcBlock && !svcBlock.includes('servicesData.map')) {
  const newSvcBlock = `<div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  `;
  content = content.replace(svcBlock, newSvcBlock);
  fs.writeFileSync(file, content);
  console.log('Successfully refactored Services section');
}
