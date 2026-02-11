import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';

export const styles = {
  formBox: {
    backgroundColor: 'white',
    padding: '32px',
    maxWidth: '50%',
    height: '100%',
    borderRadius: '12px',
    zIndex: 1,
    boxShadow:
      '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },

  getInTouchText: {
    fontSize: '0.8em',
    fontWeight: 500,
    color: '#4B5563',
  },

  descriptionText: (type: DeviceType) => ({
    fontSize: dynamicStylingValue(type, '0.8em', '1em', '1em'),
    fontWeight: 400,
    color: '#4B5563',
    marginTop: 1,
  }),

  formRow: (type: DeviceType) => ({
    display: 'flex',
    flexDirection: dynamicStylingValue(type, 'column', 'row', 'row'),
    marginTop: '4%',
  }),

  halfWidthBox: (type: DeviceType) => ({
    width: dynamicStylingValue(type, '100%', '50%', '50%'),
  }),

  fieldContainer: {
    marginTop: '20px',
  },

  inputLabel: {
    marginY: 1,
    color: '#4B5563',
    fontSize: '12px',
    fontWeight: 400,
  },

  textField: {
    fontSize: '12px',
    background: '#F3F5F7',
    color: '#BCC2C9',
    fontWeight: 700,
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
    },
  },

  textFieldInput: {
    fontSize: '12px',
  },

  submitButton: {
    color: 'white',
    background:
      'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
    marginTop: 4,
    width: '100%',
    borderRadius: 5,
    height: '3em',
    textTransform: 'none',
  },

  fileUploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  fileUploadButton: {
    borderColor: '#E5E7EB',
    color: '#6B7280',
    backgroundColor: '#F9FAFB',
    textTransform: 'none',
    borderRadius: '8px',
    padding: '12px 16px',
    '&:hover': {
      borderColor: '#D1D5DB',
      backgroundColor: '#F3F4F6',
    },
  },

  uploadSuccessText: {
    fontSize: '12px',
    color: '#10B981',
    fontWeight: 500,
  },

  errorText: {
    fontSize: '12px',
    color: '#EF4444',
    fontWeight: 400,
  },

  disclaimerText: {
    fontSize: '11px',
    color: '#6B7280',
    fontWeight: 400,
    fontStyle: 'italic',
    marginTop: '4px',
  },

  consentTitle: {
    fontSize: '0.8em',
    color: '#4B5563',
    fontWeight: 700,
    marginTop: '16px',
  },

  consentDesc: {
    fontSize: '0.8em',
    color: '#4B5563',
    fontWeight: 400,
    marginTop: '3%',
  },

  // Success modal styles (same as ReqProductSent)
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },

  modalBox: {
    width: '50%',
    maxWidth: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '32px',
    borderRadius: '12px',
    backgroundColor: 'white',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: 'none',
    '@media (max-width: 768px)': {
      width: '90%',
      maxWidth: '90%',
      padding: '24px',
    },
  },

  modalHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },

  modalCloseIcon: {
    cursor: 'pointer',
    color: '#4B5563',
    fontSize: '24px',
    '&:hover': {
      color: '#374151',
    },
  },

  modalMessageText: {
    fontSize: '1em',
    fontWeight: 400,
    color: '#4B5563',
    lineHeight: 1.6,
    marginBottom: '32px',
  },

  modalConfirmButton: {
    color: 'white',
    background:
      'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
    width: '100%',
    borderRadius: '20px',
    fontSize: '0.9em',
    fontWeight: 500,
    textTransform: 'none' as const,
    padding: '12px 24px',
    boxShadow: '0 4px 12px rgba(255, 138, 0, 0.3)',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      background:
        'linear-gradient(to right, rgba(255, 138, 0, 0.9), rgba(245, 75, 2, 0.9))',
      boxShadow: '0 6px 16px rgba(255, 138, 0, 0.4)',
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(1px)',
      boxShadow: '0 2px 8px rgba(255, 138, 0, 0.3)',
    },
  },
};

export const classNames = {
  firstNameField: 'w-[95%]',
  lastNameField: 'w-full',
  emailField: 'w-full',
  messageField: 'w-[100%]',
};
