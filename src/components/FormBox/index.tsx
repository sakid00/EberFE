import DualColorText from '@/components/dualColorText/index';
import TextParser from '@/components/TextParser/index';
import { Box, Button, InputLabel, Modal, TextField, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { styles, classNames } from './style';
import { dynamicStylingValue, useDeviceType } from '@/hooks/useDeviceType';
import { useTranslation } from '@/hooks';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useContactForm from '@/hooks/useContactForm';
import Image, { StaticImageData } from 'next/image';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  cvFile?: File | null;
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
  text,
  formBoxStyle,
  buttonText,
  photo,
  imageStyle,
}: {
  title: string;
  description: string;
  text: string;
  formBoxStyle?: React.CSSProperties;
  buttonText?: string;
  photo: string | StaticImageData;
  imageStyle?: React.CSSProperties;
}) => {
  const { type } = useDeviceType();
  const { t, language } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const {
    submitApplication,
    isSubmitting,
    isSuccess,
    error: submitError,
  } = useContactForm();
  const isCareerPage = pathname?.includes('/careers/submit');
  const isProduct = pathname?.includes('/product/submit');
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    cvFile: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const getSendTo = () => {
    if (isCareerPage) {
      return 'CAREER';
    } else if (isProduct) {
      return 'PRODUCT';
    } else {
      return 'CONTACT_US';
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const result = await submitApplication({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.message,
      file: formData.cvFile,
      sendTo: getSendTo(),
    });

    if (result.success) {
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        cvFile: null,
      });
      setOpenSuccessModal(true);
    }
  };

  const getSuccessModalContent = () => {
    if (isCareerPage) {
      return {
        title: t('success_modal.career.title'),
        desc: t('success_modal.career.desc'),
      };
    } else if (isProduct) {
      return {
        title: t('success_modal.product.title'),
        desc: t('success_modal.product.desc'),
      };
    }
    return {
      title: t('success_modal.contact_us.title'),
      desc: t('success_modal.contact_us.desc'),
    };
  };

  const handleCloseModal = () => {
    router.push('/');
    setTimeout(() => {
      setOpenSuccessModal(false);
    }, 500);
  };

  const handleGotIt = () => {
    router.push('/');
    setTimeout(() => {
      setOpenSuccessModal(false);
    }, 500);
  };
  return (
    <>
      {type === 'mobile' && photo && (
        <Box sx={imageStyle}>
          <Image
            src={photo}
            alt="photo"
            width={500}
            height={500}
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      )}
      <Box sx={[styles.formBox, formBoxStyle ?? {}]}>
        <Typography sx={styles.getInTouchText}>{title}</Typography>
        <DualColorText
          text={text}
          inline
          fontSize={dynamicStylingValue(type, '1.25em', '1.25em', '1.6em')}
          fontWeight={800}
          wrap={true}
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
          <InputLabel sx={styles.inputLabel}>
            {t('form_field.email')}
          </InputLabel>
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
                  disabled={isSubmitting}
                  sx={styles.fileUploadButton}
                >
                  {formData.cvFile
                    ? `Selected: ${formData.cvFile.name}`
                    : t('careers.upload_cv_button')}
                </Button>
              </label>
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
        {submitError && (
          <Typography sx={styles.errorText}>{submitError}</Typography>
        )}
        <Button
          sx={styles.submitButton}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Submitting...'
            : (buttonText ?? t('contact_us.submit_application_button'))}
        </Button>
      </Box>

      <Modal
        open={openSuccessModal}
        onClose={handleCloseModal}
        sx={styles.modal}
        BackdropProps={{
          sx: styles.backdrop,
        }}
      >
        <Box sx={styles.modalBox}>
          <Box sx={styles.modalHeaderContainer}>
            <DualColorText
              text={getSuccessModalContent().title}
              fontSize="2em"
              fontWeight={800}
              inline
              color="#030712"
            />
            <Close sx={styles.modalCloseIcon} onClick={handleCloseModal} />
          </Box>
          <Typography sx={styles.modalMessageText}>
            {getSuccessModalContent().desc}
          </Typography>
          <Button sx={styles.modalConfirmButton} onClick={handleGotIt}>
            {t('success_modal.got_it')}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default FormBox;
