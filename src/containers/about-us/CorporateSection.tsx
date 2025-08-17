import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/dualColorText';
import { CorporateCard } from './components/CorporateCard';
import { CORPORATE_DATA } from './constants';

export const CorporateSection = () => (
  <Box
    id="home-fourth-section"
    className="flex flex-col justify-center items-center mt-40 animate-on-scroll"
  >
    <div className="animate-fade-in">
      <DualColorText
        text1={'Corporate\u00a0'}
        text2="Governance"
        text1Variant="h4"
        text2Variant="h4"
        fontWeight={700}
        inline
      />
    </div>
    <Typography
      variant="body1"
      flexWrap={'wrap'}
      className=" text-[#4B5563] animate-fade-in"
      textAlign={'center'}
      fontSize={'18px'}
      style={{ width: '80%', marginTop: '20px' }}
    >
      At Eber Group, we are committed to maintaining the highest standards of
      corporate governance, ensuring transparency, accountability, and ethical
      business practices across all our operations.
    </Typography>
    <Box className="flex flex-row gap-3 mt-10">
      {CORPORATE_DATA.map((data, index) => (
        <CorporateCard key={index} data={data} index={index} />
      ))}
    </Box>
  </Box>
);
