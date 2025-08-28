export const styles = {
  modalBox: {
    position: 'absolute' as const,
    width: '40%',
    top: '20%',
    left: '30%',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: 'white',
  },

  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    fontSize: '1em',
    fontWeight: 500,
    color: '#4B5563',
  },

  closeIcon: {
    cursor: 'pointer',
    color: '#4B5563',
  },

  descriptionText: {
    fontSize: '0.8em',
    fontWeight: 400,
    color: '#4B5563',
    marginTop: '8px',
  },

  formRow: {
    display: 'flex',
    marginTop: '32px',
    gap: '16px',
  },

  halfWidthBox: {
    width: '50%',
  },

  fieldContainer: {
    marginTop: '20px',
  },

  inputLabel: {
    marginBottom: 1,
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
    marginTop: 3,
    width: '100%',
    borderRadius: '20px',
    fontSize: '0.8em',
    fontWeight: 400,
    textTransform: 'none' as const,
    padding: '10px 20px',
    '&:hover': {
      background:
        'linear-gradient(to right, rgba(255, 138, 0, 0.9), rgba(245, 75, 2, 0.9))',
    },
  },
};

export const classNames = {
  firstNameField: 'w-[95%]',
  lastNameField: 'w-full',
  emailField: 'w-full',
  messageField: 'w-[100%]',
};
