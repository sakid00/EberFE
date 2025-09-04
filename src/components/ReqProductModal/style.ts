export const styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)', // For Safari support
  },

  modalBox: {
    width: '40%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: 'white',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: 'none',
    '@media (max-width: 768px)': {
      width: '90%',
      maxWidth: '90%',
    },
  },

  headerContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  headerText: {
    fontSize: '0.8em',
    fontWeight: 500,
    color: '#4B5563',
  },

  titleText: {
    fontSize: '1.8em',
    fontWeight: 800,
    color: '#4B5563',
    marginTop: '8px',
  },

  formRow: {
    display: 'flex',
    marginTop: '32px',
    gap: '16px',
  },

  fullWidthBox: {
    width: '100%',
    marginTop: '2%',
  },

  fieldContainer: {
    marginTop: '2%',
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
