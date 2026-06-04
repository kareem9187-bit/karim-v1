import { db } from '@/db/index';
import {
  hero,
  services,
  stats,
  brands,

  testimonials,
  trainingInfo,
  trainingStats,
  processSteps,
  storyChapters,
  countries,
  faqs,
  socialLinks,
  works,
  welcomeChapters,
  contactInfo,
} from '@/db/schema';
import ClientPage from './client-page';
import { eq } from 'drizzle-orm';
import { asc } from '@/lib/db-order';

export const dynamic = 'force-dynamic';

export default async function PublicPage() {
  const [heroData] = await db.select().from(hero).limit(1);
  const welcomeChaptersData = await db.select().from(welcomeChapters).where(eq(welcomeChapters.active, true)).orderBy(asc(welcomeChapters.order));
  const servicesData = await db.select().from(services).where(eq(services.active, true)).orderBy(asc(services.order));
  const statsData = await db.select().from(stats).where(eq(stats.active, true)).orderBy(asc(stats.order));
  const brandsData = await db.select().from(brands).where(eq(brands.active, true)).orderBy(asc(brands.order));
  const testimonialsData = await db.select().from(testimonials).where(eq(testimonials.active, true)).orderBy(asc(testimonials.order));
  const [trainingData] = await db.select().from(trainingInfo).limit(1);
  const trainingStatsData = await db.select().from(trainingStats).orderBy(asc(trainingStats.order));
  const processData = await db.select().from(processSteps).where(eq(processSteps.active, true)).orderBy(asc(processSteps.order));
  const storyData = await db.select().from(storyChapters).where(eq(storyChapters.active, true)).orderBy(asc(storyChapters.order));
  const countriesData = await db.select().from(countries).where(eq(countries.active, true));
  const faqsData = await db.select().from(faqs).where(eq(faqs.active, true)).orderBy(asc(faqs.order));
  const socialData = await db.select().from(socialLinks).where(eq(socialLinks.active, true)).orderBy(asc(socialLinks.order));
  const worksData = await db.select().from(works).where(eq(works.active, true)).orderBy(asc(works.order));
  const [contactData] = await db.select().from(contactInfo).limit(1);

  return (
    <ClientPage
      heroData={heroData}
        welcomeChaptersData={welcomeChaptersData}
      servicesData={servicesData}
      statsData={statsData}
      brandsData={brandsData}
      testimonialsData={testimonialsData}
      trainingData={trainingData}
      trainingStatsData={trainingStatsData}
      processData={processData}
      storyData={storyData}
      countriesData={countriesData}
      faqsData={faqsData}
      socialData={socialData}
      worksData={worksData}
      contactData={contactData}
    />
  );
}
