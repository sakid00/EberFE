import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import locationSVG from '../../../public/icon/location.svg';
import { SUBSIDIARIES_DATA } from '../../containers/home/constants';
import { useDeviceType, useTranslation } from '../../hooks';
import {
  subsidiaryCardStyles,
  getContainerClassName,
  subsidiaryImageStyle,
} from './subsidiaryCard.styles';

interface SubsidiaryCardProps {
  data: (typeof SUBSIDIARIES_DATA)[0];
  index: number;
}

export const SubsidiaryCard = ({ data, index }: SubsidiaryCardProps) => {
  const { t } = useTranslation();
  const { type } = useDeviceType();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/corporate?company=${t(data.title)}`);
  };

  return (
    <Box
      id={`subsidiaries-${index}`}
      onClick={handleClick}
      className={getContainerClassName(type, index)}
      sx={subsidiaryCardStyles.container(type)}
    >
      <Box sx={subsidiaryCardStyles.imageContainer(type)}>
        <Image
          src={data.img}
          alt={`subsidiary-img-${index}`}
          width={200}
          height={200}
          style={subsidiaryImageStyle}
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </Box>
      <Typography sx={subsidiaryCardStyles.title(type)}>
        {t(data.title)}
      </Typography>
      <Box className="flex flex-row gap-2">
        <Image src={locationSVG} alt="location-icon" />
        <Typography sx={subsidiaryCardStyles.location(type)}>
          {t(data.location)}
        </Typography>
      </Box>
      <Typography sx={subsidiaryCardStyles.description(type)}>
        {t(data.desc)}
      </Typography>
    </Box>
  );
};
