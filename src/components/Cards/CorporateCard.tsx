import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { CORPORATE_DATA } from '../../containers/about-us/constants';
import { useTranslation } from '@/hooks';

interface CorporateCardProps {
  data: (typeof CORPORATE_DATA)[0];
  index: number;
  isMobile?: boolean;
}

export const CorporateCard = ({
  data,
  index,
  isMobile,
}: CorporateCardProps) => {
  const { t } = useTranslation();

  return (
    <Box
      id={`subsidiaries-${index}`}
      className={`flex flex-col justify-center ${isMobile ? 'items-center' : 'items-start'} bg-white ${isMobile ? 'w-[100%] h-[100%]' : 'w-[40%] h-min-[40vh]'} p-5 gap-2 rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
    >
      <Image
        src={data.img}
        alt={`corporate-img-${index}`}
        style={{ width: 40, height: 40 }}
      />
      <Typography
        fontSize={'1em'}
        textAlign={'left'}
        fontWeight={'800'}
        color="#030712"
      >
        {t(data.title)}
      </Typography>
      <Typography fontSize={'1em'} textAlign={'start'} color="#4B5563">
        {t(data.desc)}
      </Typography>
    </Box>
  );
};
