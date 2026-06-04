'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/training', label: 'Training' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuTitleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.set(overlayRef.current, {
            clipPath: 'inset(0% 0% 100% 0%)',
            visibility: 'hidden'
        });

        gsap.set(menuTitleRef.current, { yPercent: 120, skewY: 5, opacity: 0 });
        gsap.set(linksRef.current, { yPercent: 120, skewY: 5, opacity: 0 });

        timeline.current = gsap.timeline({ paused: true })
            .to(overlayRef.current, {
                clipPath: 'inset(0% 0% 0% 0%)',
                visibility: 'visible',
                duration: 1.2,
                ease: 'expo.inOut',
            })
            .to(menuTitleRef.current, {
                yPercent: 0,
                skewY: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power4.out',
            }, "-=0.6")
            .to(linksRef.current, {
                yPercent: 0,
                skewY: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power4.out',
                stagger: 0.1,
            }, "-=0.7");
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
        timeline.current?.play();
    } else {
        timeline.current?.reverse();
    }
  }, [mobileOpen]);

  return (
    <>
      <nav className={"fixed z-[100] flex items-center gap-2 p-2 backdrop-blur-[20px] saturate-[160%] border rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_0_var(--color-border)] md:top-6 md:left-1/2 md:-translate-x-1/2 md:w-auto w-[calc(100%-32px)] top-4 left-4 right-4 translate-x-0 justify-between px-4 py-2 transition-colors duration-300"}>
        {/* Shine line */}
        <div className={"absolute top-[1px] left-4 right-4 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.35)] to-transparent pointer-events-none transition-opacity duration-300"} />

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center min-w-[48px] min-h-[48px] md:min-w-[40px] md:min-h-[40px] rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-[var(--color-text-primary)] font-semibold text-[13px] no-underline tracking-[1px] shadow-[0_4px_12px_rgba(34,79,129,0.5),inset_0_1px_0_var(--color-border)] transition-transform duration-[250ms] hover:scale-105"
          onClick={() => setMobileOpen(false)}
        >
          <img src="/images/karim.jpg" alt="Karim" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
        </Link>

        {/* Desktop links */}
        <div className="items-center gap-2 hidden md:flex">
          <button className={"px-4 py-2 border rounded-full cursor-pointer text-[12px] font-medium tracking-[0.5px] transition-all duration-[250ms] hover:bg-[var(--color-border)]"}>
            العربية
          </button>
          <Link
            href="/book"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-[var(--color-text-primary)] no-underline text-[13px] font-semibold tracking-[0.3px] rounded-full shadow-[0_4px_14px_rgba(34,79,129,0.4),inset_0_1px_0_var(--color-border)] transition-all duration-[250ms] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(34,79,129,0.55)]"
          >
            <span>Book a Call</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Hamburger - Now visible on both desktop and mobile */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={"flex min-w-[48px] min-h-[48px] md:min-w-[40px] md:min-h-[40px] rounded-full border cursor-pointer flex-col items-center justify-center gap-[4px] transition-all duration-[250ms]"}
        >
          <span className={"block w-5 md:w-4 h-[1.5px] rounded-full transition-all duration-300"} />
          <span className={"block w-5 md:w-4 h-[1.5px] rounded-full transition-all duration-300"} />
          <span className={"block w-5 md:w-4 h-[1.5px] rounded-full transition-all duration-300"} />
        </button>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div
        ref={overlayRef}
        className="menu-overlay"
      >
        <div className="menu-overlay-content">
          <div>
            <div className="menu-link-wrapper">
              <h2 ref={menuTitleRef} className="menu-title">MENU</h2>
            </div>
          </div>

          <div className="menu-links">
            <div className="nav-links-list">
              {NAV_LINKS.map((item, index) => (
                <div key={item.label} className="menu-link-wrapper">
                  <Link
                    href={item.href}
                    className="huge-link"
                    onClick={() => setMobileOpen(false)}
                    ref={(el) => {
                      linksRef.current[index] = el;
                    }}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
