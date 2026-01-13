import { Box, Button, Typography } from '@mui/material';
import DualColorText from '@/components/dualColorText/index';
import Image from 'next/image';
import { getPhoto } from '@/assets/photoAssets';
import { customProductSectionStyles, animationClasses } from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType, useTranslation } from '@/hooks';
import ProgressiveBackgroundImage from '@/components/ProgressiveBackgroundImage/index';
import { getBackgroundImage } from '@/assets/svgBackgrounds';
import { useRouter } from 'next/navigation';
import ImageBackground from '@/components/ImageBackground';
import { useMemo } from 'react';

export const CustomProductSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  const router = useRouter();
  const handleCustomProductClick = () => {
    router.push('/product/submit');
  };

  const content = useMemo(
    () => (
      <>
        <DualColorText
          text={`${t('home.custom_product_section_title.make_it')}{${t('home.custom_product_section_title.customize')}}`}
          fontSize={dynamicStylingValue(type, '1.4em', '2em', '2em')}
          color="white"
          fontWeight={800}
        />
        <Typography
          fontSize={dynamicStylingValue(type, '1.4em', '2em', '2em')}
          fontWeight={800}
          sx={customProductSectionStyles.title}
        >
          {t('home.custom_product_section_title.today')}
        </Typography>
        <Typography sx={customProductSectionStyles.description}>
          {t('home.custom_product_section_desc')}
        </Typography>
        <Button
          sx={customProductSectionStyles.button(type)}
          onClick={handleCustomProductClick}
        >
          {t('home.custom_product_button')}
        </Button>
      </>
    ),
    [type]
  );

  if (type === 'mobile') {
    return (
      <Box sx={customProductSectionStyles.mainContainerMobile}>
        <ImageBackground
          src={getBackgroundImage('container1Mobile')}
          alt="container background"
          objectFit={'fill'}
          priority={true}
          quality={75}
          className={animationClasses.slideRight}
          sx={customProductSectionStyles.imageBackgroundMobile}
          contentSx={customProductSectionStyles.contentSxMobile}
        >
          <Box sx={customProductSectionStyles.contentContainerMobile}>
            <Box
              sx={customProductSectionStyles.imageContainerMobile}
              data-critical
            >
              <Image
                src={getPhoto('fieldPerson2')}
                alt="field-person"
                width={100}
                height={100}
                loading="lazy"
                style={{
                  objectFit: 'fill',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
            <Box sx={customProductSectionStyles.innerContentContainerMobile}>
              {content}
            </Box>
          </Box>
        </ImageBackground>
      </Box>
    );
  }

  return (
    <Box id="home-third-section" sx={customProductSectionStyles.container}>
      <ProgressiveBackgroundImage
        src={getBackgroundImage('container1')}
        alt="container background"
        objectFit={'fill'}
        priority={true}
        quality={75}
        placeholderColor="#cbd5e0"
        className={animationClasses.slideRight}
        sx={{
          position: 'relative',
          width: '100vw',
          height: dynamicStylingValue(type, '100%', '70vh', '70vh'),
          marginTop: dynamicStylingValue(type, '40vh', '20vh', '20vh'),
          paddingBottom: dynamicStylingValue(type, '10%', '0', '0'),
        }}
        contentSx={{
          position: 'relative',
          marginTop: dynamicStylingValue(type, '18%', '0px', '0px'),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingX: dynamicStylingValue(type, '5%', '0px', '0px'),
          overflow: 'hidden',
        }}
      >
        <Box
          sx={customProductSectionStyles.imageContainerTransform(type)}
          data-critical
        >
          <Image
            src={getPhoto('fieldPerson2')}
            alt="field-person"
            width={1000}
            height={1000}
            style={{
              objectFit: 'contain', // Changed from 'fill' to 'contain' for better aspect ratio
              maxWidth: '100%',
              minWidth: '20%',
              height: 'auto', // Maintain aspect ratio
            }}
            sizes={'(max-width: 768px) 35vw, (max-width: 1200px) 44vw, 50vw'}
            loading="lazy"
          />
        </Box>

        <Box sx={customProductSectionStyles.spacer} />
        <Box
          sx={customProductSectionStyles.contentContainer(type)}
          className={animationClasses.slideRight}
        >
          <DualColorText
            text={`${t('home.custom_product_section_title.make_it')}{${t('home.custom_product_section_title.customize')}}`}
            fontSize={dynamicStylingValue(type, '1.4em', '2em', '2em')}
            color="white"
            fontWeight={800}
          />
          <Typography
            fontSize={dynamicStylingValue(type, '1.4em', '2em', '2em')}
            fontWeight={800}
            sx={customProductSectionStyles.title}
          >
            {t('home.custom_product_section_title.today')}
          </Typography>
          <Typography sx={customProductSectionStyles.description}>
            {t('home.custom_product_section_desc')}
          </Typography>

          <Button
            sx={customProductSectionStyles.button(type)}
            onClick={handleCustomProductClick}
          >
            {t('home.custom_product_button')}
          </Button>
        </Box>
      </ProgressiveBackgroundImage>
    </Box>
  );
};
