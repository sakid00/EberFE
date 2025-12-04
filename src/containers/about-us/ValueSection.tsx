import { Box, Typography } from '@mui/material';
import { ValueCard } from '@/components/Cards/ValueCard';
import { VALUES_DATA } from './constants';
import Image from 'next/image';
import { getPhoto } from '@/assets/photoAssets';
import { getBackgroundImage } from '@/assets/svgBackgrounds';
import ImageBackground from '@/components/ImageBackground/index';
import { valueStyles } from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType, useTranslation } from '@/hooks';

export const ValueSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();

  if (type === 'mobile') {
    return (
      <Box sx={valueStyles.mainContainerMobile}>
        <Box sx={valueStyles.titleContainer}>
          <Typography
            fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
            fontWeight={'500'}
            color="#784791"
            sx={{ textAlign: 'center' }}
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
          src={getBackgroundImage('container1Mobile')}
          alt="container"
          objectFit={'fill'}
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
                style={{
                  objectFit: 'fill',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>

            <Box sx={valueStyles.valuesGridMobile}>
              {VALUES_DATA.map((data, index) => (
                <ValueCard key={index} data={data} index={index} />
              ))}
            </Box>
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
            fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
            fontWeight={'500'}
            color="#784791"
            sx={{ textAlign: 'center' }}
          >
            {`${t('about_us.value_section_title.creating')}\u00a0`}
          </Typography>
          <Typography
            fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
            fontWeight={'800'}
            color="#784791"
          >
            {t('about_us.value_section_title.purpose_driven')}
          </Typography>
        </>
      </Box>

      <ImageBackground
        src={getBackgroundImage('container1')}
        alt="container"
        objectFit={'fill'}
        sx={{
          position: 'relative',
          width: '100%',
          height: '85vh',
          overflow: 'hidden',
        }}
        contentSx={{
          position: 'relative',
          marginTop: dynamicStylingValue(type, '10%', '5%', '5%'),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingX: dynamicStylingValue(type, '5%', '0px', '0px'),
        }}
      >
        <Box className="w-full " sx={valueStyles.fieldPersonContainer(type)}>
          <Image
            src={getPhoto('chemPerson')}
            width={1000}
            height={1000}
            alt="field-person"
            loading="lazy"
            style={{ width: '60%', height: 'auto', objectFit: 'contain' }}
          />
        </Box>
        <Box sx={valueStyles.valuesGrid}>
          {VALUES_DATA.map((data, index) => (
            <ValueCard key={index} data={data} index={index} />
          ))}
        </Box>
      </ImageBackground>

      <Box
        sx={{
          position: 'absolute',
          bottom: '-45vh',
          right: dynamicStylingValue(type, '0', '-10vw', '-10vw'),
          zIndex: -1,
          width: dynamicStylingValue(type, '120vw', '100vw', '100vw'),
          height: 'auto',
        }}
      >
        <Image
          src={getBackgroundImage('siteBg')}
          width={2000}
          height={1000}
          alt="site"
          style={{ objectFit: 'fill', width: '100%', height: '100%' }}
          loading="lazy"
        />
      </Box>
    </Box>
  );
};
