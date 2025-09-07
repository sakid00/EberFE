import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import Image from 'next/image';
import tangki from '@public/photo/tangki.png';
import { InnovationCard } from '../../components/Cards/InnovationCard';
import { INNOVATION_DATA } from './constants';
import { animationClasses, innovationSectionStyles } from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType, useTranslation } from '@/hooks';

export const InnovationSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();

  return (
    <Box id="home-fifth-section" sx={innovationSectionStyles.container}>
      {type !== 'mobile' && (
        <Box sx={innovationSectionStyles.imageContainer(type)}>
          <Image src={tangki} alt="tangki-image" />
        </Box>
      )}
      <Box id="content-wrapper" sx={innovationSectionStyles.contentWrapper}>
        <Box
          id="content-left-side"
          sx={innovationSectionStyles.contentLeft(type)}
          className={animationClasses.slideLeft}
        >
          {type !== 'mobile' ? (
            <>
              <DualColorText
                text1={`${t('home.innovation_section_title.driving')}\u00a0`}
                text2={t('home.innovation_section_title.innovation')}
                fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
                fontWeight={800}
                color="#030712"
                inline
              />
              <Typography
                fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
                fontWeight={800}
                sx={innovationSectionStyles.subtitle}
              >
                {t('home.innovation_section_title.through_technology')}
              </Typography>
            </>
          ) : (
            <Typography
              fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
              fontWeight={800}
              color="#030712"
              textAlign="center"
            >
              {t('home.innovation_section_title.driving')}{' '}
              <span
                style={{
                  background:
                    'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('home.innovation_section_title.innovation')}{' '}
              </span>
              {t('home.innovation_section_title.through_technology')}
            </Typography>
          )}
          <Typography sx={innovationSectionStyles.description(type)}>
            {t('home.innovation_section_desc')}
          </Typography>
        </Box>
        {type !== 'mobile' && <Box sx={innovationSectionStyles.spacer} />}
      </Box>
      {type === 'mobile' && (
        <Box sx={innovationSectionStyles.imageContainer(type)}>
          <Image src={tangki} alt="tangki-image" />
        </Box>
      )}
      <Box
        id="innovation-list"
        sx={
          type === 'mobile'
            ? innovationSectionStyles.cardsContainerMobile
            : innovationSectionStyles.cardsContainer
        }
      >
        {INNOVATION_DATA.map((data, index) => (
          <InnovationCard key={index} data={data} index={index} />
        ))}
      </Box>
    </Box>
  );
};
