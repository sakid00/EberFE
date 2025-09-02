import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { VALUES_DATA } from '../../containers/about-us/constants';
import { useTranslation } from '@/hooks';

interface ValueCardProps {
  data: (typeof VALUES_DATA)[0];
  index: number;
}

export const ValueCard = ({ data, index }: ValueCardProps) => {
  const { t } = useTranslation();

  return (
    <Box
      id={`value-${index}`}
      className={`flex flex-col justify-center items-center p-5 gap-3 rounded-xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)', // For Safari support
      }}
    >
      <Image
        src={data.img}
        alt={`innovation-img-${index}`}
        style={{ width: 35, height: 35 }}
      />
      <Typography fontSize={'16px'} textAlign={'center'} fontWeight={'500'}>
        {t(data.title)}
      </Typography>
    </Box>
  );
};
