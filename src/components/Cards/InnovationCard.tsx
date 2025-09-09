import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { INNOVATION_DATA } from '../../containers/home/constants';
import { useDeviceType, useTranslation } from '../../hooks';
import { dynamicStylingValue } from '../../hooks/useDeviceType';

interface InnovationCardProps {
  data: (typeof INNOVATION_DATA)[0];
  index: number;
}

export const InnovationCard = ({ data, index }: InnovationCardProps) => {
  const { t } = useTranslation();
  const { type } = useDeviceType();

  return (
    <Box
      id={`innovation-${index}`}
      className={`flex flex-col justify-between items-center bg-white ${type === 'mobile' ? 'w-[100%] h-[100%]' : 'w-[40%] h-[50%] min-h-[300px]'} ${type === 'mobile' ? 'px-5 py-6' : 'py-8 px-6'} gap-2 rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
    >
      <Box className="flex justify-center items-center flex-shrink-0">
        <Image src={data.img} alt={`innovation-img-${index}`} />
      </Box>
      <Box className="flex flex-col gap-2 flex-grow justify-center">
        <Typography
          fontSize={dynamicStylingValue(type, '0.8em', '1.5em', '1.5em')}
          textAlign={'center'}
          fontWeight={'700'}
          color="#030712"
        >
          {t(data.title)}
        </Typography>
        <Typography
          fontSize={dynamicStylingValue(type, '0.7em', '0.9em', '0.9em')}
          textAlign={'center'}
          fontWeight={400}
          color="#4B5563"
        >
          {t(data.desc)}
        </Typography>
      </Box>
    </Box>
  );
};
