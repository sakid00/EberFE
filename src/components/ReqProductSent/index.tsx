import { Box, Button, Modal, Typography } from '@mui/material';
import DualColorText from '@/components/dualColorText/index';
import { Close } from '@mui/icons-material';
import { styles } from './style';
import { useTranslation } from '@/hooks/useTranslation';

/**
 * ReqProductSent Modal Component
 *
 * A confirmation modal that appears after a successful product request submission.
 * Features a success icon, confirmation message, and consistent styling with other modals.
 *
 * @param openModal - Controls modal visibility
 * @param setOpenModal - Function to control modal state
 */
interface ReqProductSentProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const ReqProductSent: React.FC<ReqProductSentProps> = ({
  openModal,
  setOpenModal,
}) => {
  const { t } = useTranslation();
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      sx={styles.modal}
      BackdropProps={{
        sx: styles.backdrop,
      }}
    >
      <Box sx={styles.modalBox}>
        <Box sx={styles.headerContainer}>
          <DualColorText
            text1={`${t('product.reqProductSentModal.request')}\u00a0`}
            text2={t('product.reqProductSentModal.sent')}
            fontSize="2em"
            fontWeight={800}
            inline
            color="#030712"
          />
          <Close sx={styles.closeIcon} onClick={handleClose} />
        </Box>

        <Typography sx={styles.messageText}>
          {t('product.reqProductSentModal.desc')}
        </Typography>

        <Button sx={styles.confirmButton} onClick={handleClose}>
          {t('product.reqProductSentModal.got_it')}
        </Button>
      </Box>
    </Modal>
  );
};

export default ReqProductSent;
