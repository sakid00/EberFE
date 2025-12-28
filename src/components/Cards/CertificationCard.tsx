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
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: isMobile ? '140px' : '250px',
      height: isMobile ? '140px' : '250px',
      padding: isMobile ? '16px' : '40px',
      borderRadius: isMobile ? '12px' : '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      flexShrink: 0,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: isMobile ? 'none' : 'translateY(-4px)',
        boxShadow: isMobile ? undefined : '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
    }}
  >
    <Image
      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${data}`}
      alt={`specialty-img-${index}`}
      width={isMobile ? 100 : 150}
      height={isMobile ? 100 : 150}
      style={{
        width: isMobile ? '100px' : '150px',
        height: isMobile ? '100px' : '150px',
        objectFit: 'contain',
      }}
    />
  </Box>
);
