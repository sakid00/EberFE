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

  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },

  closeIcon: {
    cursor: 'pointer',
    color: '#4B5563',
    fontSize: '24px',
    '&:hover': {
      color: '#374151',
    },
  },

  messageText: {
    fontSize: '1em',
    fontWeight: 400,
    color: '#4B5563',
    lineHeight: 1.6,
    marginBottom: '32px',
  },

  confirmButton: {
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

  // Add success icon styling for future enhancements
  successIcon: {
    fontSize: '48px',
    color: '#10B981',
    marginBottom: '16px',
    display: 'block',
    textAlign: 'center' as const,
  },
};
