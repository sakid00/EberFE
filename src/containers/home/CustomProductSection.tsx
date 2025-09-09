import { Box, Button, Typography } from '@mui/material';
import DualColorText from '../../components/DualColorText';
import Image from 'next/image';
import fieldPerson from '../../../public/photo/field_person2.png';
import { customProductSectionStyles, animationClasses } from './styles';
import { dynamicStylingValue } from '../../hooks/useDeviceType';
import { useDeviceType, useTranslation } from '../../hooks';
import ImageBackground from '../../components/ImageBackground';
import container from '../../../public/background/container1.png';
import containerMobile from '../../../public/background/container1-mobile.png';
import { useRouter } from 'next/navigation';

export const CustomProductSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  const router = useRouter();
  const handleCustomProductClick = () => {
    router.push('/product');
  };

  return (
    <Box id="home-third-section" sx={customProductSectionStyles.container}>
      <Box
        sx={customProductSectionStyles.imageContainer(type)}
        className={animationClasses.slideLeft}
      >
        <Image
          src={fieldPerson}
          alt="field-person"
          width={type === 'mobile' ? 300 : 600}
          height={type === 'mobile' ? 300 : 600}
        />
      </Box>

      <ImageBackground
        src={type === 'mobile' ? containerMobile : container}
        alt="container"
        objectFit="contain"
        className={animationClasses.slideRight}
        sx={{
          width: '100vw',
          height: dynamicStylingValue(type, '90vh', '100vh', '100vh'),
          marginTop: dynamicStylingValue(type, '40vh', '0px', '0px'),
        }}
        contentSx={{
          marginTop: dynamicStylingValue(type, '18%', '0px', '0px'),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingX: dynamicStylingValue(type, '5%', '0px', '0px'),
        }}
      >
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
          <Typography sx={customProductSectionStyles.description(type)}>
            {t('home.custom_product_section_desc')}
          </Typography>

          <Button
            sx={customProductSectionStyles.button(type)}
            onClick={handleCustomProductClick}
          >
            {t('home.custom_product_button')}
          </Button>
        </Box>
      </ImageBackground>
    </Box>
  );
};
