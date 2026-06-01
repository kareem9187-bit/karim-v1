'use client';

import { useEffect, useRef, useState } from 'react';

interface Chapter {
  id: string;
  order: number;
  number: string;
  suffix: string | null;
  suffixAr: string | null;
  label: string;
  labelAr: string | null;
  phrase: string;
  phraseAr: string | null;
  subText: string | null;
  subTextAr: string | null;
  isIntro: boolean | null;
  isFinal: boolean | null;
}

export function Welcome({ chapters }: { chapters: Chapter[] }) {
  const [activeChapter, setActiveChapter] = useState(0);
  const [hidden, setHidden] = useState(false);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollTrackRef.current) return;
      const scrollTop = window.scrollY;
      const trackHeight = scrollTrackRef.current.offsetHeight - window.innerHeight;
      const progress = Math.min(scrollTop / trackHeight, 1);
      const chapterIndex = Math.min(
        Math.floor(progress * chapters.length),
        chapters.length - 1
      );
      setActiveChapter(chapterIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters.length]);

  const enterSite = () => {
    setHidden(true);
    window.scrollTo({ top: 0 });
    document.body.style.overflow = 'auto';
  };

  if (hidden) return null;

  return (
    <div id="welcome-section">
      {/* Scroll track */}
      <div ref={scrollTrackRef} style={{ height: '320vh', position: 'relative' }} />

      {/* Fixed viewport */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden z-[1]">
        {/* Welcome orbs */}
        <div className="absolute rounded-full pointer-events-none z-0 animate-pulse"
          style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(34,79,129,0.4), transparent 70%)', top: -100, right: -100, filter: 'blur(80px)' }} />
        <div className="absolute rounded-full pointer-events-none z-0"
          style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(45,106,171,0.3), transparent 70%)', bottom: -50, left: -80, filter: 'blur(80px)' }} />

        {/* Stage */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          {chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className={`absolute inset-0 flex items-center justify-center px-[60px] py-[80px] transition-all duration-600 ease-out ${
                index === activeChapter
                  ? 'opacity-100 visible translate-y-0'
                  : index < activeChapter
                  ? 'opacity-0 invisible -translate-y-[30px]'
                  : 'opacity-0 invisible translate-y-[30px]'
              }`}
            >
              <div className="text-center max-w-[1100px] w-full relative">
                {/* Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-[radial-gradient(ellipse_at_center,rgba(58,127,199,0.15)_0%,transparent_60%)] pointer-events-none z-[-1]" />

                {/* Intro chapter */}
                {chapter.isIntro && (
                  <>
                    <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#2d6aab] to-[#224f81] flex items-center justify-center text-white font-bold text-[42px] tracking-[-2px] mx-auto mb-11 shadow-[0_20px_60px_rgba(34,79,129,0.5),inset_0_2px_0_rgba(255,255,255,0.25)]">
                      KA
                    </div>
                    <h1
                      className="text-[clamp(48px,7vw,96px)] font-medium tracking-[-2px] leading-none text-white mb-6"
                      dangerouslySetInnerHTML={{ __html: chapter.phrase }}
                    />
                    <p className="text-lg text-[var(--muted)] font-normal tracking-[0.5px]">
                      {chapter.subText}
                    </p>
                  </>
                )}

                {/* Final chapter */}
                {chapter.isFinal && (
                  <>
                    <div className="flex items-center justify-center gap-[14px] text-[11px] tracking-[4px] uppercase text-[var(--blue4)] font-semibold mb-7">
                      <div className="w-8 h-px bg-[var(--blue4)]" />
                      <span>{chapter.label}</span>
                      <div className="w-8 h-px bg-[var(--blue4)]" />
                    </div>
                    <h2
                      className="text-[clamp(36px,5.5vw,72px)] font-medium leading-[1.1] tracking-[-1.5px] text-white mb-10"
                      dangerouslySetInnerHTML={{ __html: chapter.phrase }}
                    />
                    <button
                      onClick={enterSite}
                      className="cta-primary pointer-events-auto text-[15px]"
                    >
                      <span>Enter the work</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Number chapters */}
                {!chapter.isIntro && !chapter.isFinal && (
                  <>
                    <div className="flex items-center justify-center gap-[14px] text-[11px] tracking-[4px] uppercase text-[var(--blue4)] font-semibold mb-7">
                      <div className="w-8 h-px bg-[var(--blue4)]" />
                      <span>{chapter.label}</span>
                      <div className="w-8 h-px bg-[var(--blue4)]" />
                    </div>
                    <div className="text-[clamp(120px,20vw,300px)] font-medium leading-[0.9] tracking-[-6px] gradient-text mb-4">
                      {chapter.number}
                      {chapter.suffix && (
                        <span className="text-[0.35em] align-middle font-semibold text-[var(--blue4)] ml-[14px] tracking-[-1px]"
                          style={{ WebkitTextFillColor: 'var(--blue4)' }}>
                          {chapter.suffix}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-[clamp(20px,2.4vw,32px)] font-normal leading-[1.35] tracking-[-0.5px] text-[var(--text)] max-w-[780px] mx-auto mt-8"
                      dangerouslySetInnerHTML={{ __html: chapter.phrase }}
                    />
                    {chapter.subText && (
                      <div className="text-[13px] tracking-[2px] uppercase text-[var(--dim)] font-medium mt-10">
                        {chapter.subText}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={enterSite}
        className="fixed top-6 right-6 z-[200] inline-flex items-center gap-[10px] px-[26px] py-[14px] bg-gradient-to-br from-[rgba(34,79,129,0.85)] to-[rgba(45,106,171,0.85)] backdrop-blur-[20px] border border-[rgba(95,163,224,0.4)] rounded-full text-white text-[13px] font-semibold tracking-[0.5px] cursor-pointer shadow-[0_8px_24px_rgba(34,79,129,0.4)] hover:translate-y-[-2px] hover:scale-[1.03] transition-all duration-300"
      >
        <span>Skip to Portfolio</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[14px] h-[14px]">
          <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scroll hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-[10px] text-[11px] tracking-[3px] uppercase text-[var(--dim)] font-medium pointer-events-none">
        <span>Scroll to begin</span>
        <div className="w-8 h-12 rounded-full border border-[rgba(255,255,255,0.2)] flex items-start justify-center pt-2">
          <div className="w-[3px] h-2 rounded-full bg-white animate-bounce" />
        </div>
      </div>

      {/* Chapter counter */}
      <div className="fixed bottom-8 left-12 z-50 flex items-center gap-[10px] text-[11px] tracking-[3px] uppercase text-[var(--dim)] font-medium">
        <span className="text-sm text-[var(--blue4)] font-semibold tabular-nums min-w-[24px]">
          {String(activeChapter + 1).padStart(2, '0')}
        </span>
        <div className="w-6 h-px bg-[rgba(255,255,255,0.15)]" />
        <span>of {String(chapters.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
