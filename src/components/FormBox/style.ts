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
    marginTop: '32px',
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
};

export const classNames = {
  firstNameField: 'w-[95%]',
  lastNameField: 'w-full',
  emailField: 'w-full',
  messageField: 'w-[100%]',
};
