import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/dualColorText';
import { CertificationCard } from '../../components/Cards/CertificationCard';
import { CERTIFICATION_DATA } from './constants';

export const CertificationSection = () => (
  <Box
    id="home-second-section"
    className="flex flex-col items-center justify-center animate-on-scroll"
  >
    <Box className="flex flex-col animate-fade-in justify-center">
      <DualColorText
        text1={'Our\u00a0'}
        text2="Certifications"
        text1Variant="h4"
        text2Variant="h4"
        fontWeight={700}
        inline
      />
    </Box>
    <Typography
      variant="body1"
      flexWrap={'wrap'}
      className=" text-[#4B5563] animate-fade-in"
      textAlign={'center'}
      fontSize={'18px'}
      style={{ width: '70%', marginTop: '20px' }}
    >
      Eber Group oversees four top-performing chemical manufacturing companies
      operating across Indonesia
    </Typography>
    <Box id="specialty-list" className="flex flex-row gap-3 mt-10">
      {CERTIFICATION_DATA.map((data, index) => (
        <CertificationCard key={index} data={data} index={index} />
      ))}
    </Box>
  </Box>
);
