import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import headerImage from '@public/photo/header_corporate.png';
import locationSVG from '@public/icon/location.svg';
import { SUBSIDIARIES_DATA } from '../../containers/home/constants';
import { useTranslation } from '@/hooks';

interface SubsidiaryCardProps {
  data: (typeof SUBSIDIARIES_DATA)[0];
  index: number;
}

export const SubsidiaryCard = ({ data, index }: SubsidiaryCardProps) => {
  const { t } = useTranslation();

  return (
    <Box
      id={`subsidiaries-${index}`}
      className={`flex flex-col justify-start items-start bg-white w-[40%] h-auto p-3 gap-2 rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
    >
      <Image src={headerImage} alt={`subsidiary-img-${index}`} />
      <Typography
        fontSize={'1em'}
        textAlign={'left'}
        fontWeight={'800'}
        color="#030712"
      >
        {t(data.title)}
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
      <Typography fontSize={'0.8em'} textAlign={'start'} color="#4B5563">
        {t(data.desc)}
      </Typography>
    </Box>
  );
};
