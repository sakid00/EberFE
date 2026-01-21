import type { Metadata } from 'next';
import './globals.css';
import '../styles/loading-screen.css';
import '../styles/background-fallbacks.css';
import Header from '@/components/header/index';
import Footer from '@/components/footer/index';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Box } from '@mui/material';
import ParticlesBackground from '@/components/BackgroundParticles/index';
import ThemeWrapper from '@/components/ThemeWrapper';
import { TranslationProvider } from '@/contexts/TranslationContext';
import { DataProvider } from '@/contexts/DataProvider';
import { NavigationProvider } from '@/contexts/NavigationContext';
import LoadingWrapper from '@/components/LoadingWrapper';
import { PrefetchWrapper } from '@/components/PrefetchWrapper';

// Base URL for metadata - required for proper Open Graph image URLs
export const metadataBase = new URL('https://ebergroup.com');

export const metadata: Metadata = {
  metadataBase: new URL('https://ebergroup.com'),
  title: {
    default: 'EBER Group',
    template: '%s | EBER Group',
  },
  description:
    'EBER Group - Excellence in Every Detail. Leading provider of innovative solutions and high-performance chemical manufacturing in Indonesia.',
  keywords: [
    'EBER Group',
    'EBER',
    'chemical manufacturing',
    'petrochemical',
    'Indonesia',
    'specialty chemicals',
    'resins',
    'plasticizers',
    'corporate',
    'business solutions',
    'innovation',
  ],
  authors: [{ name: 'EBER Group' }],
  creator: 'EBER Group',
  publisher: 'EBER Group',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'EBER Group',
    description:
      'EBER Group - Excellence in Every Detail. Leading provider of innovative solutions and high-performance chemical manufacturing in Indonesia.',
    url: 'https://ebergroup.com',
    siteName: 'EBER Group',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'EBER Group - Excellence in Every Detail',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EBER Group',
    description:
      'EBER Group - Excellence in Every Detail. Leading provider of innovative solutions and high-performance chemical manufacturing in Indonesia.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'EBER Group - Excellence in Every Detail',
      },
    ],
    creator: '@ebergroup',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="emotion-insertion-point" content="" />

        {/* Resource hints for better loading performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Preload critical assets - Optimized WebP backgrounds (98% smaller) */}
        <link
          rel="preload"
          as="image"
          href="/photo/optimized/field_person2_optimized.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/background/optimized/homepage_header_bg_optimized.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/background/optimized/container1_optimized.webp"
          media="(min-width: 769px)"
        />
        <link
          rel="preload"
          as="image"
          href="/background/optimized/container1_mobile_optimized.webp"
          media="(max-width: 768px)"
        />
      </head>
      <body
        className={`${font.className} ${font.variable} overscroll-none`}
        suppressHydrationWarning
      >
        {/* Immediate loading screen - disabled for instant loading */}
        <div id="initial-loading" style={{ display: 'none' }}>
          <div style={{ textAlign: 'center' }}>
            {/* Simple Logo */}
            <h1 className="initial-logo">EBER</h1>
            <p className="initial-tagline">Excellence in Every Detail</p>

            {/* Simple Progress Bar */}
            <div className="initial-progress-bar">
              <div className="initial-progress-fill"></div>
            </div>

            <p className="initial-text">
              Loading images...{' '}
              <span className="initial-progress-percentage">0%</span>
            </p>
            <p className="initial-subtext">
              Optimized images loading instantly
            </p>
          </div>
        </div>
        <ThemeWrapper>
          <NavigationProvider>
            <TranslationProvider>
              <DataProvider>
                <LoadingWrapper>
                  <PrefetchWrapper>
                    <div className="mobile-container max-w-full h-full relative overflow-hidden">
                      <Header />
                      <Box
                        className={`px-[5vw] md:px-[10vw] mb-[30vh] h-full w-full`}
                      >
                        <ParticlesBackground />
                        {children}
                      </Box>
                      <Footer />
                    </div>
                  </PrefetchWrapper>
                </LoadingWrapper>
              </DataProvider>
            </TranslationProvider>
          </NavigationProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
