import type { Metadata } from 'next';
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const fallbackTitle = 'Karim Abdelaziz — Film Director & Video Editor | Cairo';
  const fallbackDescription =
    'Karim Abdelaziz — cinematic film director, video editor, and documentary storyteller based in Cairo. Crafting brand films, commercials, and content that resonates worldwide. Trusted by Samsung, CUPRA, Artlist, and more.';
  const fallbackKeywords =
    'Karim Abdelaziz, video editor, film director, cinematographer, Cairo, documentary, brand content, video production, Egypt, cinematic editing';

  let settings: any = null;
  try {
    const [{ db }, { siteSettings }] = await Promise.all([
      import('@/db'),
      import('@/db/schema'),
    ]);
    [settings] = await db.select().from(siteSettings).limit(1);
  } catch (error) {
    console.warn('Using fallback metadata because site settings could not be loaded.', error);
  }

  const siteName = settings?.siteName || 'Karim Abdelaziz';
  const title = siteName === 'Karim Abdelaziz'
    ? fallbackTitle
    : `${siteName} — Film Director & Video Editor | Cairo`;
  const description = settings?.description || fallbackDescription;
  const keywords = settings?.keywords || fallbackKeywords;
  const themeColor = settings?.themeColor || '#04060a';
  const ogImages = settings?.ogImage ? [settings.ogImage] : undefined;

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteName }],
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://karimabdelaziz.com'),
    icons: settings?.favicon ? { icon: settings.favicon } : undefined,
    openGraph: {
      type: 'website',
      siteName,
      title,
      description,
      locale: 'en_US',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages,
    },
    other: {
      'theme-color': themeColor,
    },
  };
}

import { Providers } from './providers';
import { FloatingCTA } from '@/components/public/FloatingCTA';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${ibmPlexArabic.variable} antialiased`} suppressHydrationWarning>
        <Providers>
          {children}

          {/* Floating CTA is global, internal logic hides it on specific pages */}
          <FloatingCTA />

          <Script src="https://d3js.org/d3.v7.min.js" strategy="beforeInteractive" />
          <Script src="https://cdn.jsdelivr.net/npm/jsvectormap" strategy="beforeInteractive" />
          <Script src="https://cdn.jsdelivr.net/npm/jsvectormap/dist/maps/world.js" strategy="beforeInteractive" />
          <Script src="/custom_script.js" strategy="afterInteractive" />
        </Providers>
      </body>
    </html>
  );
}
