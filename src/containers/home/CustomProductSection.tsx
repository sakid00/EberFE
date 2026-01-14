import { Box, Button, Typography } from '@mui/material';
import DualColorText from '@/components/dualColorText/index';
import Image from 'next/image';
import { getPhoto } from '@/assets/photoAssets';
import {
  customProductSectionStyles,
  animationClasses,
  fieldPersonImageStyles,
} from './styles/customProductSection.styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType'; // Used for DualColorText fontSize
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
        <Typography
          fontSize={'1.4em'}
          fontWeight={800}
          sx={customProductSectionStyles.title}
        >
          {t('home.custom_product_section_title.make_it')}
        </Typography>
        <Typography
          fontSize={'1.4em'}
          fontWeight={800}
          sx={customProductSectionStyles.titleMobileSecondText}
        >
          {t('home.custom_product_section_title.customize')}
        </Typography>
        <Typography
          fontSize={'1.4em'}
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
                style={fieldPersonImageStyles.mobile}
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
        sx={customProductSectionStyles.progressiveBackgroundSx}
        contentSx={customProductSectionStyles.progressiveBackgroundContentSx}
      >
        <Box
          sx={customProductSectionStyles.imageContainerTransform}
          data-critical
        >
          <Image
            src={getPhoto('fieldPerson2')}
            alt="field-person"
            fill
            loading="lazy"
          />
        </Box>

        <Box sx={customProductSectionStyles.spacer} />
        <Box
          sx={customProductSectionStyles.contentContainer}
          className={animationClasses.slideRight}
        >
          <DualColorText
            text={`${t('home.custom_product_section_title.make_it')}{${t('home.custom_product_section_title.customize')}}`}
            fontSize="2.2em"
            color="white"
            fontWeight={700}
          />
          <Typography
            fontSize="2.2em"
            fontWeight={700}
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
