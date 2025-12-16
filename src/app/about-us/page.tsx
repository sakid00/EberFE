import type { Metadata } from 'next';
import AboutUsClient from './AboutUsClient';

export const metadata: Metadata = {
  title: 'About Us - EBER Group',
  description:
    'Learn about EBER Group - a holding company of four leading high-performance chemical manufacturing companies in Indonesia since 2021.',
  openGraph: {
    title: 'About Us - EBER Group',
    description:
      'Learn about EBER Group - a holding company of four leading high-performance chemical manufacturing companies in Indonesia since 2021.',
    url: 'https://ebergroup.com/about-us',
  },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
