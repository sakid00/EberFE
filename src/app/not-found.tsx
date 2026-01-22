import type { Metadata } from 'next';
import NotFound from '../containers/not-found';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
  openGraph: {
    title: 'Page Not Found - EBER Petrochemical',
    description: 'The page you are looking for could not be found.',
    url: 'https://ebergroup.com',
    siteName: 'EBER Petrochemical',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'EBER Petrochemical',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFoundPage() {
  return <NotFound />;
}
