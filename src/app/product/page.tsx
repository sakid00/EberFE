import type { Metadata } from 'next';
import ProductClient from './ProductClient';

export const metadata: Metadata = {
  title: 'Products - EBER Group',
  description:
    'Explore EBER Group high-performance specialty materials and chemical products including resins, plasticizers, phthalic anhydride, and solvents.',
  openGraph: {
    title: 'Products - EBER Group',
    description:
      'Explore EBER Group high-performance specialty materials and chemical products including resins, plasticizers, phthalic anhydride, and solvents.',
    url: 'https://ebergroup.com/product',
  },
};

export default function ProductsPage() {
  return <ProductClient />;
}
