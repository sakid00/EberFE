export const styles = {
  accordion: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      margin: 0,
    },
    '&.MuiAccordion-root': {
      '&:first-of-type': {
        borderRadius: '16px',
      },
      '&:last-of-type': {
        borderRadius: '16px',
      },
    },
  },

  accordionSummary: {
    padding: '4%',
    minHeight: 'auto',
    '&.Mui-expanded': {
      minHeight: 'auto',
    },
    '& .MuiAccordionSummary-content': {
      margin: 0,
      '&.Mui-expanded': {
        margin: 0,
      },
    },
  },

  accordionDetails: {
    padding: '0 24px 24px 24px',
    paddingTop: 0,
  },

  summaryContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  jobInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  openRolesText: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#4B5563',
  },

  jobTitleText: {
    fontSize: '26px',
    fontWeight: 800,
    color: '#030712',
    marginTop: '4%',
  },

  jobStatusText: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#4B5563',
    marginTop: '4%',
  },

  submitButton: {
    color: 'white',
    background:
      'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
    padding: '12px 24px',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 500,
    textTransform: 'none',
    letterSpacing: '0.025em',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      opacity: 0.9,
      transform: 'translateY(-1px)',
    },
    '&:focus': {
      outline: '2px solid #1976d2',
      outlineOffset: '2px',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },

  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  sectionTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#4B5563',
    marginBottom: '1%',
  },

  sectionContent: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#4B5563',
    lineHeight: 1.6,
    whiteSpace: 'pre-line',
  },
};

export const getAccordionMarginTop = (index: number) => {
  return index !== 0 ? '16px' : '0px';
};
