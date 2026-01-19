import type { Metadata } from 'next';
import ProductClient from './ProductClient';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Explore EBER Group high-performance specialty materials and chemical products including resins, plasticizers, phthalic anhydride, and solvents.',
  openGraph: {
    title: 'Products - EBER Group',
    description:
      'Explore EBER Group high-performance specialty materials and chemical products including resins, plasticizers, phthalic anhydride, and solvents.',
    url: 'https://ebergroup.com/product',
    siteName: 'EBER Group',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'EBER Group Products - Specialty Chemicals',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products - EBER Group',
    description:
      'Explore EBER Group high-performance specialty materials and chemical products including resins, plasticizers, phthalic anhydride, and solvents.',
    images: ['/logo.png'],
  },
};

export default function ProductsPage() {
  return <ProductClient />;
}
