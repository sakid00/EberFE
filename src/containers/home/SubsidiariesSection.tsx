import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import { SubsidiaryCard } from '../../components/Cards/SubsidiaryCard';
import { SUBSIDIARIES_DATA } from './constants';

export const SubsidiariesSection = () => (
  <Box
    id="home-fourth-section"
    className="flex flex-col justify-center items-center mt-40 animate-on-scroll"
  >
    <div className="animate-fade-in">
      <DualColorText
        text1={'Our Key\u00a0'}
        text2="Subsidiaries"
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
      style={{ width: '70%', marginTop: '20px' }}
    >
      Eber Group oversees four top-performing chemical manufacturing companies
      operating across Indonesia
    </Typography>
    <Box className="flex flex-row gap-3 mt-10">
      {SUBSIDIARIES_DATA.map((data, index) => (
        <SubsidiaryCard key={index} data={data} index={index} />
      ))}
    </Box>
  </Box>
);
