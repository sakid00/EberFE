import { Box, Typography } from '@mui/material';
import { ValueCard } from '../../components/Cards/ValueCard';
import { VALUES_DATA } from './constants';
import Image from 'next/image';
import fieldPerson from '@public/photo/chem_person.png';
import siteBg from '@public/background/site-bg.png';
import ImageBackground from '@/components/ImageBackground';
import { valueStyles } from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType } from '@/hooks';

export const ValueSection = () => {
  const { type } = useDeviceType();
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
          {'Creating Meaningful Impact Through\u00a0'}
          <Typography
            component={type === 'mobile' ? 'span' : 'div'}
            fontSize={'1em'}
            fontWeight={'800'}
            color="#784791"
          >
            Purpose-Driven Values & a People-First Culture
          </Typography>
        </Typography>
      </Box>

      <ImageBackground
        src={siteBg}
        alt="Background with overlay"
        showOverlay
        overlayDirection="top"
        overlayOpacity={1}
        overlayColor="#ffffff"
        sx={valueStyles.backgroundImage}
        contentSx={valueStyles.contentContainer}
      >
        <Box
          className="clip-custom-shape-2 w-[88vw] h-[90vh] relative flex justify-center items-center animate-on-scroll"
          sx={valueStyles.mainShape}
        >
          <Box className="w-full " sx={valueStyles.fieldPersonContainer}>
            <Image
              src={fieldPerson}
              alt="field-person"
              width={800}
              height={400}
            />
          </Box>
          <Box
            className="relative grid grid-rows-2 grid-cols-5 gap-6 w-[70%] h-[50%] mt-[8%] z-100000"
            sx={valueStyles.valuesGrid}
          >
            {VALUES_DATA.map((data, index) => (
              <ValueCard key={index} data={data} index={index} />
            ))}
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
};
