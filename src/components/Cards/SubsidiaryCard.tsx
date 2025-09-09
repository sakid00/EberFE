import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import locationSVG from '../../../public/icon/location.svg';
import { SUBSIDIARIES_DATA } from '../../containers/home/constants';
import { useDeviceType, useTranslation } from '../../hooks';
import { dynamicStylingValue } from '../../hooks/useDeviceType';

interface SubsidiaryCardProps {
  data: (typeof SUBSIDIARIES_DATA)[0];
  index: number;
}

export const SubsidiaryCard = ({ data, index }: SubsidiaryCardProps) => {
  const { t } = useTranslation();
  const { type } = useDeviceType();

  return (
    <Box
      id={`subsidiaries-${index}`}
      className={`flex flex-col justify-start items-start bg-white ${type === 'mobile' ? 'w-[100%]' : 'w-[40%]'} h-auto p-3 gap-2 rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
    >
      <Image
        src={data.img}
        alt={`subsidiary-img-${index}`}
        style={{
          width: '100%',
          height: dynamicStylingValue(type, '20vh', '25vh', '25vh'),
          borderRadius: '10px',
        }}
      />
      <Typography
        fontSize={dynamicStylingValue(type, '0.8em', '1.2em', '1.2em')}
        textAlign={'left'}
        fontWeight={'800'}
        color="#030712"
        alignSelf={'justify'}
        sx={{ height: '12%' }}
      >
        {t(data.title)}
      </Typography>
      <Box className="flex flex-row gap-2">
        <Image src={locationSVG} alt="location-icon" />
        <Typography color="#784791" fontSize={'0.8em'} fontWeight={400}>
          {data.location}
        </Typography>
      </Box>
      <Typography
        fontSize={dynamicStylingValue(type, '0.7em', '0.8em', '0.8em')}
        textAlign={'start'}
        color="#4B5563"
      >
        {t(data.desc)}
      </Typography>
    </Box>
  );
};
