import DualColorText from '../DualColorText';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { styles, classNames } from './style';
import { dynamicStylingValue, useDeviceType } from '../../hooks/useDeviceType';
import { useTranslation } from '../../hooks';
import { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

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

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: '',
        }));
      }
    };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message is optional - no validation required

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(
        `Contact Form Submission from ${formData.firstName} ${formData.lastName}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.firstName} ${formData.lastName}\n` +
          `Email: ${formData.email}\n` +
          `Message:\n${formData.message || 'No message provided'}`
      );

      const mailtoLink = `mailto:?subject=${subject}&body=${body}`;

      // Open mailto link
      window.location.href = mailtoLink;

      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error creating mailto link:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
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
            value={formData.firstName}
            onChange={handleInputChange('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName}
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
            value={formData.lastName}
            onChange={handleInputChange('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName}
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
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={!!errors.email}
          helperText={errors.email}
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
          value={formData.message}
          onChange={handleInputChange('message')}
          sx={styles.textField}
          InputProps={{
            sx: styles.textFieldInput,
          }}
        />
      </Box>
      <Button
        sx={styles.submitButton}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting
          ? 'Submitting...'
          : t('contact_us.submit_application_button')}
      </Button>
    </Box>
  );
};

export default FormBox;
