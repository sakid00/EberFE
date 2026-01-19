import type { Metadata } from 'next';
import CustomProductClient from './CustomProductClient';

export const metadata: Metadata = {
  title: 'Custom Product',
  description:
    'Request a custom product from EBER Group - get product specifications, best offers, and recommendations tailored to your needs.',
  openGraph: {
    title: 'Custom Product - EBER Group',
    description:
      'Request a custom product from EBER Group - get product specifications, best offers, and recommendations tailored to your needs.',
    url: 'https://ebergroup.com/product/submit',
    siteName: 'EBER Group',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'EBER Group Custom Product Request',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Product - EBER Group',
    description:
      'Request a custom product from EBER Group - get product specifications, best offers, and recommendations tailored to your needs.',
    images: ['/logo.png'],
  },
};

export default function CustomProductPage() {
  return <CustomProductClient />;
}
