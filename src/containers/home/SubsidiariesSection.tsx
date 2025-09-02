import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import { SubsidiaryCard } from '../../components/Cards/SubsidiaryCard';
import { SUBSIDIARIES_DATA } from './constants';
import { subsidiariesSectionStyles, animationClasses } from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType, useTranslation } from '@/hooks';

export const SubsidiariesSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();

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
          text1={`${t('home.subsidiaries_section_title.eber_group')}\u00a0`}
          text2={t('home.subsidiaries_section_title.subsidiaries')}
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
        {t('home.subsidiaries_section_desc')}
      </Typography>
      <Box sx={subsidiariesSectionStyles.cardsContainer}>
        {SUBSIDIARIES_DATA.map((data, index) => (
          <SubsidiaryCard key={index} data={data} index={index} />
        ))}
      </Box>
    </Box>
  );
};
