import {
  COLORS,
  dynamicStylingValue,
  DeviceType,
  SxProps,
  Theme,
} from './common';

// Custom Product Section Styles
export const customProductSectionStyles = {
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    containerType: 'inline-size',
    containerName: 'custom-product-section',
  } as SxProps<Theme>,

  imageContainerTransform: (type: DeviceType) => ({
    position: 'relative',
    width: dynamicStylingValue(type, '45%', '60%', '45%'),
    alignSelf: 'flex-end',
    justifySelf: 'flex-start',
    zIndex: 20,
    marginLeft: '-2%',
  }) as SxProps<Theme>,

  mainContainer: {
    position: 'relative',
    display: 'flex',
    width: '100vw',
    height: '90vh',
    flexDirection: 'row',
    gap: 2,
    marginTop: 10,
    background: COLORS.background.customGradient,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  } as SxProps<Theme>,

  spacer: {
    width: '40vw',
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
  } as SxProps<Theme>,

  contentContainer: (type: DeviceType) =>
    ({
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '60%',
      width: dynamicStylingValue(type, '55%', '45%', '55%'),
      overflow: 'hidden',
      wordWrap: 'break-word',
      boxSizing: 'border-box',
      marginLeft: '5%',
    }) as SxProps<Theme>,

  title: {
    color: COLORS.text.white,
  } as SxProps<Theme>,

  titleMobileSecondText: {
    background:
      'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    whiteSpace: 'nowrap',
  } as SxProps<Theme>,

  description: (type: DeviceType) => ({
    color: COLORS.text.light,
    fontSize: dynamicStylingValue(type, '0.75rem', '0.9rem', '0.75rem'),
    fontWeight: 400,
    marginTop: '20px',
  }),

  button: (type: DeviceType) =>
    ({
      color: COLORS.text.white,
      background: COLORS.primary.gradient,
      paddingY: 1.5,
      paddingX: 4,
      borderRadius: 10,
      fontWeight: 600,
      fontSize: dynamicStylingValue(type, '1rem', '0.7rem', '0.9rem'),
      marginTop: dynamicStylingValue(type, '15%', '5%', '5%'),
      width: type === 'mobile' ? '100%' : 'auto',
      textTransform: 'none',
    }) as SxProps<Theme>,

  mainContainerMobile: {
    display: 'flex',
    width: '100vw',
    position: 'relative',
    marginTop: '25vh',
  },
  imageBackgroundMobile: {
    width: '100vw',
    height: 'auto',
    overflow: 'visible',
  },
  contentSxMobile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingX: '5%',
  },
  contentContainerMobile: {
    position: 'relative',
    bottom: '3%',
  },
  imageContainerMobile: {
    position: 'relative',
    zIndex: 1000,
    width: '100%',
  },
  innerContentContainerMobile: {
    padding: '10%',
    borderRadius: '1em',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },

  // Desktop background image styles
  progressiveBackgroundSx: {
    position: 'relative',
    width: '100vw',
    height: '70vh',
    marginTop: '20vh',
    overflowY: 'clip',
    overflowX: 'visible',
  } as SxProps<Theme>,

  progressiveBackgroundContentSx: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'visible',
    paddingRight: '3%',
  } as SxProps<Theme>,
};

// Animation classes (re-exported from common for convenience)
export { animationClasses } from './common';

// Image styles for the field person image
export const fieldPersonImageStyles = {
  desktop: {
    objectFit: 'contain' as const,
    maxWidth: '100%',
    minWidth: '20%',
    height: 'auto',
  },
  mobile: {
    objectFit: 'fill' as const,
    width: '100%',
    height: '100%',
  },
};
