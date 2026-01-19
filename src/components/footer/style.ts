import { DeviceType } from '../../hooks';
import { dynamicStylingValue } from '../../hooks/useDeviceType';
import { SxProps, Theme } from '@mui/material';

export const footerStyles = {
  // Footer wrapper style
  footerWrapper: {
    position: 'relative' as const,
    overflowY: 'visible' as const,
  },

  container: (type: DeviceType) =>
    ({
      backgroundImage: `url(/background/bg_footer.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      paddingTop: dynamicStylingValue(type, '20vh', '10vh', '10vh'),
    }) as SxProps<Theme>,

  // About us page background (mobile)
  aboutUsBgContainer: {
    position: 'absolute',
    bottom: '100%',
    right: 0,
    zIndex: -1,
    width: '100%',
    height: '90%',
  } as SxProps<Theme>,

  // Background footer image container
  bgFooterContainer: (type: DeviceType) =>
    ({
      position: 'absolute',
      top: 'var(--bg-top, -25vh)',
      right: 'var(--bg-right, -10vw)',
      bottom: 0,
      zIndex: 10,
      minWidth: dynamicStylingValue(type, '40%', '10vw', '10vw'),
      maxWidth: dynamicStylingValue(type, '100%', '40vw', '40vw'),
    }) as SxProps<Theme>,

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

  dividerContainer: (deviceType: DeviceType) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: dynamicStylingValue(deviceType, '-5%', '0', '0'),
  }),

  verticalDivider: {
    marginX: 2,
    backgroundColor: '#8F92A7',
    borderRadius: 10,
    height: 80,
    width: 4,
  } as SxProps<Theme>,

  descriptionText: (deviceType: DeviceType) =>
    ({
      fontSize: dynamicStylingValue(deviceType, '0.75em', '1rem', '0.9rem'),
      fontWeight: 400,
      color: '#F9FAFB',
      whiteSpace: 'pre-line',
    }) as SxProps<Theme>,

  infoSection: (deviceType: DeviceType) => ({
    display: 'flex',
    flexDirection: dynamicStylingValue(deviceType, 'column', 'row', 'row'),
    marginY: 4,
    width: dynamicStylingValue(deviceType, '100%', '70%', '100%'),
    gap: 8,
  }),

  sectionTitle: (deviceType: DeviceType) =>
    ({
      fontSize: dynamicStylingValue(deviceType, '1rem', '1.25rem', '1.25rem'),
      fontWeight: 700,
      color: 'white',
    }) as SxProps<Theme>,

  contactText: (deviceType: DeviceType) =>
    ({
      marginLeft: 1,
      fontSize: dynamicStylingValue(deviceType, '0.75rem', '1rem', '1rem'),
      fontWeight: 400,
      color: '#F9FAFB',
      whiteSpace: 'pre-line',
    }) as SxProps<Theme>,

  subsidiaryText: (deviceType: DeviceType) =>
    ({
      marginLeft: 1,
      fontSize: dynamicStylingValue(deviceType, '0.75rem', '1rem', '1rem'),
      fontWeight: 400,
      color: '#F9FAFB',
    }) as SxProps<Theme>,

  horizontalDivider: {
    marginTop: '5vh',
    marginBottom: '2vh',
    backgroundColor: '#8F92A7',
    borderRadius: 10,
    height: 1,
    width: '100%',
    maxWidth: '100vw',
  } as SxProps<Theme>,

  copyrightIcon: {
    width: '0.8em',
    height: '0.8em',
    color: 'white',
  } as SxProps<Theme>,

  copyrightText: {
    fontSize: '0.8rem',
    fontWeight: 400,
    color: 'white',
    marginLeft: 0.5,
  } as SxProps<Theme>,
};

// Image styles (for next/image style prop)
export const footerImageStyles = {
  locationIcon: {
    alignSelf: 'start' as const,
  },
  aboutUsBgImage: {
    objectFit: 'fill' as const,
    width: '100%',
    height: '100%',
  },
  bgFooterImage: {
    objectFit: 'contain' as const,
  },
};
