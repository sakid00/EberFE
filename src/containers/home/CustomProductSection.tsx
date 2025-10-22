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

export const CustomProductSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  const router = useRouter();
  const handleCustomProductClick = () => {
    router.push('/product/submit');
  };

  return (
    <Box id="home-third-section" sx={customProductSectionStyles.container}>
      {type === 'mobile' && (
        <Box
          sx={customProductSectionStyles.imageContainerTransform(type)}
          data-critical
        >
          <Image
            src={getPhoto('fieldPerson2')}
            alt="field-person"
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'contain' }}
          />
        </Box>
      )}

      <ProgressiveBackgroundImage
        src={
          type === 'mobile'
            ? getBackgroundImage('container1Mobile')
            : getBackgroundImage('container1')
        }
        alt="container background"
        objectFit={'fill'}
        priority={true}
        quality={75}
        placeholderColor="#cbd5e0"
        className={animationClasses.slideRight}
        sx={{
          position: 'relative',
          width: '100vw',
          height: dynamicStylingValue(type, '80vh', '70vh', '70vh'),
          marginTop: dynamicStylingValue(type, '40vh', '20vh', '20vh'),
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
        {type !== 'mobile' && (
          <Box
            sx={customProductSectionStyles.imageContainerTransform(type)}
            data-critical
          >
            <Image
              src={getPhoto('fieldPerson2')}
              alt="field-person"
              style={{
                objectFit: 'contain', // Changed from 'fill' to 'contain' for better aspect ratio
                maxWidth: '100%',
                minWidth: '20%',
                height: 'auto', // Maintain aspect ratio
              }}
              sizes={'(max-width: 768px) 35vw, (max-width: 1200px) 44vw, 50vw'}
              priority={true} // Add priority for better loading
            />
          </Box>
        )}

        {type !== 'mobile' && <Box sx={customProductSectionStyles.spacer} />}
        <Box
          sx={customProductSectionStyles.contentContainer(type)}
          className={animationClasses.slideRight}
        >
          <DualColorText
            text1={t('home.custom_product_section_title.make_it')}
            text2={t('home.custom_product_section_title.customize')}
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
