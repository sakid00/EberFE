import { Suspense } from 'react';
import CorporateContainer from '../../containers/corporate/Corporate';
import { CorporateSkeleton } from '@/components/Skeleton';
import { Box } from '@mui/material';

const CorporatePage = () => (
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

export default CorporatePage;
