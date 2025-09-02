import { DeviceType, dynamicStylingValue } from '@/hooks/useDeviceType';

export const styles = {
  container: (type: DeviceType) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    alignItems: 'center',
    height: '100%',
    zIndex: 1,
    marginTop: dynamicStylingValue(type, '5%', '0', '0'),
  }),

  imageStyle: {
    width: '80%',
    height: 'auto',
  },

  infoCard: {
    backgroundColor: 'white',
    width: 'fit-content',
    paddingY: '20px',
    paddingX: '40px',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },

  infoItemContainer: {
    display: 'flex',
    alignItems: 'start',
  },

  infoContent: {
    marginLeft: '12px',
  },

  infoTitle: {
    color: '#4B5563',
    fontSize: '14px',
    fontWeight: 400,
  },

  infoDescription: {
    color: '#030712',
    fontSize: '16px',
    fontWeight: 700,
    whiteSpace: 'pre-line',
  },
};

export const getInfoItemClassName = (index: number, totalItems: number) => {
  return `flex ${index !== totalItems - 1 ? 'mb-3' : 'mb-0'} items-start`;
};
