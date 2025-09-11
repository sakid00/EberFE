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
};

export const classNames = {
  firstNameField: 'w-[95%]',
  lastNameField: 'w-full',
  emailField: 'w-full',
  messageField: 'w-[100%]',
};
