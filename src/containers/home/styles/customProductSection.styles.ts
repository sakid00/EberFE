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

  imageContainerTransform: {
    position: 'absolute',
    width: '55%',
    height: '70vh',
    top: '2%',
    left: '-3%',
    zIndex: 20,
  } as SxProps<Theme>,

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

  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '60%',
    width: '45%',
    overflow: 'hidden',
    wordWrap: 'break-word',
    boxSizing: 'border-box',
    marginLeft: '5%',
  } as SxProps<Theme>,

  title: {
    fontWeight: 700,
    color: COLORS.text.white,
  } as SxProps<Theme>,

  description: {
    color: COLORS.text.light,
    fontSize: '1rem',
    fontWeight: 400,
    marginTop: '20px',
  },

  button: (type: DeviceType) =>
    ({
      color: COLORS.text.white,
      background: COLORS.primary.gradient,
      paddingY: 2,
      paddingX: 1,
      borderRadius: 10,
      fontWeight: 600,
      width: dynamicStylingValue(type, '100%', '35%', '40%'),
      height: '8%',
      fontSize: '14px',
      marginTop: '5%',
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
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingX: '5%',
    marginBottom: '-20%',
  },
  contentContainerMobile: {
    position: 'relative',
    bottom: '15vh',
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
    overflow: 'clip',
  } as SxProps<Theme>,

  progressiveBackgroundContentSx: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    paddingX: '5%',
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
