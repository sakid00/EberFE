import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';

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
    maxWidth: dynamicStylingValue(type, '100%', '50%', '50%'),
  }),
};
