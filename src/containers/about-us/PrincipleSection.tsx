import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { getPhoto } from '@/assets/photoAssets';
import { getBackgroundImage } from '@/assets/svgBackgrounds';
import { principleStyles } from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType, useTranslation } from '@/hooks';
import ImageBackground from '@/components/ImageBackground/index';
import { animationClasses } from '../home/styles';
import { useMemo } from 'react';

export const PrincipleSection = () => {
  const { t } = useTranslation();
  const { type } = useDeviceType();

  const content = useMemo(() => {
    return (
      <Box
        className="flex flex-col justify-center animate-slide-right"
        sx={principleStyles.contentContainer(type)}
      >
        <Typography sx={principleStyles.backgroundTextWhite(type)}>
          {t('about_us.principle_section_title.our_guiding')}
        </Typography>
        <Typography sx={principleStyles.backgroundText(type)}>
          {t('about_us.principle_section_title.principle')}
        </Typography>
        <Typography sx={principleStyles.backgroundText(type)}>
          {t('about_us.principle_section_title.future')}
        </Typography>
        <Typography
          fontSize={dynamicStylingValue(type, '0.9em', '1.5em', '1.5em')}
          fontWeight={700}
          color="white"
          sx={principleStyles.visionTitle}
        >
          {t('about_us.vision_title')}
        </Typography>
        <Typography
          fontSize={dynamicStylingValue(type, '0.8em', '1em', '1em')}
          fontWeight={400}
          color="#D6CBE3"
          sx={principleStyles.visionDescription}
        >
          {t('about_us.vision_desc')}
        </Typography>
        <Typography
          fontSize={dynamicStylingValue(type, '0.9em', '1.5em', '1.5em')}
          fontWeight={700}
          color="white"
          sx={principleStyles.missionTitle}
        >
          {t('about_us.mission_title')}
        </Typography>
        <Typography
          fontSize={dynamicStylingValue(type, '0.8em', '1em', '1em')}
          fontWeight={400}
          color="#D6CBE3"
          sx={principleStyles.missionDescription}
        >
          {t('about_us.mission_desc')}
        </Typography>
      </Box>
    );
  }, [type, t]);

  if (type === 'mobile') {
    return (
      <Box sx={principleStyles.mainContainerMobile}>
        <ImageBackground
          src={getBackgroundImage('container1Mobile')}
          alt="container"
          objectFit={'fill'}
          className={animationClasses.slideRight}
          sx={principleStyles.imageBackgroundMobile}
          contentSx={principleStyles.contentSxMobile}
        >
          <Box sx={principleStyles.contentContainerMobile}>
            <Box sx={principleStyles.imageContainerMobile}>
              <Image
                src={getPhoto('fieldPerson3')}
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

            {content}
          </Box>
        </ImageBackground>
      </Box>
    );
  }

  return (
    <Box
      id="home-third-section"
      className="relative flex justify-center items-center mt-40"
    >
      <ImageBackground
        src={getBackgroundImage('container1')}
        alt="container"
        objectFit="fill"
        className={animationClasses.slideRight}
        sx={{
          width: '100%',
          height: dynamicStylingValue(type, '80vh', '100vh', '80vh'),
          marginTop: dynamicStylingValue(type, '20vh', '0px', '0px'),
          position: 'relative',
          overflow: 'visible',
          overflowY: 'clip',
        }}
        contentSx={{
          position: 'relative',
          marginTop: dynamicStylingValue(type, '20%', '0px', '0px'),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingX: dynamicStylingValue(type, '5%', '10px', '20px'),
        }}
      >
        <Box sx={principleStyles.fieldPersonContainer(type)}>
          <Image
            src={getPhoto('fieldPerson3')}
            alt="field-person"
            width={900}
            height={900}
            style={{
              objectFit: 'contain',
              width: '100%',
            }}
            loading="lazy"
          />
        </Box>

        {content}
      </ImageBackground>
    </Box>
  );
};
