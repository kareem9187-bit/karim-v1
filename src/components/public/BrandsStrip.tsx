'use client';

interface Brand {
  id: string;
  name: string;
  style: string | null;
}

export function BrandsStrip({ brands }: { brands: Brand[] }) {
  if (!brands.length) return null;

  // Duplicate for infinite scroll
  const doubled = [...brands, ...brands];

  return (
    <section id="home-brands" className="py-10 relative overflow-hidden">
      <div className="text-center">
        <p className="text-[11px] tracking-[4px] uppercase text-[var(--dim)] font-semibold mb-8">
          Trusted by leading brands
        </p>
        <div className="relative w-full overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
          <div className="inline-flex items-center gap-12 whitespace-nowrap animate-[brandsScroll_30s_linear_infinite] hover:[animation-play-state:paused]">
            {doubled.map((brand, i) => (
              <span
                key={`${brand.id}-${i}`}
                className={`text-[clamp(20px,2.5vw,32px)] font-semibold tracking-[-0.5px] text-[rgba(240,243,248,0.4)] transition-colors duration-300 hover:text-white shrink-0 ${
                  brand.style === 'italic' ? 'italic font-medium tracking-[0.5px]' :
                  brand.style === 'bold-uppercase' ? 'font-bold uppercase tracking-[2px] text-[20px]' :
                  brand.style === 'condensed' ? 'font-bold tracking-[-1px]' : ''
                }`}
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes brandsScroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 24px)); }
        }
      `}</style>
    </section>
  );
}
