import { ArrowRight } from 'lucide-react';

interface HeroData {
  name: string;
  nameAr: string | null;
  greeting: string | null;
  tagline: string | null;
  taglineAr: string | null;
  ctaPrimaryText: string | null;
  ctaPrimaryLink: string | null;
  ctaSecondaryText: string | null;
  ctaSecondaryLink: string | null;
  image: string | null;
}

export function Hero({ data }: { data: HeroData | null }) {
  if (!data) return null;

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-[1] overflow-hidden bg-[#04060a]">
        {data.image && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${data.image})` }}
          />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #04060a 0%, rgba(4,6,10,0.92) 25%, rgba(4,6,10,0.55) 45%, rgba(4,6,10,0.15) 65%, transparent 80%), linear-gradient(to top, rgba(4,6,10,0.6) 0%, transparent 30%)'
          }}
        />
        <div className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 90% 60% at 75% 50%, rgba(45,106,171,0.18) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[3] w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {data.greeting && (
          <p className="text-lg font-normal text-[var(--color-text-secondary)] mb-4 tracking-[0.5px] animate-[fadeSlide_1s_ease-out]">
            {data.greeting}
          </p>
        )}

        <h1 className="text-[clamp(60px,8.5vw,128px)] font-extrabold leading-none tracking-[-3px] text-[var(--color-text-primary)] mb-4 animate-[heroFloat_6s_ease-in-out_infinite]">
          {data.name}
        </h1>

        {data.tagline && (
          <p className="text-[clamp(16px,1.6vw,20px)] font-normal text-[var(--color-text-secondary)] mt-8 max-w-[480px] leading-relaxed tracking-[0.3px]"
            dangerouslySetInnerHTML={{ __html: data.tagline }}
          />
        )}

        {/* CTAs */}
        <div className="flex flex-col md:flex-row gap-4 mt-12">
          {data.ctaPrimaryText && (
            <a href={data.ctaPrimaryLink || '#services'} className="cta-primary min-h-[48px] flex items-center justify-center gap-2">
              <span>{data.ctaPrimaryText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
          {data.ctaSecondaryText && (
            <a href={data.ctaSecondaryLink || '#services'} className="cta-secondary min-h-[48px] flex items-center justify-center">
              <span>{data.ctaSecondaryText}</span>
            </a>
          )}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {['8+ years experience', '1,300+ projects', '14 countries'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-[13px] text-[var(--color-text-secondary)] font-normal">
              <svg className="w-4 h-4 text-[var(--color-primary)] bg-[var(--color-primary-tint)] rounded-full p-[2px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
