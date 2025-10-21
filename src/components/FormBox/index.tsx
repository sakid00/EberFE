import DualColorText from '@/components/dualColorText/index';
import TextParser from '@/components/TextParser/index';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { styles, classNames } from './style';
import { dynamicStylingValue, useDeviceType } from '@/hooks/useDeviceType';
import { useTranslation } from '@/hooks';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import useCareer from '@/hooks/useCareer';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  cvFile?: File | null;
  cvFileUrl?: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  cvFile?: string;
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
  const pathname = usePathname();
  const { uploadCVFile } = useCareer();
  const isCareerPage = pathname?.includes('/careers/submit');

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    cvFile: null,
    cvFileUrl: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingCV, setIsUploadingCV] = useState(false);

  const handleInputChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      // Clear error when user starts typing
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({
          ...prev,
          [field as keyof FormErrors]: '',
        }));
      }
    };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type - only PDF allowed
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        cvFile: 'Please upload a PDF file only',
      }));
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        cvFile: 'File size must be less than 5MB',
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      cvFile: file,
    }));

    // Clear any previous errors
    if (errors.cvFile) {
      setErrors((prev) => ({
        ...prev,
        cvFile: '',
      }));
    }

    // Upload the file immediately
    setIsUploadingCV(true);
    try {
      const fileUrl = await uploadCVFile(file);
      setFormData((prev) => ({
        ...prev,
        cvFileUrl: fileUrl,
      }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        cvFile: error instanceof Error ? error.message : 'Failed to upload CV',
      }));
    } finally {
      setIsUploadingCV(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

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

    // CV file validation for career page
    if (isCareerPage && !formData.cvFile) {
      newErrors.cvFile = 'CV file is required for job applications';
    }

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
      let bodyContent =
        `Name: ${formData.firstName} ${formData.lastName}\n` +
        `Email: ${formData.email}\n` +
        `Message:\n${formData.message || 'No message provided'}`;

      // Add CV link if available
      if (formData.cvFileUrl) {
        bodyContent += `\n\nCV Document: ${formData.cvFileUrl}`;
      }

      const body = encodeURIComponent(bodyContent);

      const mailtoLink = `mailto:hr@ebergroup.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoLink;

      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        cvFile: null,
        cvFileUrl: '',
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
      {isCareerPage && (
        <Box sx={styles.fieldContainer}>
          <InputLabel sx={styles.inputLabel}>
            {t('careers.upload_cv_label')}
          </InputLabel>
          <Box sx={styles.fileUploadContainer}>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="cv-upload"
            />
            <label htmlFor="cv-upload">
              <Button
                component="span"
                variant="outlined"
                disabled={isUploadingCV}
                sx={styles.fileUploadButton}
              >
                {isUploadingCV
                  ? 'Uploading...'
                  : formData.cvFile
                    ? `Selected: ${formData.cvFile.name}`
                    : t('careers.upload_cv_button')}
              </Button>
            </label>
            {formData.cvFileUrl && (
              <Typography sx={styles.uploadSuccessText}>
                {t('careers.upload_cv_success')}
              </Typography>
            )}
            {errors.cvFile && (
              <Typography sx={styles.errorText}>{errors.cvFile}</Typography>
            )}
            <Typography sx={styles.disclaimerText}>
              {t('careers.upload_cv_desc')}
            </Typography>
          </Box>
          <Box>
            <Typography sx={styles.consentTitle}>
              {t('careers.consent.title')}
            </Typography>
            <Typography sx={styles.consentDesc}>
              {t('careers.consent.desc_p1')}
            </Typography>
            <Typography sx={styles.consentDesc}>
              {t('careers.consent.desc_p2')}
            </Typography>
            <Typography sx={styles.consentDesc}>
              {t('careers.consent.desc_p3')}
            </Typography>
            <TextParser
              text={t('careers.consent.desc_p4')}
              sx={styles.consentDesc}
              patterns={[
                {
                  pattern: /Submit/gi,
                  style: { fontWeight: 700 },
                },
                {
                  pattern: /Kirim/gi,
                  style: { fontWeight: 700 },
                },
              ]}
            />
          </Box>
        </Box>
      )}
      <Button
        sx={styles.submitButton}
        onClick={handleSubmit}
        disabled={isSubmitting || (isCareerPage && isUploadingCV)}
      >
        {isSubmitting
          ? 'Submitting...'
          : t('contact_us.submit_application_button')}
      </Button>
    </Box>
  );
};

export default FormBox;
