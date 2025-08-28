import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import DualColorText from '../DualColorText';
import { styles, classNames } from './style';

const ReqProductModal = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) => {
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box sx={styles.modalBox}>
        <Box sx={styles.headerContainer}>
          <Typography sx={styles.headerText}>Get more detail</Typography>
          <Close sx={styles.closeIcon} onClick={() => setOpenModal(false)} />
        </Box>
        <DualColorText
          text1={'Curios about\u00a0'}
          text2="the details?"
          inline
          fontSize="1.8em"
          fontWeight={800}
        />
        <Typography sx={styles.descriptionText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          veniam ut eligendi minima eius itaque consequuntur, ipsam commodi nam,
          natus vel beatae voluptates pariatur saepe laboriosam. Blanditiis, sit
          praesentium? Vel.
        </Typography>
        <Box sx={styles.formRow}>
          <Box sx={styles.halfWidthBox}>
            <InputLabel sx={styles.inputLabel}>First Name</InputLabel>
            <TextField
              className={classNames.firstNameField}
              placeholder="First Name"
              sx={styles.textField}
              InputProps={{
                sx: styles.textFieldInput,
              }}
            />
          </Box>
          <Box sx={styles.halfWidthBox}>
            <InputLabel sx={styles.inputLabel}>Last Name</InputLabel>
            <TextField
              className={classNames.lastNameField}
              placeholder="Last Name"
              sx={styles.textField}
              InputProps={{
                sx: styles.textFieldInput,
              }}
            />
          </Box>
        </Box>
        <Box sx={styles.fieldContainer}>
          <InputLabel sx={styles.inputLabel}>Email Address</InputLabel>
          <TextField
            className={classNames.emailField}
            placeholder="Email Address"
            sx={styles.textField}
            InputProps={{
              sx: styles.textFieldInput,
            }}
          />
        </Box>
        <Button sx={styles.submitButton}>Request Detail Product</Button>
      </Box>
    </Modal>
  );
};

export default ReqProductModal;
