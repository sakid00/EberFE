import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import { SubsidiaryCard } from '../../components/Cards/SubsidiaryCard';
import { SUBSIDIARIES_DATA } from './constants';
import { subsidiariesSectionStyles, animationClasses } from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType } from '@/hooks';

export const SubsidiariesSection = () => {
  const { type } = useDeviceType();
  return (
    <Box
      id="home-fourth-section"
      sx={subsidiariesSectionStyles.container}
      className={animationClasses.onScroll}
    >
      <Box
        sx={subsidiariesSectionStyles.titleContainer}
        className={animationClasses.fadeIn}
      >
        <DualColorText
          text1={'Our Key\u00a0'}
          text2="Subsidiaries"
          fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
          fontWeight={700}
          inline
        />
      </Box>
      <Typography
        fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
        fontWeight={500}
        sx={subsidiariesSectionStyles.description}
        className={animationClasses.fadeIn}
      >
        Eber Group oversees four top-performing chemical manufacturing companies
        operating across Indonesia
      </Typography>
      <Box sx={subsidiariesSectionStyles.cardsContainer}>
        {SUBSIDIARIES_DATA.map((data, index) => (
          <SubsidiaryCard key={index} data={data} index={index} />
        ))}
      </Box>
    </Box>
  );
};
