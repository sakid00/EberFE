import { Box, Button, Typography } from '@mui/material';
import DualColorText from '@/components/dualColorText';
import Image from 'next/image';
import bgHeader from '@public/background/homepage_header_bg.png';

export default function Home() {
  return (
    <>
      <Image
        src={bgHeader}
        alt=""
        style={{
          position: 'absolute',
          width: '100vw',
          height: '65vh',
          right: '10vw',
          left: 0,
          top: 0,
          zIndex: -1,
        }}
      />
      <Box
        id="home-header"
        className="flex-1 items-center justify-center h-[65vh] z-1"
      >
        <Box id="home-header-left-side">
          <h2 className="text-6xl font-bold">Innovating</h2>
          <DualColorText
            text1={'as\u00a0'}
            text2="Sustainable"
            text1Variant="h2"
            text2Variant="h2"
            inline
            color="white"
          />
          <h2 className="text-6xl font-bold">Future</h2>
          <Typography className="w-1/4" style={{ marginTop: '20px' }}>
            Established in 2021, Eber Group oversees four top-performing
            chemical manufacturing companies operating across Indonesia.
          </Typography>
          <Box id="buttons-wrapper" className="flex flex-row gap-4 mt-8">
            <Button
              size="small"
              sx={{
                color: 'white',
                background:
                  'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
                padding: 2,
                borderRadius: 10,
                fontWeight: 600,
              }}
            >
              Explore Our Product
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{
                color: 'white',
                background: 'transparent',
                padding: 2,
                borderRadius: 10,
                fontWeight: 600,
                borderColor: '#786C95',
                borderWidth: 1,
              }}
            >
              Custom Product
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        id="home-second-section"
        className="flex flex-col items-center justify-center"
      >
        <DualColorText
          text1={'Leader in\u00a0'}
          text2="High-Performance"
          text1Variant="h4"
          text2Variant="h4"
          fontWeight={700}
          inline
        />
        <Typography variant="h4" fontWeight={700} className=" text-black">
          Specialty Materials
        </Typography>
        <Typography
          variant="body1"
          flexWrap={'wrap'}
          className=" text-[#4B5563]"
          textAlign={'center'}
          fontSize={'18px'}
          style={{ width: '70%', marginTop: '20px' }}
        >
          Established in 2021, Eber Group oversees four top-performing chemical
          manufacturing companies operating across Indonesia, bringing together
          decades of expertise and innovation in the petrochemical industry.
        </Typography>
      </Box>
    </>
  );
}
