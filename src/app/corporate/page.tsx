import type { Metadata } from 'next';
import { Suspense } from 'react';
import CorporateContainer from '../../containers/corporate/Corporate';
import { CorporateSkeleton } from '@/components/Skeleton';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: 'Corporate',
  description:
    'EBER Petrochemical corporate information - learn about our organizational structure, leadership, and business operations across Indonesia.',
  openGraph: {
    title: 'Corporate - EBER Petrochemical',
    description:
      'EBER Petrochemical corporate information - learn about our organizational structure, leadership, and business operations across Indonesia.',
    url: 'https://ebergroup.com/corporate',
    siteName: 'EBER Petrochemical',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'EBER Petrochemical Corporate Information',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate - EBER Petrochemical',
    description:
      'EBER Petrochemical corporate information - learn about our organizational structure, leadership, and business operations across Indonesia.',
    images: ['/logo.png'],
  },
};

export default function CorporatePage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ padding: '2rem' }}>
          <CorporateSkeleton type="desktop" />
        </Box>
      }
    >
      <CorporateContainer />
    </Suspense>
  );
}
