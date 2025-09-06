import { Box, Typography } from '@mui/material';
import { ValueCard } from '../../components/Cards/ValueCard';
import { VALUES_DATA } from './constants';
import Image from 'next/image';
import fieldPerson from '@public/photo/chem-person.png';
import siteBg from '@public/background/site-bg.png';
import ImageBackground from '@/components/ImageBackground';
import { valueStyles } from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType, useTranslation } from '@/hooks';
import container from '@public/background/container2.png';
import containerMobile from '@public/background/container2-mobile.png';

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
        <Typography
          fontSize={dynamicStylingValue(type, '1.5em', '3em', '3em')}
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
          height: '100vh',
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
              width={800}
              height={400}
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
    </Box>
  );
};
