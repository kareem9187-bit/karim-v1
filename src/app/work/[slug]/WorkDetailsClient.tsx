'use client';

import { SpaNavbar } from '@/components/public/SpaNavbar';
import Image from 'next/image';

export default function WorkDetailsClient({ work }: { work: any }) {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)', position: 'relative' }}>
      <div className="bg-canvas"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <SpaNavbar />

      <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
        <a href="/#work" style={{ color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', fontSize: '0.9rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Work
        </a>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="eyebrow">{work.category}</div>
          <h1 className="heading" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{work.title}</h1>
          <p style={{ color: 'var(--muted)', maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
            {work.description}
          </p>
        </div>

        {work.videoUrl ? (
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <iframe 
              src={work.videoUrl} 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        ) : work.thumbnail ? (
          <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <img src={work.thumbnail} alt={work.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        ) : null}
      </div>
    </main>
  );
}
