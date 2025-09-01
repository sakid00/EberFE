import { Box } from '@mui/material';
import Image from 'next/image';

interface CertificationCardProps {
  data: string;
  index: number;
  isMobile: boolean;
}

export const CertificationCard = ({
  data,
  index,
  isMobile,
}: CertificationCardProps) => (
  <Box
    id={`specialty-${index}`}
    className={`flex flex-col justify-center items-center bg-white ${isMobile ? 'w-[100%] h-[100%]' : 'w-[40%] h-[40%]'} ${isMobile ? 'p-5' : 'p-10'} rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
  >
    <Image
      src={data}
      alt={`specialty-img-${index}`}
      style={{ width: '150px', height: '150px' }}
    />
  </Box>
);
