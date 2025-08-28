import { Box, Button } from '@mui/material';
import Image from 'next/image';
import customIcon from '@public/icon/customize.svg';
import DualColorText from '@/components/DualColorText';
import { styles } from '../style';
import { CustomizationHeaderProps } from '../types';

const CustomizationHeader: React.FC<CustomizationHeaderProps> = ({
  onCustomProductClick,
}) => {
  return (
    <Box sx={styles.headerContainer}>
      <Box sx={styles.headerContent}>
        <Box sx={styles.iconContainer}>
          <Image src={customIcon} width={20} height={20} alt="Customize icon" />
        </Box>
        <DualColorText
          text1="Make it Yours"
          text2="Customize Your Product"
          color="white"
          fontSize="1.2em"
          fontWeight={400}
          inline={false}
        />
      </Box>
      <Button
        size="small"
        sx={styles.customProductButton}
        onClick={onCustomProductClick}
      >
        Custom Product
      </Button>
    </Box>
  );
};

export default CustomizationHeader;
