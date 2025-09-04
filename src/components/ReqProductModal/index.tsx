import {
  Box,
  Button,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { styles, classNames } from './style';
import { useState } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  city: string;
}

interface ReqProductModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  onSuccessfulSubmission?: () => void;
}

const ReqProductModal: React.FC<ReqProductModalProps> = ({
  openModal,
  setOpenModal,
  onSuccessfulSubmission,
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    city: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    // Company name and city are now optional - no validation required

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateToken = (): string => {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `eber_token_${timestamp}_${randomString}`;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate and save token
      const token = generateToken();
      const userData = {
        ...formData,
        token,
        submittedAt: new Date().toISOString(),
      };

      // Save to localStorage
      localStorage.setItem('userToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('hasVisitedProduct', 'true');

      // Mark as submitted and close modal after successful submission
      setHasSubmitted(true);
      setOpenModal(false);

      // Call the success callback if provided
      if (onSuccessfulSubmission) {
        onSuccessfulSubmission();
      }

      // Optional: Show success message or redirect
      alert('Thank you! You now have access to our product information.');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Only allow closing if form has been submitted successfully
    if (hasSubmitted) {
      setOpenModal(false);
    }
    // Do nothing if form hasn't been submitted - modal stays open
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      disableEscapeKeyDown={!hasSubmitted}
      sx={styles.modal}
      BackdropProps={{
        sx: styles.backdrop,
        onClick: (e) => {
          // Prevent closing modal by clicking backdrop if form hasn't been submitted
          if (!hasSubmitted) {
            e.stopPropagation();
          }
        },
      }}
    >
      <Box sx={styles.modalBox}>
        <Box sx={styles.headerContainer}>
          <Typography sx={styles.headerText}>Curious to know more?</Typography>
        </Box>
        <Typography sx={styles.titleText}>
          <span
            style={{ color: '#030712' }}
          >{`Just share a few details and\u00a0`}</span>
          <span
            style={{
              background:
                'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            we’ll give you instant access to the information you need.
          </span>
        </Typography>
        <Box sx={styles.fullWidthBox}>
          <InputLabel sx={styles.inputLabel}>Full Name</InputLabel>
          <TextField
            className={classNames.firstNameField}
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange('fullName')}
            error={!!errors.fullName}
            helperText={errors.fullName}
            sx={styles.textField}
            InputProps={{
              sx: styles.textFieldInput,
            }}
          />
        </Box>
        <Box sx={styles.fullWidthBox}>
          <InputLabel sx={styles.inputLabel}>Email</InputLabel>
          <TextField
            className={classNames.lastNameField}
            placeholder="Email"
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
          <InputLabel sx={styles.inputLabel}>Phone Number</InputLabel>
          <TextField
            className={classNames.emailField}
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange('phoneNumber')}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            sx={styles.textField}
            InputProps={{
              sx: styles.textFieldInput,
            }}
          />
        </Box>
        <Box sx={styles.fieldContainer}>
          <InputLabel sx={styles.inputLabel}>
            Company Name (Optional)
          </InputLabel>
          <TextField
            className={classNames.emailField}
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleInputChange('companyName')}
            error={!!errors.companyName}
            helperText={errors.companyName}
            sx={styles.textField}
            InputProps={{
              sx: styles.textFieldInput,
            }}
          />
        </Box>
        <Box sx={styles.fieldContainer}>
          <InputLabel sx={styles.inputLabel}>City (Optional)</InputLabel>
          <TextField
            className={classNames.emailField}
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange('city')}
            error={!!errors.city}
            helperText={errors.city}
            sx={styles.textField}
            InputProps={{
              sx: styles.textFieldInput,
            }}
          />
        </Box>
        <Typography fontSize={'0.8em'} color={'#4B5563'} marginTop={'1%'}>
          We&apos;ll never share your details with anyone else
        </Typography>
        <Button
          sx={styles.submitButton}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Get Instant Access'}
        </Button>
      </Box>
    </Modal>
  );
};

export default ReqProductModal;
