import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import { SpecialtyCard } from '../../components/Cards/SpecialtyCard';
import { SPECIALTY_DATA } from './constants';
import { specialtySectionStyles, animationClasses } from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType, useTranslation } from '@/hooks';

export const SpecialtySection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();

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
          text1={`${t('home.specialty_section_title.leader_in')}\u00a0`}
          text2={t('home.specialty_section_title.high_performance')}
          fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
          fontWeight={800}
          inline
        />
        <Typography
          fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
          fontWeight={800}
          sx={specialtySectionStyles.title}
          className={animationClasses.fadeIn}
        >
          {t('home.specialty_section_title.specialty_materials')}
        </Typography>
      </Box>
      <Typography
        sx={specialtySectionStyles.description(type)}
        className={animationClasses.fadeIn}
      >
        {t('home.specialty_section_desc')}
      </Typography>
      <Box
        id="specialty-list"
        sx={
          type === 'mobile'
            ? specialtySectionStyles.cardsContainerMobile
            : specialtySectionStyles.cardsContainer
        }
      >
        {SPECIALTY_DATA.map((data, index) => (
          <SpecialtyCard key={index} data={data} index={index} />
        ))}
      </Box>
    </Box>
  );
};
