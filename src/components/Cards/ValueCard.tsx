import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { VALUES_DATA } from '../../containers/about-us/constants';
import { useDeviceType, useTranslation } from '../../hooks';
import { dynamicStylingValue } from '../../hooks/useDeviceType';

interface ValueCardProps {
  data: (typeof VALUES_DATA)[0];
  index: number;
  isCharacter?: boolean;
  isMobile?: boolean;
}

export const ValueCard = ({
  data,
  index,
  isMobile = false,
}: ValueCardProps) => {
  const { t } = useTranslation();
  const { type } = useDeviceType();

  return (
    <Box
      id={`value-${index}`}
      className={`flex flex-col justify-center items-center ${type === 'mobile' ? 'p-2 py-5' : 'p-5'} gap-1 rounded-xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        width: '100%',
        height: isMobile ? '100%' : '16vh',
        minHeight: 0,
        minWidth: 0,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          flex: isMobile ? '1 1 60%' : '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 0,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Image
          src={data.img}
          alt={`innovation-img-${index}`}
          style={{
            width: isMobile ? '50%' : '40%',
            height: 'auto',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
      <Typography
        fontSize={dynamicStylingValue(
          type,
          'clamp(0.5rem, 2.5vw, 0.8rem)',
          '16px',
          '16px'
        )}
        textAlign={'center'}
        fontWeight={'500'}
        color="white"
        sx={{
          flex: isMobile ? '0 0 auto' : '0 0 auto',
          lineHeight: 1.2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: isMobile ? 'nowrap' : 'normal',
        }}
      >
        {t(data.title)}
      </Typography>
    </Box>
  );
};
