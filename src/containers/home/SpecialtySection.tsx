import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import { SpecialtyCard } from '../../components/Cards/SpecialtyCard';
import { SPECIALTY_DATA } from './constants';

export const SpecialtySection = () => (
  <Box
    id="home-second-section"
    className="flex flex-col items-center justify-center animate-on-scroll"
  >
    <Box className="flex flex-col animate-fade-in justify-center items-center">
      <DualColorText
        text1={'Leader in\u00a0'}
        text2="High-Performance"
        text1Variant="h4"
        text2Variant="h4"
        fontWeight={700}
        inline
      />
      <Typography variant="h4" fontWeight={700} className="text-[#030712]">
        Specialty Materials
      </Typography>
    </Box>
    <Typography
      variant="body1"
      flexWrap={'wrap'}
      className=" text-[#4B5563] animate-fade-in"
      textAlign={'center'}
      fontSize={'18px'}
      style={{ width: '70%', marginTop: '20px' }}
    >
      Established in 2021, Eber Group oversees four top-performing chemical
      manufacturing companies operating across Indonesia, bringing together
      decades of expertise and innovation in the petrochemical industry.
    </Typography>
    <Box id="specialty-list" className="flex flex-row gap-3 mt-10">
      {SPECIALTY_DATA.map((data, index) => (
        <SpecialtyCard key={index} data={data} index={index} />
      ))}
    </Box>
  </Box>
);
