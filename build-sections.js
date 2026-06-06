const fs = require('fs');
const file = 'd:/karim/karim-portfolio/src/app/client-page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add "About" section before Services
const aboutSection = `
{/* ABOUT SECTION (Story & Process) */}
<section id="about" data-page="about">
  <div className="container">
    <div className="text-center flex flex-col items-center mb-16">
      <div className="eyebrow" data-en="About Me" data-ar="عني">About Me</div>
      <h2 className="heading" data-en="The Journey." data-ar="الرحلة">The Journey.</h2>
    </div>
    <div className="story-timeline grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
      {(storyData || []).filter((s: any) => s.active).map((story: any) => (
        <div key={story.id} className="story-card bg-white/5 border border-white/10 p-6 rounded-2xl reveal">
          <div className="text-sm text-gray-400 mb-2 font-mono">{story.year}</div>
          <h3 className="text-xl font-bold mb-3 text-white" data-en={story.title} data-ar={story.titleAr || story.title}>{story.title}</h3>
          <p className="text-gray-300 leading-relaxed" data-en={story.content} data-ar={story.contentAr || story.content}>{story.content}</p>
        </div>
      ))}
    </div>

    <div className="text-center flex flex-col items-center mb-16">
      <div className="eyebrow" data-en="How We Work" data-ar="كيف نعمل">How We Work</div>
      <h2 className="heading" data-en="The Process." data-ar="مراحل العمل">The Process.</h2>
    </div>
    <div className="process-grid grid grid-cols-1 md:grid-cols-3 gap-6">
      {(processData || []).filter((p: any) => p.active).map((step: any, index: number) => (
        <div key={step.id} className="process-step reveal" style={{ transitionDelay: \`\${index * 100}ms\` }}>
          <div className="text-5xl font-bold text-white/10 mb-4">{String(index + 1).padStart(2, '0')}</div>
          <h3 className="text-2xl font-bold mb-3 text-white" data-en={step.title} data-ar={step.titleAr || step.title}>{step.title}</h3>
          <p className="text-gray-400" data-en={step.description} data-ar={step.descriptionAr || step.description}>{step.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
`;

if (!content.includes('id="about"')) {
  content = content.replace(
    '<section id="services"',
    aboutSection + '\n<section id="services"'
  );
}

// 2. Add "Clients" section before Training
const clientsSection = `
{/* AWESOME CLIENTS SECTION (Brands & Testimonials) */}
<section id="clients" data-page="clients">
  <div className="container">
    <div className="text-center flex flex-col items-center mb-12">
      <div className="eyebrow" data-en="Awesome Clients" data-ar="عملاء رائعون">Awesome Clients</div>
      <h2 className="heading" data-en="Brands I've worked with." data-ar="براندات اشتغلت معاهم">Brands I've worked with.</h2>
    </div>
    
    <div className="brands-marquee overflow-hidden mb-24 relative">
      <div className="flex gap-12 whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
        {/* Double array for infinite scroll effect */}
        {[...(brandsData || []), ...(brandsData || [])].filter((b: any) => b.active).map((brand: any, i: number) => (
          <div key={i} className="brand-card inline-flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="h-12 object-contain" />
            ) : (
              <span className={\`text-3xl font-bold \${brand.style === 'bold-uppercase' ? 'uppercase' : brand.style === 'italic' ? 'italic' : ''}\`}>{brand.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>

    <div className="text-center flex flex-col items-center mb-12">
      <div className="eyebrow" data-en="Testimonials" data-ar="آراء العملاء">Testimonials</div>
      <h2 className="heading" data-en="What they say." data-ar="ماذا يقولون">What they say.</h2>
    </div>
    <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 gap-6">
      {(testimonialsData || []).filter((t: any) => t.active).map((testimonial: any) => (
        <div key={testimonial.id} className="review-card bg-white/5 border border-white/10 p-8 rounded-2xl reveal relative">
          <div className="absolute top-6 right-6 text-6xl text-white/5">"</div>
          <p className="text-lg text-gray-300 mb-6 italic relative z-10" data-en={testimonial.content} data-ar={testimonial.contentAr || testimonial.content}>"{testimonial.content}"</p>
          <div className="flex items-center gap-4">
            {testimonial.image ? (
              <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold">{testimonial.name.charAt(0)}</div>
            )}
            <div>
              <div className="font-bold text-white" data-en={testimonial.name} data-ar={testimonial.nameAr || testimonial.name}>{testimonial.name}</div>
              <div className="text-sm text-gray-400" data-en={testimonial.role} data-ar={testimonial.roleAr || testimonial.role}>{testimonial.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
`;

if (!content.includes('id="clients"')) {
  content = content.replace(
    '<section id="training"',
    clientsSection + '\n<section id="training"'
  );
}

// 3. Refactor Training
const trainingStart = `<section id="training" data-page="training">`;
const contactStart = `<section id="contact" data-page="contact">`;
let trainingBlock = content.substring(content.indexOf(trainingStart), content.indexOf(contactStart));

if (trainingBlock && !trainingBlock.includes('trainingStatsData.map')) {
  // We'll replace the hardcoded training-stats and student-reviews with dynamic mapping
  const newTrainingBlock = `<section id="training" data-page="training">
  <div className="container">
    <div className="eyebrow" data-en={trainingData?.eyebrow || "Level Up"} data-ar={trainingData?.eyebrowAr || "ارتقي بمستواك"}>{trainingData?.eyebrow || "Level Up"}</div>
    <h2 className="heading" data-en={trainingData?.title || "Editing mentorship."} data-ar={trainingData?.titleAr || "برنامج تدريب المونتاج"}>{trainingData?.title || "Editing mentorship."}</h2>
    <div className="training-card">
      <div>
        <h3 data-en={trainingData?.subtitle || "Learn from a working professional."} data-ar={trainingData?.subtitleAr || "تعلم من محترف يمارس المجال"}>{trainingData?.subtitle || "Learn from a working professional."}</h3>
        <p data-en={trainingData?.description || "Focused, practical training..."} data-ar={trainingData?.descriptionAr || trainingData?.description} dangerouslySetInnerHTML={{ __html: trainingData?.description || "" }}></p>
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
</section>
`;
  content = content.replace(trainingBlock, newTrainingBlock);
}

fs.writeFileSync(file, content);
console.log('Successfully injected About and Clients, and refactored Training');
