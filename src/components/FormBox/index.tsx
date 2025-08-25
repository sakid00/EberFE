import DualColorText from '@/components/DualColorText';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { styles, classNames } from './style';

const FormBox = ({
  title,
  description,
  text1,
  text2,
}: {
  title: string;
  description: string;
  text1: string;
  text2: string;
}) => {
  return (
    <Box sx={styles.formBox}>
      <Typography sx={styles.getInTouchText}>{title}</Typography>
      <DualColorText
        text1={text1}
        text2={text2}
        inline
        text1Variant="h4"
        text2Variant="h4"
      />
      <Typography sx={styles.descriptionText}>{description}</Typography>
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
      <Box sx={styles.fieldContainer}>
        <InputLabel sx={styles.inputLabel}>Message</InputLabel>
        <TextField
          className={classNames.messageField}
          multiline
          rows={7}
          placeholder="Leave us message"
          sx={styles.textField}
          InputProps={{
            sx: styles.textFieldInput,
          }}
        />
      </Box>
      <Button sx={styles.submitButton}>Submit</Button>
    </Box>
  );
};

export default FormBox;
