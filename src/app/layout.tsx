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

export const metadata: Metadata = {
  title: 'Karim Abdelaziz — Film Director & Video Editor | Cairo',
  description:
    'Karim Abdelaziz — cinematic film director, video editor, and documentary storyteller based in Cairo. Crafting brand films, commercials, and content that resonates worldwide. Trusted by Samsung, CUPRA, Artlist, and more.',
  keywords:
    'Karim Abdelaziz, video editor, film director, cinematographer, Cairo, documentary, brand content, video production, Egypt, cinematic editing',
  authors: [{ name: 'Karim Abdelaziz' }],
  metadataBase: new URL('https://karimabdelaziz.com'),
  openGraph: {
    type: 'website',
    siteName: 'Karim Abdelaziz',
    title: 'Karim Abdelaziz — Film Director & Video Editor',
    description:
      'Cinematic editing, documentary storytelling, and brand content that resonates. 8 years, 1,300+ projects, 14 countries. Based in Cairo, working worldwide.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karim Abdelaziz — Film Director & Video Editor',
    description:
      'Cinematic editing, documentary storytelling, and brand content that resonates. Based in Cairo, working worldwide.',
  },
  other: {
    'theme-color': '#04060a',
  },
};

import { Providers } from './providers';

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
          
          <Script src="https://d3js.org/d3.v7.min.js" strategy="beforeInteractive" />
          <Script src="https://cdn.jsdelivr.net/npm/jsvectormap" strategy="beforeInteractive" />
          <Script src="https://cdn.jsdelivr.net/npm/jsvectormap/dist/maps/world.js" strategy="beforeInteractive" />
          <Script src="/custom_script.js" strategy="afterInteractive" />
        </Providers>
      </body>
    </html>
  );
}
