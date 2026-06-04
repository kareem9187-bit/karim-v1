import { db } from '@/db';
import { welcomeChapters, hero, stats, brands, services, testimonials } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { asc } from '@/lib/db-order';
import { Welcome } from '@/components/public/Welcome';
import { Hero } from '@/components/public/Hero';
import { BrandsStrip } from '@/components/public/BrandsStrip';
import { StatsGrid } from '@/components/public/StatsGrid';
import { ServicesSection } from '@/components/public/ServicesSection';

export default async function HomePage() {
  const [chaptersData, heroData, statsData, brandsData, servicesData] = await Promise.all([
    db.select().from(welcomeChapters).where(eq(welcomeChapters.active, true)).orderBy(asc(welcomeChapters.order)),
    db.select().from(hero).limit(1),
    db.select().from(stats).where(eq(stats.active, true)).orderBy(asc(stats.order)),
    db.select().from(brands).where(eq(brands.active, true)).orderBy(asc(brands.order)),
    db.select().from(services).where(eq(services.active, true)).orderBy(asc(services.order)),
  ]);

  const heroContent = heroData[0] || null;

  return (
    <>
      {/* Welcome Section (scroll-driven storytelling) */}
      <Welcome chapters={chaptersData} />

      {/* Portfolio Section */}
      <section id="portfolio-section">
        <Hero data={heroContent} />
        <BrandsStrip brands={brandsData} />
        <StatsGrid stats={statsData} />
        <ServicesSection services={servicesData} />
      </section>
    </>
  );
}
