import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import { CorporateCard } from '../../components/Cards/CorporateCard';
import { CORPORATE_DATA } from './constants';
import { corporateStyles } from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType } from '@/hooks';

export const CorporateSection = () => {
  const { type } = useDeviceType();
  return (
    <Box
      id="home-fourth-section"
      className="flex flex-col justify-center items-center mt-40 animate-on-scroll"
    >
      <div className="animate-fade-in">
        <DualColorText
          text1={'Corporate\u00a0'}
          text2="Governance"
          fontSize={dynamicStylingValue(type, '1.5em', '3em', '3em')}
          fontWeight={700}
          inline
        />
      </div>
      <Typography
        variant="body1"
        flexWrap={'wrap'}
        className=" text-[#4B5563] animate-fade-in"
        textAlign={'center'}
        fontSize={dynamicStylingValue(type, '0.8em', '1.2em', '1.2em')}
        style={corporateStyles.description(type)}
      >
        At Eber Group, we are committed to maintaining the highest standards of
        corporate governance, ensuring transparency, accountability, and ethical
        business practices across all our operations.
      </Typography>
      {type === 'mobile' ? (
        <Box className="flex flex-col gap-2 mt-5">
          {CORPORATE_DATA.map((data, index) => (
            <CorporateCard key={index} data={data} index={index} isMobile />
          ))}
        </Box>
      ) : (
        <Box
          className="flex flex-row gap-3"
          sx={corporateStyles.cardsContainer}
        >
          {CORPORATE_DATA.map((data, index) => (
            <CorporateCard
              key={index}
              data={data}
              index={index}
              isMobile={false}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
