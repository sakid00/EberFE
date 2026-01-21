import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { VALUES_DATA } from '../../containers/about-us/constants';
import { useDeviceType, useTranslation } from '../../hooks';
import {
  valueCardStyles,
  getContainerClassName,
  valueCardImageStyle,
} from './valueCard.styles';

interface ValueCardProps {
  data: (typeof VALUES_DATA)[0];
  index: number;
  isCharacter?: boolean;
  isMobile?: boolean;
  isLastOdd?: boolean;
}

export const ValueCard = ({
  data,
  index,
  isMobile = false,
  isCharacter = false,
  isLastOdd = false,
}: ValueCardProps) => {
  const { t } = useTranslation();
  const { type } = useDeviceType();

  const containerHeight = isCharacter ? '16vh' : '18vh';

  return (
    <Box
      id={`value-${index}`}
      className={getContainerClassName(type, index)}
      sx={valueCardStyles.container(isMobile, containerHeight, isLastOdd)}
    >
      <Box sx={valueCardStyles.imageContainer(isMobile)}>
        <Image
          src={data.img}
          alt={`innovation-img-${index}`}
          style={valueCardImageStyle(isMobile)}
        />
      </Box>
      <Typography
        fontSize={valueCardStyles.titleFontSize(type)}
        textAlign={'center'}
        fontWeight={'500'}
        color="white"
        sx={valueCardStyles.title(type, isMobile)}
      >
        {t(data.title)}
      </Typography>
    </Box>
  );
};
