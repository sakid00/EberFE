import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';

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
      margin: '16px 0 0 0',
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

  summaryContainer: (type: DeviceType) => ({
    display: 'flex',
    flexDirection: dynamicStylingValue(type, 'column', 'row', 'row'),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),

  jobInfoContainer: (type: DeviceType) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    width: dynamicStylingValue(type, '100%', '50%', '50%'),
    marginBottom: dynamicStylingValue(type, '8%', '0', '0'),
  }),

  openRolesText: (type: DeviceType) => ({
    fontSize: dynamicStylingValue(type, '0.8em', '1em', '1em'),
    fontWeight: 500,
    color: '#4B5563',
  }),

  jobTitleText: (type: DeviceType) => ({
    fontSize: dynamicStylingValue(type, '1em', '26px', '26px'),
    fontWeight: 800,
    color: '#030712',
    marginTop: '4%',
  }),

  jobStatusText: (type: DeviceType) => ({
    fontSize: dynamicStylingValue(type, '0.8em', '1em', '1em'),
    fontWeight: 500,
    color: '#4B5563',
    marginTop: dynamicStylingValue(type, '2%', '4%', '4%'),
  }),

  submitButton: (type: DeviceType) => ({
    color: 'white',
    width: dynamicStylingValue(type, '100%', '25%', '25%'),
    background:
      'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
    padding: '12px 24px',
    borderRadius: '50px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8em',
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
  }),

  detailsContainer: {
    display: 'flex',
    marginLeft: '1%',
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
    fontFamily: 'var(--font-plus-jakarta-sans)',
    '& *': {
      fontFamily: 'inherit',
      margin: 0,
      padding: 0,
    },
    '& p': {
      marginBottom: '8px',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit',
      color: 'inherit',
    },
    '& ul, & ol': {
      marginLeft: '16px',
      marginBottom: '8px',
      paddingLeft: '16px',
    },
    '& ul': {
      listStyleType: 'disc',
    },
    '& ol': {
      listStyleType: 'decimal',
    },
    '& li': {
      marginBottom: '4px',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit',
      color: 'inherit',
      display: 'list-item',
    },
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      fontWeight: 600,
      marginBottom: '8px',
      fontSize: 'inherit',
      color: 'inherit',
    },
    '& strong, & b': {
      fontWeight: 600,
      color: 'inherit',
    },
    '& em, & i': {
      fontStyle: 'italic',
      color: 'inherit',
    },
    '& br': {
      lineHeight: 'inherit',
    },
  },
};

export const getAccordionMarginTop = (index: number) => {
  return index !== 0 ? '16px' : '0px';
};
