import { Box, Typography } from '@mui/material';
import { ValueCard } from '@/components/Cards/ValueCard';
import { VALUES_DATA } from './constants';
import Image from 'next/image';
import fieldPerson from '@/public/photo/chem-person.png';
import ImageBackground from '@/components/ImageBackground/index';
import { valueStyles } from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType, useTranslation } from '@/hooks';
import container from '@/public/background/container2.png';
import containerMobile from '@/public/background/container2-mobile.png';
import site from '@/public/background/site-bg.png';

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
          src={containerMobile}
          alt="container"
          objectFit={'fill'}
          sx={valueStyles.imageBackgroundMobile}
          contentSx={valueStyles.contentSxMobile}
        >
          <Box sx={valueStyles.contentContainerMobile}>
            <Box
              sx={valueStyles.imageContainerMobile}
            >
              <Image
                src={fieldPerson}
                alt="field-person"
                width={100}
                height={100}
                priority={true}
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
        src={container}
        alt="container"
        objectFit={'fill'}
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
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
            src={fieldPerson}
            alt="field-person"
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
          bottom: '-40vh',
          right: dynamicStylingValue(type, '0', '-10vw', '-10vw'),
          zIndex: -1,
          width: dynamicStylingValue(type, '120vw', '100vw', '100vw'),
          height: '100%',
        }}
      >
        <Image src={site} alt="site" fill />
      </Box>
    </Box>
  );
};
