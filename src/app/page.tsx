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
  works
} from '@/db/schema';
import ClientPage from './client-page';
import { asc } from 'drizzle-orm';

export default async function PublicPage() {
  const [heroData] = await db.select().from(hero).limit(1);
  const servicesData = await db.select().from(services).orderBy(asc(services.order));
  const statsData = await db.select().from(stats).orderBy(asc(stats.order));
  const brandsData = await db.select().from(brands).orderBy(asc(brands.order));
  const testimonialsData = await db.select().from(testimonials).orderBy(asc(testimonials.order));
  const [trainingData] = await db.select().from(trainingInfo).limit(1);
  const trainingStatsData = await db.select().from(trainingStats).orderBy(asc(trainingStats.order));
  const processData = await db.select().from(processSteps).orderBy(asc(processSteps.order));
  const storyData = await db.select().from(storyChapters).orderBy(asc(storyChapters.order));
  const countriesData = await db.select().from(countries);
  const faqsData = await db.select().from(faqs).orderBy(asc(faqs.order));
  const socialData = await db.select().from(socialLinks).orderBy(asc(socialLinks.order));
  const worksData = await db.select().from(works).orderBy(asc(works.order));
  
  return (
    <ClientPage 
      heroData={heroData} 
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
    />
  );
}
