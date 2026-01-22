import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/dualColorText/index';
import { SubsidiaryCard } from '@/components/Cards/SubsidiaryCard';
import { SUBSIDIARIES_DATA } from './constants';
import { subsidiariesSectionStyles } from './styles/subsidiariesSection.styles';
import { animationClasses } from './styles/common';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType, useTranslation } from '@/hooks';

export const SubsidiariesSection = () => {
  const { type } = useDeviceType();
  const { t, language } = useTranslation();

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
          text={language === 'en' ? `${t('home.subsidiaries_section_title.eber_group')}\u00a0{${t('home.subsidiaries_section_title.subsidiaries')}}` : `{${t('home.subsidiaries_section_title.eber_group')}} ${t('home.subsidiaries_section_title.company')}\u00a0{${t('home.subsidiaries_section_title.subsidiaries')}}`}
          fontSize={dynamicStylingValue(type, '1.5em', '2em', '2.5em')}
          fontWeight={800}
          inline
          wrap
          sx={{
            textAlign: 'center'
          }}
        />
      </Box>
      <Typography
        fontSize={dynamicStylingValue(type, '0.75rem', '1.5rem', '1.5rem')}
        fontWeight={500}
        sx={subsidiariesSectionStyles.description(type)}
        className={animationClasses.fadeIn}
      >
        {t('home.subsidiaries_section_desc')}
      </Typography>
      <Box
        sx={
          type === 'mobile'
            ? subsidiariesSectionStyles.cardsContainerMobile
            : subsidiariesSectionStyles.cardsContainer
        }
      >
        {SUBSIDIARIES_DATA.map((data, index) => (
          <SubsidiaryCard key={index} data={data} index={index} />
        ))}
      </Box>
    </Box>
  );
};
