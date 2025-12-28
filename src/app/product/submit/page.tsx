import type { Metadata } from 'next';
import CustomProductClient from './CustomProductClient';

export const metadata: Metadata = {
  title: 'Custom Product - EBER Group',
  description:
    'Request a custom product from EBER Group - get product specifications, best offers, and recommendations tailored to your needs.',
  openGraph: {
    title: 'Custom Product - EBER Group',
    description:
      'Request a custom product from EBER Group - get product specifications, best offers, and recommendations tailored to your needs.',
    url: 'https://ebergroup.com/product/submit',
  },
};

export default function CustomProductPage() {
  return <CustomProductClient />;
}
