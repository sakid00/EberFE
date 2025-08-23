import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { CORPORATE_DATA } from '../../containers/about-us/constants';

interface CorporateCardProps {
  data: (typeof CORPORATE_DATA)[0];
  index: number;
}

export const CorporateCard = ({ data, index }: CorporateCardProps) => (
  <Box
    id={`subsidiaries-${index}`}
    className={`flex flex-col justify-center items-start bg-white w-[40%] h-[40%] p-5 gap-2 rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
  >
    <Image
      src={data.img}
      alt={`corporate-img-${index}`}
      style={{ width: 40, height: 40 }}
    />
    <Typography
      variant="h6"
      fontSize={'16px'}
      textAlign={'left'}
      fontWeight={'800'}
      color="#030712"
    >
      {data.title}
    </Typography>
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
