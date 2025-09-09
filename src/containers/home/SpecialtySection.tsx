import { Box, Button, Typography } from '@mui/material';
import DualColorText from '../../components/DualColorText';
import { SpecialtyCard } from '../../components/Cards/SpecialtyCard';
import { SPECIALTY_DATA } from './constants';
import {
  specialtySectionStyles,
  animationClasses,
  headerSectionStyles,
} from './styles';
import { dynamicStylingValue } from '../../hooks/useDeviceType';
import { useDeviceType, useTranslation } from '../../hooks';
import { useRouter } from 'next/navigation';

export const SpecialtySection = () => {
  const { type } = useDeviceType();
  const { t, language } = useTranslation();
  const router = useRouter();
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <Box
      id="home-second-section"
      sx={specialtySectionStyles.container}
      className={animationClasses.onScroll}
    >
      {type === 'mobile' && (
        <Box id="buttons-wrapper" sx={headerSectionStyles.buttonsWrapper(type)}>
          <Typography sx={headerSectionStyles.description(language, type)}>
            {t('home.desc')}
          </Typography>
          <Button
            size="small"
            sx={headerSectionStyles.primaryButton}
            onClick={() => handleNavigate('/product')}
          >
            {t('home.product_button')}
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={headerSectionStyles.secondaryButton(type)}
            onClick={() => handleNavigate('/product/submit')}
          >
            {t('home.custom_product_button')}
          </Button>
        </Box>
      )}
      <Box
        sx={specialtySectionStyles.titleContainer}
        className={animationClasses.fadeIn}
      >
        <DualColorText
          text1={`${t('home.specialty_section_title.leader_in')}\u00a0`}
          text2={t('home.specialty_section_title.high_performance')}
          fontSize={dynamicStylingValue(type, '1.1em', '2em', '2em')}
          fontWeight={800}
          inline
        />
        <Typography
          fontSize={dynamicStylingValue(type, '1.1em', '2em', '2em')}
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
