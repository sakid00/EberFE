import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const handleClick = () => {
    router.push(`/corporate?company=${t(data.title)}`);
  };

  return (
    <Box
      id={`subsidiaries-${index}`}
      onClick={handleClick}
      className={`flex flex-col justify-start items-start bg-white ${type === 'mobile' ? 'w-[100%]' : 'w-[40%]'} h-auto p-3 px-4 gap-2 rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '200px',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={data.img}
          alt={`subsidiary-img-${index}`}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </Box>
      <Typography
        fontSize={dynamicStylingValue(type, '0.8em', '1.2em', '1.2em')}
        textAlign={'left'}
        fontWeight={'800'}
        color="#030712"
        alignSelf={'flex-start'}
        sx={{ marginBottom: '8%', height: '10%' }}
      >
        {t(data.title)}
      </Typography>
      <Box className="flex flex-row gap-2">
        <Image src={locationSVG} alt="location-icon" />
        <Typography color="#784791" fontSize={'0.8em'} fontWeight={400}>
          {t(data.location)}
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
