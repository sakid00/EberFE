import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { SPECIALTY_DATA } from '../../containers/home/constants';
import { useTranslation } from '@/hooks';

interface SpecialtyCardProps {
  data: (typeof SPECIALTY_DATA)[0];
  index: number;
}

export const SpecialtyCard = ({ data, index }: SpecialtyCardProps) => {
  const { t } = useTranslation();

  return (
    <Box
      id={`specialty-${index}`}
      className={`flex flex-col justify-center items-center bg-white w-[40%] h-auto py-10 px-8 gap-2 rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
    >
      <Image src={data.img} alt={`specialty-img-${index}`} />
      <Typography
        variant="h6"
        fontSize={'16px'}
        textAlign={'center'}
        fontWeight={'800'}
        color="#030712"
      >
        {t(data.title)}
      </Typography>
      <Typography
        variant="body1"
        fontSize={'15px'}
        textAlign={'center'}
        color="#4B5563"
      >
        {t(data.desc)}
      </Typography>
    </Box>
  );
};
