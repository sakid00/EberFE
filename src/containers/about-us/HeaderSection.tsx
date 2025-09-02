import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import Image from 'next/image';
import photo from '@public/photo/tangki-person.png';
import { headerStyles } from './styles';
import { dynamicStylingValue, useDeviceType } from '@/hooks/useDeviceType';
import { ClientOnly } from '@/components/ClientOnly';

export const HeaderSection = () => {
  return (
    <ClientOnly
      fallback={
        <>
          <Box id="home-header" sx={headerStyles.headerContent('desktop')}>
            <DualColorText
              text1={'Our\u00a0'}
              text2="Company"
              fontSize="4em"
              fontWeight={800}
              inline
              color="white"
            />
            <Typography
              fontSize="4em"
              fontWeight={800}
              marginTop="-3vh"
              sx={headerStyles.backgroundText}
            >
              Background
            </Typography>
            <Typography
              className="w-1/4"
              style={headerStyles.description('desktop')}
            >
              Eber Group was incorporated in 2021 as a holding company of four
              leading high-performance chemical manufacturing companies in
              Indonesia.
            </Typography>
          </Box>
        </>
      }
    >
      <HeaderSectionContent />
    </ClientOnly>
  );
};

const HeaderSectionContent = () => {
  const { type } = useDeviceType();

  return (
    <>
      <Image
        src={photo}
        alt="header photo"
        style={headerStyles.headerPhoto(type)}
      />
      <Box id="home-header" sx={headerStyles.headerContent(type)}>
        <DualColorText
          text1={'Our\u00a0'}
          text2="Company"
          fontSize={dynamicStylingValue(type, '2em', '4em', '4em')}
          fontWeight={800}
          inline
          color="white"
          sx={{
            justifyContent: dynamicStylingValue(
              type,
              'center',
              'start',
              'start'
            ) as 'center' | 'start',
          }}
        />
        <Typography
          fontSize={dynamicStylingValue(type, '2em', '4em', '4em')}
          fontWeight={800}
          marginTop={dynamicStylingValue(type, '-1vh', '-3vh', '-3vh')}
          sx={headerStyles.backgroundText}
        >
          Background
        </Typography>
        <Typography style={headerStyles.description(type)}>
          Eber Group was incorporated in 2021 as a holding company of four
          leading high-performance chemical manufacturing companies in
          Indonesia.
        </Typography>
      </Box>
    </>
  );
};
