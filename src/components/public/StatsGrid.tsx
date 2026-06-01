interface Stat {
  id: string;
  number: string;
  label: string;
  labelAr: string | null;
}

export function StatsGrid({ stats }: { stats: Stat[] }) {
  if (!stats.length) return null;

  return (
    <section id="home-stats" className="py-8 pb-12">
      <div className="grid grid-cols-4 gap-6 max-w-[1100px] mx-auto px-[60px] max-[900px]:grid-cols-2 max-[600px]:px-5">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="text-center py-8 px-5 bg-[var(--glass-bg)] backdrop-blur-[20px] saturate-[160%] border border-[rgba(255,255,255,0.1)] rounded-[20px] transition-all duration-[350ms] hover:border-[rgba(95,163,224,0.3)] hover:-translate-y-1"
          >
            <div className="text-[clamp(40px,5vw,64px)] font-semibold tracking-[-2px] leading-none gradient-text-stat mb-2">
              {stat.number}
            </div>
            <div className="text-[12px] tracking-[2px] uppercase text-[var(--muted)] font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
