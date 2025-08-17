import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/dualColorText';
import Image from 'next/image';
import bgHeader from '@public/background/homepage_header_bg.png';

export const HeaderSection = () => (
  <>
    <Image
      src={bgHeader}
      alt=""
      style={{
        position: 'absolute',
        width: '100vw',
        height: '80vh',
        right: '10vw',
        left: 0,
        top: 0,
        zIndex: -1,
      }}
    />
    <Box id="home-header" className="items-center justify-center h-[70vh]">
      <DualColorText
        text1={'Our\u00a0'}
        text2="Company"
        text1Variant="h2"
        text2Variant="h2"
        inline
        color="white"
      />
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{
          background:
            'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Background
      </Typography>
      <Typography className="w-1/4" style={{ marginTop: '20px' }}>
        Eber Group was incorporated in 2021 as a holding company of four leading
        high-performance chemical manufacturing companies in Indonesia.
      </Typography>
    </Box>
  </>
);
