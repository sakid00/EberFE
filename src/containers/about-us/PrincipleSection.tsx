import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import fieldPerson from '@/public/photo/field_person3.png';
import { principleStyles } from './styles';
import container from '@/public/background/container1.png';
import containerMobile from '@/public/background/container1-mobile.png';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType, useTranslation } from '@/hooks';
import ImageBackground from '@/components/ImageBackground/index';
import { animationClasses } from '../home/styles';

export const PrincipleSection = () => {
  const { t } = useTranslation();
  const { type } = useDeviceType();

  return (
    <Box
      id="home-third-section"
      className="relative flex justify-center items-center mt-20"
    >
      {type === 'mobile' && (
        <Box sx={principleStyles.fieldPersonContainer(type)}>
          <Image src={fieldPerson} alt="field-person" fill />
        </Box>
      )}

      <ImageBackground
        src={type === 'mobile' ? containerMobile : container}
        alt="container"
        objectFit="fill"
        className={animationClasses.slideRight}
        sx={{
          width: '100%',
          height: dynamicStylingValue(type, '90vh', '100vh', '80vh'),
          marginTop: dynamicStylingValue(type, '20vh', '0px', '0px'),
        }}
        contentSx={{
          position: 'relative',
          marginTop: dynamicStylingValue(type, '20%', '0px', '0px'),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingX: dynamicStylingValue(type, '5%', '0px', '0px'),
        }}
      >
        {type !== 'mobile' && (
          <Box sx={principleStyles.fieldPersonContainer(type)}>
            <Image src={fieldPerson} alt="field-person" fill />
          </Box>
        )}

        {type !== 'mobile' && (
          <Box
            className="w-full flex justify-center"
            sx={principleStyles.spacerBox}
          />
        )}
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
      </ImageBackground>
    </Box>
  );
};
