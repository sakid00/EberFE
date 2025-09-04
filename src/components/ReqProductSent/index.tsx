import { Box, Button, Modal, Typography } from '@mui/material';
import DualColorText from '../DualColorText';
import { Close } from '@mui/icons-material';
import { styles } from './style';

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
            text1={`Request\u00a0`}
            text2="Sent!"
            fontSize="2em"
            fontWeight={800}
            inline
            color="#030712"
          />
          <Close sx={styles.closeIcon} onClick={handleClose} />
        </Box>

        <Typography sx={styles.messageText}>
          Thank you! Your request has been sent successfully. Our Eber team will
          contact you soon with more information.
        </Typography>

        <Button sx={styles.confirmButton} onClick={handleClose}>
          Got it!
        </Button>
      </Box>
    </Modal>
  );
};

export default ReqProductSent;
