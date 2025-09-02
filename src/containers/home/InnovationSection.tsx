import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import Image from 'next/image';
import tangki from '@public/photo/tangki.png';
import { InnovationCard } from '../../components/Cards/InnovationCard';
import { INNOVATION_DATA } from './constants';
import { innovationSectionStyles, utilityClasses } from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType } from '@/hooks';

export const InnovationSection = () => {
  const { type } = useDeviceType();
  return (
    <Box id="home-fifth-section" sx={innovationSectionStyles.container}>
      <Box sx={innovationSectionStyles.imageContainer}>
        <Image src={tangki} alt="tangki-image" />
        <Box className={utilityClasses.tangkiGradientOverlay} />
      </Box>
      <Box id="content-wrapper" sx={innovationSectionStyles.contentWrapper}>
        <Box id="content-left-side" sx={innovationSectionStyles.contentLeft}>
          <DualColorText
            text1={'Driving\u00a0'}
            text2="Innovation"
            fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
            fontWeight={700}
            color="#030712"
            inline
          />
          <Typography
            fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
            fontWeight={700}
            sx={innovationSectionStyles.subtitle}
          >
            Through Technology
          </Typography>
          <Typography
            variant="subtitle1"
            sx={innovationSectionStyles.description}
          >
            {`At Eber Group, we&apos;re committed to pushing the boundaries of what&apos;s
          possible in the petrochemical industry. Our state-of-the-art
          research facilities and dedicated team of scientists and engineers
          work tirelessly to develop innovative solutions that address the
          evolving needs of our customers and the global market.`}
          </Typography>
        </Box>
        <Box sx={innovationSectionStyles.spacer} />
      </Box>
      <Box id="innovation-list" sx={innovationSectionStyles.cardsContainer}>
        {INNOVATION_DATA.map((data, index) => (
          <InnovationCard key={index} data={data} index={index} />
        ))}
      </Box>
    </Box>
  );
};
