import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { FloatingCTA } from '@/components/public/FloatingCTA';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Atmosphere background */}
      <div className="atmosphere" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <main className="relative z-10">{children}</main>

      {/* Floating CTA */}
      <FloatingCTA />

      {/* Footer */}
      <Footer />
    </>
  );
}
