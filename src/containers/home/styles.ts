import { DeviceType, dynamicStylingValue } from '@/hooks/useDeviceType';
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
    height: '50vh',
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
    marginTop: '-3vh',
    color: COLORS.text.white,
  } as SxProps<Theme>,

  description: {
    width: '25%',
    marginTop: '20px',
    color: COLORS.text.white,
  } as SxProps<Theme>,

  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    marginTop: 4,
  } as SxProps<Theme>,

  primaryButton: {
    color: COLORS.text.white,
    background: COLORS.primary.gradient,
    padding: 2,
    borderRadius: 10,
    fontWeight: 600,
    textTransform: 'none',
  } as SxProps<Theme>,

  secondaryButton: {
    color: COLORS.text.white,
    background: COLORS.background.transparent,
    padding: 2,
    borderRadius: 10,
    fontWeight: 600,
    borderColor: COLORS.border.purple,
    borderWidth: 1,
    textTransform: 'none',
  } as SxProps<Theme>,
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

  description: {
    width: '70%',
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '18px',
    color: COLORS.text.secondary,
  } as SxProps<Theme>,

  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1.5,
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
  } as SxProps<Theme>,

  imageContainer: {
    position: 'absolute',
    top: '22%',
    left: '-4%',
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
    width: 600,
    height: 509,
    display: 'flex',
    justifyContent: 'center',
  } as SxProps<Theme>,

  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '35%',
  } as SxProps<Theme>,

  title: {
    fontSize: '1.875rem', // h3 equivalent
    fontWeight: 700,
    color: COLORS.text.white,
  } as SxProps<Theme>,

  description: {
    color: COLORS.text.light,
    fontSize: '16px',
    fontWeight: 400,
    marginTop: '20px',
  } as SxProps<Theme>,

  button: {
    color: COLORS.text.white,
    background: COLORS.primary.gradient,
    paddingY: 2,
    paddingX: 1,
    borderRadius: 10,
    fontWeight: 600,
    width: '35%',
    height: '8%',
    fontSize: '14px',
    marginTop: 4,
    textTransform: 'none',
  } as SxProps<Theme>,
};

// Subsidiaries Section Styles
export const subsidiariesSectionStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  } as SxProps<Theme>,

  titleContainer: {
    // Add any specific title container styles here
  } as SxProps<Theme>,

  title: {
    fontSize: '2.25rem', // h4 equivalent
    fontWeight: 700,
    color: COLORS.text.primary,
  } as SxProps<Theme>,

  description: {
    width: '50%',
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '18px',
    color: COLORS.text.secondary,
  } as SxProps<Theme>,

  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1.5,
    marginTop: 5,
  } as SxProps<Theme>,
};

// Innovation Section Styles
export const innovationSectionStyles = {
  container: {
    position: 'relative',
    marginTop: 20,
  } as SxProps<Theme>,

  imageContainer: {
    position: 'absolute',
    width: '70vw',
    top: '-23%',
    left: '35%',
  } as SxProps<Theme>,

  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
  } as SxProps<Theme>,

  contentLeft: {
    marginTop: 5,
    width: '25%',
  } as SxProps<Theme>,

  title: {
    fontSize: '2.25rem', // h4 equivalent
    fontWeight: 700,
    color: COLORS.text.primary,
  } as SxProps<Theme>,

  subtitle: {
    color: COLORS.text.primary,
    width: '23vw',
  } as SxProps<Theme>,

  description: {
    fontSize: '16px',
    fontWeight: 400,
    color: COLORS.text.secondary,
    textAlign: 'left',
    marginTop: 2,
  } as SxProps<Theme>,

  spacer: {
    width: '80%',
  } as SxProps<Theme>,

  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1.5,
    marginTop: 5,
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
