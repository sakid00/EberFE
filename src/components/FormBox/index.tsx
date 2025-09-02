import DualColorText from '@/components/DualColorText';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { styles, classNames } from './style';
import { dynamicStylingValue, useDeviceType } from '@/hooks/useDeviceType';

const FormBox = ({
  title,
  description,
  text1,
  text2,
  formBoxStyle,
}: {
  title: string;
  description: string;
  text1: string;
  text2: string;
  formBoxStyle?: React.CSSProperties;
}) => {
  const { type } = useDeviceType();
  return (
    <Box sx={[styles.formBox, formBoxStyle ?? {}]}>
      <Typography sx={styles.getInTouchText}>{title}</Typography>
      <DualColorText
        text1={text1}
        text2={text2}
        inline
        fontSize={dynamicStylingValue(type, '1em', '1.8em', '1.8em')}
        fontWeight={800}
      />
      <Typography sx={styles.descriptionText(type)}>{description}</Typography>
      <Box sx={styles.formRow(type)}>
        <Box sx={styles.halfWidthBox(type)}>
          <InputLabel sx={styles.inputLabel}>First Name</InputLabel>
          <TextField
            className={dynamicStylingValue(
              type,
              classNames.lastNameField,
              classNames.firstNameField,
              classNames.firstNameField
            )}
            placeholder="First Name"
            sx={styles.textField}
            InputProps={{
              sx: styles.textFieldInput,
            }}
          />
        </Box>
        <Box sx={styles.halfWidthBox(type)}>
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
