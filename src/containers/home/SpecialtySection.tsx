import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import { SpecialtyCard } from '../../components/Cards/SpecialtyCard';
import { SPECIALTY_DATA } from './constants';
import { specialtySectionStyles, animationClasses } from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType } from '@/hooks';

export const SpecialtySection = () => {
  const { type } = useDeviceType();
  return (
    <Box
      id="home-second-section"
      sx={specialtySectionStyles.container}
      className={animationClasses.onScroll}
    >
      <Box
        sx={specialtySectionStyles.titleContainer}
        className={animationClasses.fadeIn}
      >
        <DualColorText
          text1={'Leader in\u00a0'}
          text2="High-Performance"
          fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
          fontWeight={700}
          inline
        />
        <Typography
          fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
          fontWeight={800}
          sx={specialtySectionStyles.title}
        >
          Specialty Materials
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={specialtySectionStyles.description}
        className={animationClasses.fadeIn}
      >
        Established in 2021, Eber Group oversees four top-performing chemical
        manufacturing companies operating across Indonesia, bringing together
        decades of expertise and innovation in the petrochemical industry.
      </Typography>
      <Box id="specialty-list" sx={specialtySectionStyles.cardsContainer}>
        {SPECIALTY_DATA.map((data, index) => (
          <SpecialtyCard key={index} data={data} index={index} />
        ))}
      </Box>
    </Box>
  );
};
