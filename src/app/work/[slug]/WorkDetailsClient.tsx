'use client';

import { SpaNavbar } from '@/components/public/SpaNavbar';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WorkDetailsClient({ work }: { work: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo('.cinematic-fade-up',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
        );

        gsap.to('.hero-parallax', {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: '.hero-parallax-wrapper',
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <main ref={containerRef} style={{ minHeight: '100vh', background: '#050505', position: 'relative', overflowX: 'hidden' }}>
      <SpaNavbar />

      {/* Hero Section */}
      <div className="hero-parallax-wrapper" style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
        <div className="hero-parallax" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120%' }}>
          {work.thumbnail ? (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${work.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          ) : null}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.8) 70%, #050505 100%)' }} />
        </div>

        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '10vh', zIndex: 10 }}>
          <div className="cinematic-fade-up eyebrow" style={{ color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{work.category}</div>
          <h1 className="cinematic-fade-up heading" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.1, marginBottom: '1.5rem', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>{work.title}</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container" style={{ position: 'relative', zIndex: 20, marginTop: '-5vh', paddingBottom: '6rem' }}>
        <div className="cinematic-fade-up" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '3rem', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '4rem', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.25rem', lineHeight: '1.8' }}>
            {work.description}
          </p>
        </div>

        {/* Video Player */}
        {work.videoUrl && (
          <div className="cinematic-fade-up" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', background: '#000' }}>
            <iframe
              src={work.videoUrl}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Next Steps */}
        <div className="cinematic-fade-up text-center" style={{ marginTop: '6rem' }}>
          <a href="/#portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '1rem 2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', color: '#fff', textDecoration: 'none', transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.1)' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>Back to Portfolio</span>
          </a>
        </div>
      </div>
    </main>
  );
}
