import { Box, Button, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import { headerSectionStyles } from './styles';
import { useDeviceType, useTranslation } from '@/hooks';
import { dynamicStylingValue } from '@/hooks/useDeviceType';

export const HeaderSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();

  return (
    <>
      <Box id="home-header" sx={headerSectionStyles.container}>
        <Box id="home-header-left-side" sx={headerSectionStyles.leftSide}>
          <Typography
            fontSize={dynamicStylingValue(type, '2em', '4em', '4em')}
            fontWeight={800}
            sx={headerSectionStyles.title}
          >
            {t('home.title.innovating')}
          </Typography>
          <DualColorText
            text1={`${t('home.title.as')}\u00a0`}
            text2={t('home.title.sustainable')}
            fontSize={dynamicStylingValue(type, '2em', '4em', '4em')}
            fontWeight={800}
            inline
            color="white"
            sx={headerSectionStyles.title}
          />
          <Typography
            fontSize={dynamicStylingValue(type, '2em', '4em', '4em')}
            fontWeight={800}
            sx={headerSectionStyles.title}
          >
            {t('home.title.future')}
          </Typography>
          <Typography sx={headerSectionStyles.description}>
            {t('home.desc')}
          </Typography>
          <Box id="buttons-wrapper" sx={headerSectionStyles.buttonsWrapper}>
            <Button size="small" sx={headerSectionStyles.primaryButton}>
              {t('home.product_button')}
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={headerSectionStyles.secondaryButton}
            >
              {t('home.custom_product_button')}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
