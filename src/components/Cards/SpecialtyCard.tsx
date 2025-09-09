import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { SPECIALTY_DATA } from '../../containers/home/constants';
import { useDeviceType, useTranslation } from '../../hooks';
import { dynamicStylingValue } from '../../hooks/useDeviceType';

interface SpecialtyCardProps {
  data: (typeof SPECIALTY_DATA)[0];
  index: number;
}

export const SpecialtyCard = ({ data, index }: SpecialtyCardProps) => {
  const { t } = useTranslation();
  const { type } = useDeviceType();

  return (
    <Box
      id={`specialty-${index}`}
      className={`flex flex-col justify-center items-center bg-white ${type === 'mobile' ? 'w-[100%] h-[100%]' : 'w-[40%] h-[50%] min-h-[300px]'} ${type === 'mobile' ? 'px-5 py-6' : 'py-8 px-6'} gap-2 rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
    >
      <Box className="flex justify-center items-center">
        <Image
          src={data.img}
          alt={`specialty-img-${index}`}
          width={50}
          height={50}
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box className="flex flex-col gap-2 justify-center">
        <Typography
          fontSize={dynamicStylingValue(type, '0.8em', '1.5em', '1.5em')}
          textAlign={'center'}
          fontWeight={'800'}
          color="#030712"
        >
          {t(data.title)}
        </Typography>
        <Typography
          fontSize={dynamicStylingValue(type, '0.7em', '1em', '1em')}
          textAlign={'center'}
          color="#4B5563"
        >
          {t(data.desc)}
        </Typography>
      </Box>
    </Box>
  );
};
