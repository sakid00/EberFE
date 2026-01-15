import { Box, Typography } from '@mui/material';
import { ValueCard } from '@/components/Cards/ValueCard';
import { CHARACTERS_DATA, VALUES_DATA } from './constants';
import Image from 'next/image';
import { getPhoto } from '@/assets/photoAssets';
import { getBackgroundImage } from '@/assets/svgBackgrounds';
import ImageBackground from '@/components/ImageBackground/index';
import { valueStyles, valueImageStyles } from './styles';
import { useDeviceType, useTranslation } from '@/hooks';
import { animationClasses } from '../home/styles';
import { useMemo } from 'react';
import container2 from '@/public/background/container2.png';

export const ValueSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();

  const mobileContent = useMemo(() => {
    return (
      <Box sx={valueStyles.valuesContainerMobile}>
        <Typography
          fontSize={'1em'}
          fontWeight={'600'}
          color="white"
          sx={valueStyles.valuesAndCharactersTitleMobile}
        >
          {t('about_us.company_values')}
        </Typography>
        <Box sx={valueStyles.valuesGridMobile}>
          {VALUES_DATA.map((data, index) => {
            const isLastOdd =
              index === VALUES_DATA.length - 1 && VALUES_DATA.length % 2 === 1;
            return (
              <Box key={index} sx={valueStyles.mobileCardWrapper(isLastOdd)}>
                <ValueCard data={data} index={index} isMobile />
              </Box>
            );
          })}
        </Box>
        <Typography
          fontSize={'1em'}
          fontWeight={'600'}
          color="white"
          sx={valueStyles.valuesAndCharactersTitleMobile}
        >
          {t('about_us.company_characters')}
        </Typography>
        <Box sx={valueStyles.valuesGridCharactersMobile}>
          {CHARACTERS_DATA.map((data, index) => (
            <ValueCard key={index} data={data} index={index} isMobile />
          ))}
        </Box>
      </Box>
    );
  }, [t]);

  if (type === 'mobile') {
    return (
      <Box sx={valueStyles.mainContainerMobile}>
        <Box sx={valueStyles.titleContainer}>
          <Typography
            fontSize={'1.5em'}
            fontWeight={'500'}
            color="#784791"
            sx={valueStyles.titleTextCenter}
          >
            {`${t('about_us.value_section_title.creating')}\u00a0`}
            <Typography
              component={type === 'mobile' ? 'span' : 'div'}
              fontSize={'1em'}
              fontWeight={'800'}
              color="#784791"
            >
              {t('about_us.value_section_title.purpose_driven')}
            </Typography>
          </Typography>
        </Box>
        <ImageBackground
          src={getBackgroundImage('container2Mobile')}
          alt="container"
          objectFit={'fill'}
          className={animationClasses.slideRight}
          sx={valueStyles.imageBackgroundMobile}
          contentSx={valueStyles.contentSxMobile}
        >
          <Box sx={valueStyles.contentContainerMobile}>
            <Box sx={valueStyles.imageContainerMobile}>
              <Image
                src={getPhoto('chemPerson')}
                alt="field-person"
                width={100}
                height={100}
                loading="lazy"
                style={valueImageStyles.mobileChemPerson}
              />
            </Box>

            {mobileContent}
          </Box>
        </ImageBackground>
      </Box>
    );
  }

  return (
    <Box
      id="about-us-fifth-section"
      className="relative flex flex-col items-center mt-40"
    >
      <Box
        id="about-us-fifth-section-title"
        className="flex flex-col items-center relative"
        sx={valueStyles.titleContainer}
      >
        <>
          <Typography
            fontSize={'2em'}
            fontWeight={'500'}
            color="#784791"
            sx={valueStyles.titleTextCenter}
          >
            {`${t('about_us.value_section_title.creating')}\u00a0`}
          </Typography>
          <Typography fontSize={'2em'} fontWeight={'800'} color="#784791">
            {t('about_us.value_section_title.purpose_driven')}
          </Typography>
        </>
      </Box>

      <ImageBackground
        src={container2}
        alt="container"
        objectFit={'fill'}
        sx={valueStyles.imageBackground}
        contentSx={valueStyles.contentSxDesktop(type)}
      >
        <Box sx={valueStyles.fieldPersonContainer}>
          <Image
            src={getPhoto('chemPerson')}
            fill
            loading="lazy"
            alt="field-person"
          />
        </Box>

        <Box sx={valueStyles.valuesContainer}>
          <Typography
            fontSize={'1.2em'}
            fontWeight={'600'}
            color="white"
            sx={valueStyles.valuesAndCharactersTitle}
          >
            {t('about_us.company_values')}
          </Typography>
          <Box sx={valueStyles.valuesGrid}>
            {VALUES_DATA.map((data, index) => (
              <ValueCard key={index} data={data} index={index} />
            ))}
          </Box>
          <Typography
            fontSize={'1.2em'}
            fontWeight={'600'}
            color="white"
            sx={valueStyles.valuesAndCharactersTitle}
          >
            {t('about_us.company_characters')}
          </Typography>
          <Box sx={valueStyles.valuesGridCharacters}>
            {CHARACTERS_DATA.map((data, index) => (
              <ValueCard key={index} data={data} index={index} isCharacter />
            ))}
          </Box>
        </Box>
      </ImageBackground>

      <Box sx={valueStyles.siteBgContainer(type)}>
        <Image
          src={getBackgroundImage('siteBg')}
          width={2000}
          height={1000}
          alt="site"
          style={valueImageStyles.siteBg}
          loading="lazy"
        />
      </Box>
    </Box>
  );
};
