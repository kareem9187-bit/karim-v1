import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[rgba(255,255,255,0.06)] pt-16 px-[60px] pb-6 bg-[rgba(0,0,0,0.2)] max-[900px]:px-6 max-[900px]:pt-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
        {/* Brand */}
        <div className="flex flex-col gap-4 max-[900px]:col-span-full">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2d6aab] to-[#224f81] flex items-center justify-center text-white font-bold text-[15px] tracking-[0.5px] shadow-[0_4px_16px_rgba(34,79,129,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]">
            KA
          </div>
          <p className="text-sm text-[var(--muted)] leading-[1.6] max-w-[280px]">
            Cinematic editing & storytelling. Based in Cairo, working worldwide.
          </p>
        </div>

        {/* Pages */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] tracking-[3px] uppercase text-white font-semibold mb-1">Pages</h4>
          {['Home', 'About', 'Services', 'Work', 'Contact'].map((page) => (
            <Link key={page} href={`/${page.toLowerCase() === 'home' ? '' : page.toLowerCase()}`}
              className="text-sm text-[var(--muted)] no-underline transition-colors duration-[250ms] hover:text-[var(--blue4)]">
              {page}
            </Link>
          ))}
        </div>

        {/* Services */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] tracking-[3px] uppercase text-white font-semibold mb-1">Services</h4>
          {['Editing', 'Directing', 'Documentary', 'Brand Content'].map((svc) => (
            <span key={svc} className="text-sm text-[var(--muted)] cursor-pointer transition-colors duration-[250ms] hover:text-[var(--blue4)]">
              {svc}
            </span>
          ))}
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] tracking-[3px] uppercase text-white font-semibold mb-1">Connect</h4>
          {['WhatsApp', 'Email', 'Instagram', 'YouTube'].map((link) => (
            <span key={link} className="text-sm text-[var(--muted)] cursor-pointer transition-colors duration-[250ms] hover:text-[var(--blue4)]">
              {link}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1200px] mx-auto pt-6 border-t border-[rgba(255,255,255,0.04)] text-center">
        <p className="text-[12px] text-[var(--dim)] tracking-[1px]">
          © {new Date().getFullYear()} Karim Abdelaziz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
