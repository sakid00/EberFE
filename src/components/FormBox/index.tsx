import DualColorText from '@/components/DualColorText';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { styles, classNames } from './style';
import { dynamicStylingValue, useDeviceType } from '@/hooks/useDeviceType';
import { useTranslation } from '@/hooks';

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
  const { t } = useTranslation();
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
          <InputLabel sx={styles.inputLabel}>
            {t('form_field.first_name')}
          </InputLabel>
          <TextField
            className={dynamicStylingValue(
              type,
              classNames.lastNameField,
              classNames.firstNameField,
              classNames.firstNameField
            )}
            placeholder={t('form_field.first_name')}
            sx={styles.textField}
            InputProps={{
              sx: styles.textFieldInput,
            }}
          />
        </Box>
        <Box sx={styles.halfWidthBox(type)}>
          <InputLabel sx={styles.inputLabel}>
            {t('form_field.last_name')}
          </InputLabel>
          <TextField
            className={classNames.lastNameField}
            placeholder={t('form_field.last_name')}
            sx={styles.textField}
            InputProps={{
              sx: styles.textFieldInput,
            }}
          />
        </Box>
      </Box>
      <Box sx={styles.fieldContainer}>
        <InputLabel sx={styles.inputLabel}>{t('form_field.email')}</InputLabel>
        <TextField
          className={classNames.emailField}
          placeholder={t('form_field.email')}
          sx={styles.textField}
          InputProps={{
            sx: styles.textFieldInput,
          }}
        />
      </Box>
      <Box sx={styles.fieldContainer}>
        <InputLabel sx={styles.inputLabel}>
          {t('form_field.message')}
        </InputLabel>
        <TextField
          className={classNames.messageField}
          multiline
          rows={7}
          placeholder=""
          sx={styles.textField}
          InputProps={{
            sx: styles.textFieldInput,
          }}
        />
      </Box>
      <Button sx={styles.submitButton}>
        {t('contact_us.submit_application_button')}
      </Button>
    </Box>
  );
};

export default FormBox;
