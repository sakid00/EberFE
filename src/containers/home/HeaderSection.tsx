import { Box, Button, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import { headerSectionStyles } from './styles';
import { useDeviceType, useTranslation } from '@/hooks';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import photo from '@public/photo/subtract.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const HeaderSection = () => {
  const { type } = useDeviceType();
  const { t, language } = useTranslation();
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  if (type === 'mobile') {
    return (
      <Box>
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '15%',
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Typography
            fontSize={'2.5em'}
            fontWeight={800}
            sx={headerSectionStyles.title}
          >
            {t('home.title.innovating')}
          </Typography>
          <DualColorText
            text1={`${t('home.title.as')}\u00a0`}
            text2={t('home.title.sustainable')}
            fontSize={'2.5em'}
            fontWeight={800}
            inline
            color="white"
            sx={headerSectionStyles.title}
          />
          <Typography
            fontSize={'2.5em'}
            fontWeight={800}
            sx={headerSectionStyles.title}
          >
            {t('home.title.future')}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box id="home-header" sx={headerSectionStyles.container}>
      <Box
        sx={{
          position: 'absolute',
          width: '50%',
          top: '21%',
          left: '37%',
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Image
          src={photo}
          alt="header photo"
          style={{ objectFit: 'contain' }}
        />
      </Box>
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
        <Typography sx={headerSectionStyles.description(language)}>
          {t('home.desc')}
        </Typography>
        <Box id="buttons-wrapper" sx={headerSectionStyles.buttonsWrapper}>
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
            sx={headerSectionStyles.secondaryButton}
            onClick={() => handleNavigate('/product/submit')}
          >
            {t('home.custom_product_button')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
