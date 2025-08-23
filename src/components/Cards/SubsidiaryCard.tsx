import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import headerImage from '@public/photo/header_corporate.png';
import locationSVG from '@public/icon/location.svg';
import { SUBSIDIARIES_DATA } from '../../containers/home/constants';

interface SubsidiaryCardProps {
  data: (typeof SUBSIDIARIES_DATA)[0];
  index: number;
}

export const SubsidiaryCard = ({ data, index }: SubsidiaryCardProps) => (
  <Box
    id={`subsidiaries-${index}`}
    className={`flex flex-col justify-center items-start bg-white w-[40%] h-[40%] p-3 gap-2 rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
  >
    <Image src={headerImage} alt={`subsidiary-img-${index}`} />
    <Typography
      variant="h6"
      fontSize={'16px'}
      textAlign={'left'}
      fontWeight={'800'}
      color="#030712"
    >
      {data.title}
    </Typography>
    <Box className="flex flex-row gap-2">
      <Image src={locationSVG} alt="location-icon" />
      <Typography
        color="#784791"
        variant="subtitle1"
        fontSize={'14px'}
        fontWeight={400}
      >
        {data.location}
      </Typography>
    </Box>
    <Typography
      variant="body1"
      fontSize={'15px'}
      textAlign={'start'}
      color="#4B5563"
    >
      {data.desc}
    </Typography>
  </Box>
);
