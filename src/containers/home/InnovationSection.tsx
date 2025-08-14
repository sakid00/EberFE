import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/dualColorText';
import Image from 'next/image';
import tangki from '@public/photo/tangki.png';
import { InnovationCard } from './components/InnovationCard';
import { INNOVATION_DATA } from './constants';

export const InnovationSection = () => (
  <Box id="home-fifth-section" className="relative mt-40">
    <Box className="absolute w-[70vw]" style={{ top: '-23%', left: '35%' }}>
      <Image src={tangki} alt="tangki-image" />
      <Box className="tangki-gradient-overlay" />
    </Box>
    <Box id="content-wrapper" className="flex flex-row">
      <Box id="content-left-side" className="mt-20  w-[25%]">
        <DualColorText
          text1={'Driving\u00a0'}
          text2="Innovation"
          text1Variant="h4"
          text2Variant="h4"
          fontWeight={700}
          color="#030712"
          inline
        />
        <Typography
          variant="h4"
          fontWeight={700}
          color="#030712"
          sx={{ width: '23vw' }}
        >
          Through Technology
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={400}
          color="#4B5563"
          textAlign={'left'}
          fontSize={'16px'}
          sx={{ marginTop: 2 }}
        >
          {`At Eber Group, we&apos;re committed to pushing the boundaries of what&apos;s
          possible in the petrochemical industry. Our state-of-the-art
          research facilities and dedicated team of scientists and engineers
          work tirelessly to develop innovative solutions that address the
          evolving needs of our customers and the global market.`}
        </Typography>
      </Box>
      <Box sx={{ width: '80%' }} />
    </Box>
    <Box id="innovation-list" className="flex flex-row gap-3 mt-10">
      {INNOVATION_DATA.map((data, index) => (
        <InnovationCard key={index} data={data} index={index} />
      ))}
    </Box>
  </Box>
);
