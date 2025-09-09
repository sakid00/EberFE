import { Language } from '../../contexts/TranslationContext';
import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';
import { SxProps, Theme } from '@mui/material';

// Common color constants
export const COLORS = {
  primary: {
    orange: 'rgba(255, 138, 0, 1)',
    red: 'rgba(245, 75, 2, 1)',
    gradient:
      'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
  },
  text: {
    primary: '#030712',
    secondary: '#4B5563',
    light: '#D6CBE3',
    white: 'white',
  },
  background: {
    customGradient:
      'linear-gradient(145deg,rgba(19, 64, 91, 1) 21%, rgba(120, 71, 145, 1) 70%, rgba(221, 156, 54, 1) 100%)',
    transparent: 'transparent',
  },
  border: {
    purple: '#786C95',
  },
} as const;

// Header Section Styles
export const headerSectionStyles = {
  headerAccessories: (deviceType: DeviceType) => ({
    position: 'absolute' as const,
    height: dynamicStylingValue(deviceType, '40vh', '80vh', '80vh'),
    right: '10%',
    left: 0,
    top: 0,
    zIndex: 1,
  }),

  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10vh',
  } as SxProps<Theme>,

  leftSide: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: 0,
    bottom: 0,
    zIndex: 1,
  } as SxProps<Theme>,

  title: {
    marginTop: '-2vh',
    color: COLORS.text.white,
  } as SxProps<Theme>,

  description: (language: Language, type: DeviceType) =>
    ({
      fontSize: dynamicStylingValue(type, '0.8em', '0.95em', '0.95em'),
      width: dynamicStylingValue(
        type,
        '100%',
        language === 'en' ? '25%' : '32%',
        language === 'en' ? '25%' : '32%'
      ),
      paddingX: dynamicStylingValue(type, '1em', '0px', '0px'),
      color: dynamicStylingValue(
        type,
        COLORS.text.secondary,
        COLORS.text.white,
        COLORS.text.white
      ),
      textAlign: dynamicStylingValue(type, 'center', 'start', 'start'),
    }) as SxProps<Theme>,

  buttonsWrapper: (type: DeviceType) =>
    ({
      display: 'flex',
      flexDirection: dynamicStylingValue(type, 'column', 'row', 'row'),
      paddingX: dynamicStylingValue(type, '1em', '0px', '0px'),
      gap: 2,
      marginTop: 4,
      marginBottom: dynamicStylingValue(type, '10vh', '0px', '0px'),
    }) as SxProps<Theme>,

  primaryButton: {
    color: COLORS.text.white,
    background: COLORS.primary.gradient,
    padding: 2,
    borderRadius: 10,
    fontWeight: 600,
    textTransform: 'none',
  } as SxProps<Theme>,

  secondaryButton: (type: DeviceType) =>
    ({
      color: dynamicStylingValue(
        type,
        '#784791',
        COLORS.text.white,
        COLORS.text.white
      ),
      background: dynamicStylingValue(
        type,
        'white',
        COLORS.background.transparent,
        COLORS.background.transparent
      ),
      padding: 2,
      borderRadius: 10,
      fontWeight: 600,
      borderColor: COLORS.border.purple,
      borderWidth: 1,
      textTransform: 'none',
    }) as SxProps<Theme>,
};

// Specialty Section Styles
export const specialtySectionStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,

  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,

  title: {
    color: COLORS.text.primary,
  } as SxProps<Theme>,

  description: (type: DeviceType) =>
    ({
      width: dynamicStylingValue(type, '100%', '70%', '70%'),
      marginTop: '2vh',
      textAlign: 'center',
      fontSize: dynamicStylingValue(type, '0.75em', '1em', '1em'),
      color: COLORS.text.secondary,
    }) as SxProps<Theme>,

  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1.5,
    marginTop: 5,
  } as SxProps<Theme>,

  cardsContainerMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: 1,
    marginTop: 5,
  } as SxProps<Theme>,
};

// Custom Product Section Styles
export const customProductSectionStyles = {
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // Enable container queries for responsive positioning
    containerType: 'inline-size',
    containerName: 'custom-product-section',
  } as SxProps<Theme>,

  imageContainerTransform: (type: DeviceType) =>
    ({
      position: 'absolute',
      width: dynamicStylingValue(type, '100vw', '40vw', '40vw'),
      top: dynamicStylingValue(type, '36%', '12%', '12%'),
      left: dynamicStylingValue(type, '38%', '38%', '37%'),
      transform: dynamicStylingValue(
        type,
        'translate(-40%, -58%)',
        'translate(-70%, -50%)',
        'translate(-78%, -10%)'
      ),
      zIndex: 20,
      willChange: 'transform',
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
    width: '40%',
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
  } as SxProps<Theme>,

  contentContainer: (type: DeviceType) =>
    ({
      display: 'flex',
      flexDirection: 'column',
      maxWidth: dynamicStylingValue(type, '100%', '35%', '35%'),
      width: dynamicStylingValue(type, '100%', '35%', '35%'),
      padding: dynamicStylingValue(type, '1em', '0px', '0px'),
      borderRadius: dynamicStylingValue(type, '5%', '0px', '0px'),
      backgroundColor: dynamicStylingValue(
        type,
        'rgba(0, 0, 0, 0.2)',
        'transparent',
        'transparent'
      ),
      overflow: 'hidden',
      wordWrap: 'break-word',
      boxSizing: 'border-box',
    }) as SxProps<Theme>,

  title: {
    fontWeight: 700,
    color: COLORS.text.white,
  } as SxProps<Theme>,

  description: (type: DeviceType) =>
    ({
      color: COLORS.text.light,
      fontSize: dynamicStylingValue(type, '0.9em', '1em', '1em'),
      fontWeight: 400,
      marginTop: '20px',
    }) as SxProps<Theme>,

  button: (type: DeviceType) =>
    ({
      color: COLORS.text.white,
      background: COLORS.primary.gradient,
      paddingY: 2,
      paddingX: 1,
      borderRadius: 10,
      fontWeight: 600,
      width: dynamicStylingValue(type, '100%', '35%', '35%'),
      height: '8%',
      fontSize: '14px',
      marginTop: 2,
      textTransform: 'none',
    }) as SxProps<Theme>,
};

// Subsidiaries Section Styles
export const subsidiariesSectionStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20vh',
  } as SxProps<Theme>,

  titleContainer: {
    // Add any specific title container styles here
  } as SxProps<Theme>,

  title: {
    fontSize: '2.25rem', // h4 equivalent
    fontWeight: 700,
    color: COLORS.text.primary,
  } as SxProps<Theme>,

  description: (type: DeviceType) =>
    ({
      width: dynamicStylingValue(type, '100%', '80%', '80%'),
      marginTop: '2vh',
      textAlign: 'center',
      color: COLORS.text.secondary,
    }) as SxProps<Theme>,

  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1.5,
    marginTop: 5,
  } as SxProps<Theme>,

  cardsContainerMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: 1,
    marginTop: 5,
  } as SxProps<Theme>,
};

// Innovation Section Styles
export const innovationSectionStyles = {
  container: {
    position: 'relative',
    marginTop: '30%',
  } as SxProps<Theme>,

  imageContainer: (type: DeviceType) =>
    ({
      position: dynamicStylingValue(type, 'relative', 'absolute', 'absolute'),
      width: dynamicStylingValue(type, '100%', '70vw', '70vw'),
      top: '-40%',
      left: dynamicStylingValue(type, '10%', '25%', '25%'),
    }) as SxProps<Theme>,

  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
  } as SxProps<Theme>,

  contentLeft: (type: DeviceType) =>
    ({
      marginTop: 5,
      width: dynamicStylingValue(type, '100%', '25%', '25%'),
    }) as SxProps<Theme>,

  title: {
    fontSize: '2.25rem', // h4 equivalent
    fontWeight: 700,
    color: COLORS.text.primary,
  } as SxProps<Theme>,

  subtitle: {
    color: COLORS.text.primary,
    width: '23vw',
  } as SxProps<Theme>,

  description: (type: DeviceType) =>
    ({
      fontSize: dynamicStylingValue(type, '0.9em', '1em', '1em'),
      fontWeight: 400,
      color: COLORS.text.secondary,
      textAlign: dynamicStylingValue(type, 'center', 'left', 'left'),
      marginTop: 2,
    }) as SxProps<Theme>,

  spacer: {
    width: '80%',
  } as SxProps<Theme>,

  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1.5,
    marginTop: '10%',
  } as SxProps<Theme>,

  cardsContainerMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: 1,
  } as SxProps<Theme>,
};

// Common animation classes (these will be used with className)
export const animationClasses = {
  onScroll: 'animate-on-scroll',
  fadeIn: 'animate-fade-in',
  slideLeft: 'animate-slide-left',
  slideRight: 'animate-slide-right',
  scale: 'animate-scale',
  stagger: 'animate-stagger',
  visible: 'animate-visible',
} as const;

// Common utility classes
export const utilityClasses = {
  clipCustomShape: 'clip-custom-shape',
  tangkiGradientOverlay: 'tangki-gradient-overlay',
} as const;
