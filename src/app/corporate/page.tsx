import type { Metadata } from 'next';
import { Suspense } from 'react';
import CorporateContainer from '../../containers/corporate/Corporate';
import { CorporateSkeleton } from '@/components/Skeleton';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: 'Corporate - EBER Group',
  description:
    'EBER Group corporate information - learn about our organizational structure, leadership, and business operations across Indonesia.',
  openGraph: {
    title: 'Corporate - EBER Group',
    description:
      'EBER Group corporate information - learn about our organizational structure, leadership, and business operations across Indonesia.',
    url: 'https://ebergroup.com/corporate',
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
