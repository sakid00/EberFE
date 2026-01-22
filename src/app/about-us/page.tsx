import type { Metadata } from 'next';
import AboutUsClient from './AboutUsClient';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about EBER Petrochemical - a holding company of four leading high-performance chemical manufacturing companies in Indonesia since 2021.',
  openGraph: {
    title: 'About Us - EBER Petrochemical',
    description:
      'Learn about EBER Petrochemical - a holding company of four leading high-performance chemical manufacturing companies in Indonesia since 2021.',
    url: 'https://ebergroup.com/about-us',
    siteName: 'EBER Petrochemical',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'About EBER Petrochemical - Excellence in Every Detail',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - EBER Petrochemical',
    description:
      'Learn about EBER Petrochemical - a holding company of four leading high-performance chemical manufacturing companies in Indonesia since 2021.',
    images: ['/logo.png'],
  },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
