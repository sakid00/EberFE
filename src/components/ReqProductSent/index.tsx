import { Box, Button, Modal, Typography } from '@mui/material';
import DualColorText from '@/components/dualColorText/index';
import TextParser from '@/components/TextParser/index';
import { Close } from '@mui/icons-material';
import { styles } from './style';
import { useTranslation } from '@/hooks/useTranslation';
import { useRouter } from 'next/navigation';

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
  hasAccess?: boolean;
  email?: string;
}

const ReqProductSent: React.FC<ReqProductSentProps> = ({
  openModal,
  setOpenModal,
  hasAccess,
  email,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleGotIt = () => {
    setOpenModal(false);
    router.push('/');
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
            text1={`${!hasAccess ? t('product.reqProductSentModal.access') : t('product.reqProductSentModal.request')}\u00a0`}
            text2={
              !hasAccess
                ? t('product.reqProductSentModal.request_sent')
                : t('product.reqProductSentModal.sent')
            }
            fontSize="2em"
            fontWeight={800}
            inline
            color="#030712"
          />
          {hasAccess && <Close sx={styles.closeIcon} onClick={handleClose} />}
        </Box>

        {!hasAccess ? (
          <TextParser
            text={t('product.reqProductSentModal.desc_access').replace(
              '{email}',
              email || ''
            )}
            patterns={[
              {
                pattern: email || '',
                style: { fontWeight: 700 },
              },
            ]}
            sx={styles.messageText}
          />
        ) : (
          <Typography sx={styles.messageText}>
            {t('product.reqProductSentModal.desc')}
          </Typography>
        )}

        <Button sx={styles.confirmButton} onClick={handleGotIt}>
          {t('product.reqProductSentModal.got_it')}
        </Button>
      </Box>
    </Modal>
  );
};

export default ReqProductSent;
