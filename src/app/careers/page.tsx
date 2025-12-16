import type { Metadata } from 'next';
import CareersClient from './CareersClient';

export const metadata: Metadata = {
  title: 'Careers - EBER Group',
  description:
    'Join EBER Group - explore open positions and be part of a company that drives innovation, sustainability, and growth in the petrochemical industry.',
  openGraph: {
    title: 'Careers - EBER Group',
    description:
      'Join EBER Group - explore open positions and be part of a company that drives innovation, sustainability, and growth in the petrochemical industry.',
    url: 'https://ebergroup.com/careers',
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
