import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { VALUES_DATA } from '../../containers/about-us/constants';
import { useDeviceType, useTranslation } from '@/hooks';
import { dynamicStylingValue } from '@/hooks/useDeviceType';

interface ValueCardProps {
  data: (typeof VALUES_DATA)[0];
  index: number;
}

export const ValueCard = ({ data, index }: ValueCardProps) => {
  const { t } = useTranslation();
  const { type } = useDeviceType();

  return (
    <Box
      id={`value-${index}`}
      className={`flex flex-col justify-center items-center ${type === 'mobile' ? 'px-2 py-10' : 'p-5'} gap-3 rounded-xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        width: dynamicStylingValue(type, '100%', '100%', '13vw'),
        height: dynamicStylingValue(type, '15vh', '100%', '20vh'),
      }}
    >
      <Image
        src={data.img}
        alt={`innovation-img-${index}`}
        style={{
          width: dynamicStylingValue(type, '25px', '35px', '35px'),
          height: dynamicStylingValue(type, '25px', '35px', '35px'),
        }}
      />
      <Typography
        fontSize={dynamicStylingValue(type, '0.5em', '16px', '16px')}
        textAlign={'center'}
        fontWeight={'500'}
        color="white"
      >
        {t(data.title)}
      </Typography>
    </Box>
  );
};
