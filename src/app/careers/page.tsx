import type { Metadata } from 'next';
import CareersClient from './CareersClient';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join EBER Group - explore open positions and be part of a company that drives innovation, sustainability, and growth in the petrochemical industry.',
  openGraph: {
    title: 'Careers - EBER Group',
    description:
      'Join EBER Group - explore open positions and be part of a company that drives innovation, sustainability, and growth in the petrochemical industry.',
    url: 'https://ebergroup.com/careers',
    siteName: 'EBER Group',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Careers at EBER Group',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers - EBER Group',
    description:
      'Join EBER Group - explore open positions and be part of a company that drives innovation, sustainability, and growth in the petrochemical industry.',
    images: ['/logo.png'],
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
