import { Box, Button } from '@mui/material';
import Image from 'next/image';
import customIcon from '@/public/icon/customize.svg';
import DualColorText from '@/components/dualColorText/index';
import { styles } from '../style';
import { CustomizationHeaderProps } from '../types';
import { dynamicStylingValue, useDeviceType } from '@/hooks/useDeviceType';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CustomizationHeader: React.FC<CustomizationHeaderProps> = ({
  onCustomProductClick,
}) => {
  const { type } = useDeviceType();
  return (
    <Box
      sx={styles.headerContainer}
      onClick={type === 'mobile' ? onCustomProductClick : undefined}
    >
      <Box sx={styles.headerContent}>
        <Box sx={styles.iconContainer}>
          <Image src={customIcon} width={20} height={20} alt="Customize icon" />
        </Box>
        <DualColorText
          text1="Make it Yours"
          text2="Customize Your Product"
          color="white"
          fontSize={dynamicStylingValue(type, '0.8em', '1.2em', '1.2em')}
          fontWeight={400}
          inline={false}
        />
      </Box>
      {type !== 'mobile' ? (
        <Button
          size="small"
          sx={styles.customProductButton}
          onClick={onCustomProductClick}
        >
          Custom Product
        </Button>
      ) : (
        <ChevronRightIcon sx={{ color: 'white' }} />
      )}
    </Box>
  );
};

export default CustomizationHeader;
