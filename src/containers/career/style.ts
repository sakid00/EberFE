import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';

export const styles = {
  mainContainer: (type: DeviceType) => ({
    display: 'flex',
    flexDirection: dynamicStylingValue(type, 'column', 'row', 'row'),
    zIndex: 1,
    alignItems: 'stretch',
    gap: '1%',
    marginTop: dynamicStylingValue(type, '-60vh', '-20vh', '-20vh'),
  }),

  infoCard: (type: DeviceType) => ({
    backgroundColor: 'white',
    maxWidth: dynamicStylingValue(type, '100%', '25%', '25%'),
    height: '10%',
    borderRadius: '12px',
    paddingY: '40px',
    paddingX: '20px',
    zIndex: 1,
    boxShadow:
      '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    marginBottom: dynamicStylingValue(type, '2vh', '0px', '0px'),
  }),

  rolesTitle: {
    fontWeight: 700,
    background:
      'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  descriptionText: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#4B5563',
    marginTop: '16px',
    lineHeight: 1.6,
  },

  contactLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#4B5563',
    marginTop: '16px',
  },

  contactEmail: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#030712',
    marginTop: '4px',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
  },

  accordionContainer: {
    width: '100%',
    flex: 1,
  },
};
