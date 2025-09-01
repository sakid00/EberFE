import { DeviceType } from '@/hooks';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { SxProps, Theme } from '@mui/material';

export const footerStyles = {
  container: {
    backgroundImage: `url(/background/bg_footer.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } as SxProps<Theme>,

  headerSection: (deviceType: DeviceType) => ({
    display: 'flex',
    flexDirection: dynamicStylingValue(deviceType, 'column', 'row', 'row'),
    alignItems: dynamicStylingValue(deviceType, 'start', 'center', 'center'),
    width: '100%',
  }),

  logo: (deviceType: DeviceType) => ({
    width: dynamicStylingValue(deviceType, '40%', '20%', '10%'),
    height: 'auto',
    marginBottom: dynamicStylingValue(deviceType, '5%', '0', '0'),
  }),

  dividerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  verticalDivider: {
    marginX: 2,
    backgroundColor: '#8F92A7',
    borderRadius: 10,
    height: 80,
    width: 4,
  } as SxProps<Theme>,

  descriptionText: (deviceType: DeviceType) =>
    ({
      fontSize: dynamicStylingValue(deviceType, '0.6em', '0.8em', '0.8em'),
      fontWeight: 400,
      color: '#8F92A7',
      whiteSpace: 'pre-line',
    }) as SxProps<Theme>,

  infoSection: (deviceType: DeviceType) => ({
    display: 'flex',
    flexDirection: dynamicStylingValue(deviceType, 'column', 'row', 'row'),
    marginY: 4,
    width: dynamicStylingValue(deviceType, '100%', '70%', '50%'),
    gap: 8,
  }),

  sectionTitle: {
    fontSize: '1em',
    fontWeight: 700,
    color: 'white',
  } as SxProps<Theme>,

  contactText: {
    marginLeft: 1,
    fontSize: '0.8em',
    fontWeight: 400,
    color: '#8F92A7',
    whiteSpace: 'pre-line',
  } as SxProps<Theme>,

  subsidiaryText: {
    marginLeft: 1,
    fontSize: '0.8em',
    fontWeight: 400,
    color: '#8F92A7',
  } as SxProps<Theme>,

  horizontalDivider: {
    marginTop: '5vh',
    marginBottom: '2vh',
    backgroundColor: '#8F92A7',
    borderRadius: 10,
    height: 1,
    width: '80%',
    maxWidth: '80vw',
  } as SxProps<Theme>,

  copyrightIcon: {
    width: '0.8em',
    height: '0.8em',
  } as SxProps<Theme>,

  copyrightText: {
    fontSize: '0.8em',
    fontWeight: 400,
    color: 'white',
    marginLeft: 0.5,
  } as SxProps<Theme>,
};
