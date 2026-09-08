import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f59e0b',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://starbattleonline.com'),
  title: 'Star Battle Online - Play Free Daily Logic Puzzle (Two Not Touch)',
  description:
    'Play Star Battle online for free! Solve daily 10x10 (2-star) and 8x8 (1-star) logic puzzles with unique verified solutions. Also known as Two Not Touch. No app or registration required.',
  keywords: [
    'star battle',
    'star battle online',
    'daily star battle',
    'two not touch',
    'two not touch puzzle',
    'star battle solver',
    'star battle rules',
    'queens game star battle',
    'logic puzzles',
  ],
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://starbattleonline.com',
  },
  openGraph: {
    title: 'Star Battle Online - Play Free Daily Logic Puzzle',
    description:
      'Daily 10x10 and 8x8 logic puzzles. Place stars such that no two touch! Clean, responsive mobile web game.',
    url: 'https://starbattleonline.com',
    siteName: 'Star Battle Online',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Star Battle Online - Play Free Daily Logic Puzzle',
    description:
      'Daily 10x10 and 8x8 logic puzzles. Place stars such that no two touch! Clean, responsive mobile web game.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-7319059902337479';
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-XPYD94N3TD';
  const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION || 'rO1KjfWc2PG_lBO5APLdAjNoEjkRFrCPz9Kf_39GYSw';

  return (
    <html lang="en" className="h-full">
      <head>
        {gscVerification && (
          <meta name="google-site-verification" content={gscVerification} />
        )}
        {adsense && (
          <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        )}
        {gaId && (
          <link rel="preconnect" href="https://www.googletagmanager.com" />
        )}
        {adsense && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense}`}
            crossOrigin="anonymous"
          />
        )}
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Star Battle Online',
              applicationCategory: 'GameApplication',
              operatingSystem: 'Any',
              url: 'https://starbattleonline.com',
              description:
                'Free daily Star Battle and Two Not Touch logic puzzles online with mathematically verified unique solutions.',
              genre: ['Puzzle', 'Logic Game'],
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fbfbfa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 antialiased selection:bg-amber-500 selection:text-white relative overflow-x-hidden">
        {/* Subtle background ambient aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10 dark:from-amber-500/15 dark:via-orange-500/5" />
        <Header />
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
