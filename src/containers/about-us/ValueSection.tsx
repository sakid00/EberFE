import { Box, Typography } from '@mui/material';
import { ValueCard } from '../../components/Cards/ValueCard';
import { VALUES_DATA } from './constants';
import Image from 'next/image';
import fieldPerson from '@public/photo/chem_person.png';
import siteBg from '@public/background/site-bg.png';

export const ValueSection = () => (
  <Box id="about-us-fifth-section" className="relative mt-40">
    <Box
      className="absolute w-screen"
      sx={{
        left: '50%',
        transform: 'translateX(-50%)',
        height: '113%', // Increased height to 150% of viewport height
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to bottom, #ffffff, transparent)',
          zIndex: 2,
        },
      }}
    >
      <Image
        src={siteBg}
        alt="background"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        className="!fixed"
      />
    </Box>
    <Box
      id="about-us-fifth-section-title"
      className="flex flex-col items-center"
      sx={{ position: 'relative', zIndex: 3 }}
    >
      <Typography fontSize={'40px'} fontWeight={'500'} color="#784791">
        Creating Meaningful Impact Through
      </Typography>
      <Typography fontSize={'40px'} fontWeight={'800'} color="#784791">
        Purpose-Driven Values & a People-First Culture
      </Typography>
    </Box>
    <Box
      className="clip-custom-shape-2 absolute inset-0 text-white flex animate-on-scroll"
      sx={{
        background:
          'linear-gradient(-145deg,rgba(19, 64, 91, 1) 21%, rgba(120, 71, 145, 1) 70%, rgba(221, 156, 54, 1) 100%)',
        minHeight: '400px',
        maxHeight: '600px',
        width: '100%',
        overflow: 'hidden',
        zIndex: 0,
        top: '17%',
      }}
    />
    <Box
      className="w-full animate-slide-right"
      sx={{ position: 'absolute', bottom: 0, left: -20, zIndex: 1 }}
    >
      <Image src={fieldPerson} alt="field-person" width={550} height={400} />
    </Box>
    <Box
      className="relative text-white flex animate-on-scroll"
      sx={{
        minHeight: '600px',
        width: '100%',
        paddingTop: '15%',
        paddingLeft: '10%',
        paddingRight: '5%',
        paddingBottom: '5%',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Box
        className="grid grid-rows-2 grid-cols-5 gap-6"
        sx={{
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        {VALUES_DATA.map((data, index) => (
          <ValueCard key={index} data={data} index={index} />
        ))}
      </Box>
    </Box>
  </Box>
);
