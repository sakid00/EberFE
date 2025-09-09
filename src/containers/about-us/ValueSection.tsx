import { Box, Typography } from '@mui/material';
import { ValueCard } from '../../components/Cards/ValueCard';
import { VALUES_DATA } from './constants';
import Image from 'next/image';
import fieldPerson from '../../../public/photo/chem-person.png';
import ImageBackground from '../../components/ImageBackground';
import { valueStyles } from './styles';
import { dynamicStylingValue } from '../../hooks/useDeviceType';
import { useDeviceType, useTranslation } from '../../hooks';
import container from '../../../public/background/container2.png';
import containerMobile from '../../../public/background/container2-mobile.png';
import site from '../../../public/background/site-bg.png';

export const ValueSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  return (
    <Box
      id="about-us-fifth-section"
      className="relative flex flex-col items-center mt-40"
    >
      <Box
        id="about-us-fifth-section-title"
        className="flex flex-col items-center"
        sx={valueStyles.titleContainer}
      >
        {type === 'mobile' ? (
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
        ) : (
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
        )}
      </Box>

      {type === 'mobile' && (
        <Box className="w-full " sx={valueStyles.fieldPersonContainer(type)}>
          <Image
            src={fieldPerson}
            alt="field-person"
            width={800}
            height={400}
          />
        </Box>
      )}

      <ImageBackground
        src={type === 'mobile' ? containerMobile : container}
        alt="container"
        objectFit="fill"
        sx={{
          width: '110%',
          height: '110vh',
          marginTop: dynamicStylingValue(type, '30vh', '0px', '0px'),
        }}
        contentSx={{
          marginTop: dynamicStylingValue(type, '10%', '0px', '0px'),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingX: dynamicStylingValue(type, '5%', '0px', '0px'),
        }}
      >
        {type !== 'mobile' && (
          <Box className="w-full " sx={valueStyles.fieldPersonContainer(type)}>
            <Image
              src={fieldPerson}
              alt="field-person"
              style={{
                objectFit: 'contain',
                width: '65%',
                height: '50%',
              }}
            />
          </Box>
        )}
        <Box
          sx={
            type === 'mobile'
              ? valueStyles.valuesGridMobile
              : valueStyles.valuesGrid
          }
        >
          {VALUES_DATA.map((data, index) => (
            <ValueCard key={index} data={data} index={index} />
          ))}
        </Box>
      </ImageBackground>
      <Box
        sx={{
          position: 'absolute',
          bottom: '-20vh',
          right: dynamicStylingValue(type, '-5vw', '-10vw', '-10vw'),
          zIndex: -1,
          width: '100vw',
          height: '100%',
        }}
      >
        <Image
          src={site}
          alt="site"
          style={{ objectFit: 'fill', width: '100vw', height: '100%' }}
        />
      </Box>
    </Box>
  );
};
