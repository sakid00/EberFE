import { Box, Button, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText/index';
import { headerSectionStyles } from './styles';
import { useDeviceType, useTranslation } from '@/hooks';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import photo from '@/public/photo/subtract.png';
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
            top: '12vh',
            left: 0,
            right: 0,
            bottom: '50vh',
            zIndex: 0,
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'start',
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
        <Typography sx={headerSectionStyles.description(language, type)}>
          {t('home.desc')}
        </Typography>
        <Box id="buttons-wrapper" sx={headerSectionStyles.buttonsWrapper(type)}>
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
      </Box>
    </Box>
  );
};
