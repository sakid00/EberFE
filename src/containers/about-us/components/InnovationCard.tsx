import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { INNOVATION_DATA } from '../constants';

interface InnovationCardProps {
  data: (typeof INNOVATION_DATA)[0];
  index: number;
}

export const InnovationCard = ({ data, index }: InnovationCardProps) => (
  <Box
    id={`innovation-${index}`}
    className={`flex flex-col justify-center items-center bg-white w-[40%] h-[25vh] py-10 px-6 gap-2 rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
  >
    <Image src={data.img} alt={`innovation-img-${index}`} />
    <Typography
      variant="h6"
      fontSize={'26px'}
      textAlign={'center'}
      fontWeight={'700'}
      color="#030712"
    >
      {data.title}
    </Typography>
    <Typography
      variant="body1"
      fontSize={'16px'}
      textAlign={'center'}
      fontWeight={400}
      color="#4B5563"
    >
      {data.desc}
    </Typography>
  </Box>
);
