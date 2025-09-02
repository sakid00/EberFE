import { Box, Button, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import Image from 'next/image';
import fieldPerson from '@public/photo/field_person2.png';
import {
  customProductSectionStyles,
  animationClasses,
  utilityClasses,
} from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType, useTranslation } from '@/hooks';

export const CustomProductSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();

  return (
    <Box id="home-third-section" sx={customProductSectionStyles.container}>
      <Box
        sx={customProductSectionStyles.imageContainer}
        className={animationClasses.slideLeft}
      >
        <Image src={fieldPerson} alt="field-person" width={600} height={600} />
      </Box>
      <Box
        className={`${utilityClasses.clipCustomShape}`}
        sx={customProductSectionStyles.mainContainer}
      >
        <Box sx={customProductSectionStyles.spacer} />
        <Box
          sx={customProductSectionStyles.contentContainer}
          className={animationClasses.slideRight}
        >
          <DualColorText
            text1={t('home.custom_product_section_title.make_it')}
            text2={t('home.custom_product_section_title.customize')}
            fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
            color="white"
            fontWeight={700}
          />
          <Typography
            fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
            fontWeight={800}
            sx={customProductSectionStyles.title}
          >
            {t('home.custom_product_section_title.today')}
          </Typography>
          <Typography sx={customProductSectionStyles.description}>
            {t('home.custom_product_section_desc')}
          </Typography>

          <Button sx={customProductSectionStyles.button}>
            {t('home.custom_product_button')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
