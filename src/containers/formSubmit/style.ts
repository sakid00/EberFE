import { DeviceType, dynamicStylingValue } from '@/hooks/useDeviceType';

export const styles = {
  containerBox: (type: DeviceType) => ({
    display: 'flex',
    flexDirection: dynamicStylingValue(type, 'column', 'row', 'row'),
    alignItems: 'end',
    justifyContent: 'center',
    marginTop: '-20vh',
  }),
  formBoxStyle: (type: DeviceType) => ({
    marginRight: dynamicStylingValue(type, '0', '2%', '2%'),
    zIndex: 1000,
    width: dynamicStylingValue(type, '100vw', '50vw', '50vw'),
    maxWidth: dynamicStylingValue(type, '100%', '80%', '80%'),
  }),
  imageStyle: {
    zIndex: -1000,
    position: 'absolute' as const,
    width: '45%',
    height: '70%',
    right: '5vw',
    top: '20vh',
  },
};
