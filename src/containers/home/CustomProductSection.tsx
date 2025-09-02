import { Box, Button, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import Image from 'next/image';
import fieldPerson from '@public/photo/field_person2.png';
import {
  customProductSectionStyles,
  animationClasses,
  utilityClasses,
} from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType } from '@/hooks';

export const CustomProductSection = () => {
  const { type } = useDeviceType();
  return (
    <Box id="home-third-section" sx={customProductSectionStyles.container}>
      <Box
        sx={customProductSectionStyles.imageContainer}
        // className={animationClasses.slideLeft}
      >
        <Image src={fieldPerson} alt="field-person" width={600} height={600} />
      </Box>
      <Box
        className={`${utilityClasses.clipCustomShape}`}
        sx={customProductSectionStyles.mainContainer}
      >
        <Box sx={customProductSectionStyles.spacer} />
        <Box
          sx={customProductSectionStyles.contentContainer}
          className={animationClasses.slideRight}
        >
          <DualColorText
            text1="Make it Yours,"
            text2="Customize Your Product"
            fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
            color="white"
            fontWeight={700}
          />
          <Typography
            fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
            fontWeight={800}
            sx={customProductSectionStyles.title}
          >
            Today!
          </Typography>
          <Typography sx={customProductSectionStyles.description}>
            Eber Group&apos;s expertise in specialty materials is supported by a
            strong in-house R&D team, which enables the company to provide
            solutions for products and processes improvement in the
            infrastructure, construction, automotive, environmental and
            manufacturing industries.
          </Typography>

          <Button sx={customProductSectionStyles.button}>Custom Product</Button>
        </Box>
      </Box>
    </Box>
  );
};
