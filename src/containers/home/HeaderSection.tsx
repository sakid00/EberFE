import { Box, Button, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import { headerSectionStyles } from './styles';
import { useDeviceType } from '@/hooks';
import { dynamicStylingValue } from '@/hooks/useDeviceType';

export const HeaderSection = () => {
  const { type } = useDeviceType();
  return (
    <>
      <Box id="home-header" sx={headerSectionStyles.container}>
        <Box id="home-header-left-side" sx={headerSectionStyles.leftSide}>
          <Typography
            fontSize={dynamicStylingValue(type, '2em', '4em', '4em')}
            fontWeight={800}
            sx={headerSectionStyles.title}
          >
            Innovating
          </Typography>
          <DualColorText
            text1={'as\u00a0'}
            text2="Sustainable"
            fontSize={dynamicStylingValue(type, '2em', '4em', '4em')}
            fontWeight={800}
            inline
            color="white"
            sx={headerSectionStyles.title}
          />
          <Typography
            fontSize={dynamicStylingValue(type, '2em', '4em', '4em')}
            fontWeight={800}
            sx={headerSectionStyles.title}
          >
            Future
          </Typography>
          <Typography sx={headerSectionStyles.description}>
            Established in 2021, Eber Group oversees four top-performing
            chemical manufacturing companies operating across Indonesia.
          </Typography>
          <Box id="buttons-wrapper" sx={headerSectionStyles.buttonsWrapper}>
            <Button size="small" sx={headerSectionStyles.primaryButton}>
              Explore Our Product
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={headerSectionStyles.secondaryButton}
            >
              Custom Product
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
