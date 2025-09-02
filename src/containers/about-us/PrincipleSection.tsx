import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import fieldPerson from '@public/photo/field_person3.png';
import { principleStyles } from './styles';
import container from '@public/svg/container.svg';
import { useTranslation } from '@/hooks';

export const PrincipleSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      id="home-third-section"
      className="relative justify-center items-center"
    >
      <Box
        className="w-full z-20 animate-slide-right"
        sx={principleStyles.fieldPersonContainer}
      >
        <Image src={fieldPerson} alt="field-person" width={550} height={400} />
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          '& svg': {
            color: '#4ECDC4', // Target the SVG specifically
          },
        }}
      >
        <Image src={container} alt="container" fill />
      </Box>
      <Box
        className="clip-custom-shape relative w-[100vw] h-[85vh] flex flex-row gap-8 mt-40 animate-on-scroll"
        sx={principleStyles.mainContainer}
      >
        <Box
          className="w-full flex justify-center"
          sx={principleStyles.spacerBox}
        />
        <Box
          className="flex flex-col justify-center animate-slide-right"
          sx={principleStyles.contentContainer}
        >
          <Typography fontSize={'3em'} fontWeight={700}>
            {t('about_us.principle_section_title.our_guiding')}
          </Typography>
          <Typography
            fontSize={'3em'}
            fontWeight={700}
            sx={principleStyles.backgroundText}
          >
            {t('about_us.principle_section_title.principle')}
          </Typography>
          <Typography
            fontSize={'3em'}
            fontWeight={700}
            sx={principleStyles.backgroundText}
          >
            {t('about_us.principle_section_title.future')}
          </Typography>
          <Typography
            fontSize={'1.5em'}
            fontWeight={700}
            sx={principleStyles.visionTitle}
          >
            {t('about_us.vision_title')}
          </Typography>
          <Typography
            fontSize={'1em'}
            fontWeight={400}
            sx={principleStyles.visionDescription}
          >
            {t('about_us.vision_desc')}
          </Typography>
          <Typography
            fontSize={'1.5em'}
            fontWeight={700}
            sx={principleStyles.missionTitle}
          >
            {t('about_us.mission_title')}
          </Typography>
          <Typography
            fontSize={'1em'}
            fontWeight={400}
            sx={principleStyles.missionDescription}
          >
            {t('about_us.mission_desc')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
