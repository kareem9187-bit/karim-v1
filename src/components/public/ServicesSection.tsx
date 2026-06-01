interface Service {
  id: string;
  title: string;
  titleAr: string | null;
  description: string;
  descriptionAr: string | null;
  icon: string | null;
}

export function ServicesSection({ services }: { services: Service[] }) {
  if (!services.length) return null;

  return (
    <section id="home-services" className="py-[60px] pb-[72px] px-[60px] max-[600px]:px-5">
      <div className="text-center mb-14">
        <span className="eyebrow">Services</span>
        <h2 className="heading mt-5">What I do</h2>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-[1100px] mx-auto max-[900px]:grid-cols-1">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-9 px-8 bg-[var(--glass-bg)] backdrop-blur-[20px] saturate-[160%] border border-[rgba(255,255,255,0.1)] rounded-[24px] cursor-pointer transition-all duration-[350ms] text-center hover:border-[rgba(95,163,224,0.4)] hover:-translate-y-[6px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-[16px] bg-[rgba(58,127,199,0.15)] border border-[rgba(95,163,224,0.3)] flex items-center justify-center mx-auto mb-6 transition-all duration-[350ms] group-hover:bg-[rgba(58,127,199,0.3)] group-hover:scale-110">
              <svg className="w-[26px] h-[26px] text-[var(--blue4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 10l-4 4l6 6l4-16l-18 7l4 2l2 6l3-4" />
              </svg>
            </div>

            <h3 className="text-[20px] font-semibold tracking-[-0.3px] text-white mb-[10px]">
              {service.title}
            </h3>
            <p className="text-[14px] text-[var(--muted)] leading-[1.6]">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
