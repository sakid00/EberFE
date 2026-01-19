import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';
import { SxProps, Theme } from '@mui/material';

// Style constants
const COLORS = {
  white: 'white',
  whiteOpaque: 'rgba(255, 255, 255, 0.7)',
  whiteBackground: 'rgba(255, 255, 255, 0.2)',
  whiteBackgroundHover: 'rgba(255, 255, 255, 0.25)',
  whiteBorder: 'rgba(255, 255, 255, 0.2)',
  primaryBlue: 'rgba(63, 81, 181, 0.1)',
  primaryBlueSelected: 'rgba(63, 81, 181, 0.2)',
  primaryBlueHover: 'rgba(63, 81, 181, 0.3)',
} as const;

const BORDER_RADIUS = {
  small: '4px',
  medium: '8px',
  large: '24px',
  round: '50%',
} as const;

const ANIMATION = {
  transition: 'all 0.3s ease-in-out',
} as const;

export const headerStyles = {
  header: {
    position: 'relative' as const,
  },
  headerAccessories: (deviceType: DeviceType) => ({
    position: 'absolute' as const,
    display: 'block',
    width: '100%',
    height: dynamicStylingValue(deviceType, '80%', '100%', '100%'),
    right: 0,
    top: '-30%',
    zIndex: 0,
  }),
  backgroundImage: (
    deviceType: DeviceType,
    isHomepage: boolean
  ): SxProps<Theme> => ({
    position: 'relative',
    width: deviceType === 'mobile' ? '100%' : '110%',
    maxWidth: 'unset',
    marginLeft: deviceType === 'mobile' ? '0' : '-5%',
    height: dynamicStylingValue(
      deviceType,
      isHomepage ? '120vw' : '65vh',
      isHomepage ? '50vw' : '50vh',
      isHomepage ? '50vw' : '50vh'
    ),
    minHeight: isHomepage && deviceType !== 'mobile' ? '650px' : '300px',
    maxHeight: '1000px',
    alignItems: 'start',
    overflow: 'hidden',
    zIndex: 0,
  }),
  backgroundImageContent: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: '5vh',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingX: '8vw',
  },
  logoContainer: {
    zIndex: 1,
  },
  // Navigation styles
  navigationButton: (isPathName: boolean): SxProps<Theme> => ({
    textTransform: 'none',
    color: isPathName ? COLORS.white : COLORS.whiteOpaque,
    fontWeight: isPathName ? '700' : '400',
    fontSize: '1rem',
    marginBottom: 0,
    minWidth: 'auto',
    padding: '8px 16px',
    borderRadius: BORDER_RADIUS.small,
    backgroundColor: 'transparent',
    border: 'none',
    transition: ANIMATION.transition,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
    },
  }),
  // Mobile navigation styles
  mobileMenuButton: {
    display: 'block',
    color: COLORS.white,
    borderRadius: BORDER_RADIUS.medium,
    padding: '10px',
    zIndex: 1000000,
    transition: ANIMATION.transition,
  },
  mobileBackdrop: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999998,
  },
  mobileSlideMenu: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '320px',
    height: '100vh',
    backgroundColor: 'white',
    zIndex: 999999,
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto' as const,
  },
  mobileMenuHeader: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: 'white',
  },
  mobileMenuLogoContainer: {
    flex: 1,
  },
  mobileMenuLogo: {
    width: '120px',
    height: 'auto',
  },
  mobileMenuHeaderRight: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: '12px',
  },
  mobileMenuNavigation: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '20px 0',
  },
  mobileMenuNavigationButton: (isActive: boolean): SxProps<Theme> => ({
    textTransform: 'none',
    color: isActive ? '#784791' : '#333',
    fontWeight: isActive ? '600' : '500',
    fontSize: '1rem',
    padding: '16px 24px',
    marginBottom: '4px',
    textAlign: 'left',
    justifyContent: 'flex-start',
    borderRadius: 0,
    backgroundColor: isActive ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
    borderLeft: isActive ? '4px solid #784791' : '4px solid transparent',
    transition: ANIMATION.transition,
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.04)',
    },
  }),
  mobileMenuSearchButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.round,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    transition: ANIMATION.transition,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
  // Language selector styles
  languageSelect: {
    backgroundColor: COLORS.whiteBackground,
    borderRadius: BORDER_RADIUS.large,
    width: '95px',
    maxWidth: '120px',
    height: 'auto',
    transition: ANIMATION.transition,
    '& .MuiSelect-select': {
      color: COLORS.white,
      textAlign: 'center',
      fontSize: '0.875rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: '0.5vh',
    },
    '& .MuiSelect-icon': {
      color: COLORS.white,
      right: '8px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.35)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
    },
    // Mobile menu specific styles
    '.mobile-menu &': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      '& .MuiSelect-select': {
        color: '#333',
      },
      '& .MuiSelect-icon': {
        color: '#666',
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
      },
    },
  },
  mobileLanguageSelect: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: BORDER_RADIUS.large,
    width: '80px',
    height: '32px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    transition: ANIMATION.transition,
    position: 'relative',
    zIndex: 1000000,
    '& .MuiSelect-select': {
      color: '#333',
      textAlign: 'center',
      fontSize: '0.75rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '6%',
      paddingBottom: '6%',
      paddingRight: '24px !important',
    },
    '& .MuiSelect-icon': {
      color: '#666',
      right: '8px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(0, 0, 0, 0.2)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
  customMobileLanguageSelect: {
    position: 'relative',
    display: 'inline-block',
    zIndex: 1000000,
  },
  customLanguageButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: BORDER_RADIUS.large,
    width: '80px',
    height: '32px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: ANIMATION.transition,
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#333',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(0, 0, 0, 0.2)',
    },
    '&:active': {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
  },
  customLanguageOption: (isSelected: boolean) => ({
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: isSelected ? '#1976d2' : '#333',
    backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
    transition: ANIMATION.transition,
    '&:hover': {
      backgroundColor: isSelected
        ? 'rgba(25, 118, 210, 0.12)'
        : 'rgba(0, 0, 0, 0.04)',
    },
    '&:active': {
      backgroundColor: isSelected
        ? 'rgba(25, 118, 210, 0.16)'
        : 'rgba(0, 0, 0, 0.08)',
    },
  }),
  customDropdownArrow: (isOpen: boolean) => ({
    marginLeft: '4px',
    fontSize: '12px',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
  }),
  customDropdownContainer: {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    zIndex: 10000001,
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    minWidth: '100px',
    overflow: 'hidden',
    marginTop: '4px',
  },
  languageSelectValue: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  flagImageStyle: {
    marginLeft: '8px',
    width: '1.5vw',
    height: 'auto',
  },
  mobileMenuFlagImageStyle: {
    marginLeft: '6px',
  },
  rightSectionContainer: {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: 8,
    alignItems: 'center',
  },
  mobileMenuButtonContainer: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  languageMenuItem: {
    transition: ANIMATION.transition,
    '&:hover': {
      backgroundColor: COLORS.primaryBlue,
    },
    '&.Mui-selected': {
      backgroundColor: COLORS.primaryBlueSelected,
      '&:hover': {
        backgroundColor: COLORS.primaryBlueHover,
      },
    },
  },
  languageMenuItemContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  // Search button styles
  searchButton: {
    backgroundColor: COLORS.whiteBackgroundHover,
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.round,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: ANIMATION.transition,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.35)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
    },
  },

  // Desktop navigation container
  desktopNavigationContainer: {
    display: 'flex',
    flexDirection: 'row' as const,
  },

  // Homepage content wrapper
  homepageContentWrapper: (isMobile: boolean): SxProps<Theme> => ({
    position: 'relative',
    flexDirection: isMobile ? 'column' : 'row',
    display: 'flex',
    alignItems: 'center',
    paddingX: isMobile ? '8vw' : '0',
    height: '100%',
    maxHeight: isMobile ? '90%' : '100%',
    maxWidth: isMobile ? '100%' : '90%',
  }),

  // Homepage title section
  homepageTitleSection: {
    position: 'relative',
    left: '10%',
    top: '-10%',
    maxWidth: '50%',
    zIndex: 1,
  },

  // Homepage buttons wrapper
  homepageButtonsWrapper: {
    display: 'flex',
    marginTop: '4%',
    gap: 2,
  },

  // Homepage image container
  homepageImageContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    position: 'relative',
    width: '100vw',
    height: '100%',
    maxWidth: '900px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  // Homepage modal box
  homepageModalBox: {
    position: 'relative',
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '3% 6% 3% 3%',
    borderRadius: '10px',
    top: '10%',
    left: '25%',
    borderBottomRightRadius: '100px',
  },

  // Homepage image wrapper
  homepageImageWrapper: {
    position: 'relative',
    zIndex: 1,
  },

  // Homepage description text
  homepageDescriptionText: {
    color: 'white',
    marginTop: '1%',
    maxWidth: '80%',
    fontSize: 'clamp(0.8em, 1vw, 1em)',
  },

  // Mobile homepage styles
  mobileHomepageContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    height: '100%',
  },

  mobileHomepageTitleSection: {
    position: 'relative',
    zIndex: 1,
    width: '100vw',
    display: 'flex',
    flexDirection: 'column' as const,
    top: '5%',
    gap: 1,
  },

  mobileHomepageContentSection: {
    position: 'relative',
    flex: 1,
    zIndex: 1,
    left: '2%',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    maxHeight: '1000px',
  },

  mobileHomepageImageWrapper: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
  },

  mobileHomepageModalBox: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '3%',
    marginRight: '2%',
    borderRadius: '10px',
    bottom: '65%',
    left: '52%',
    borderBottomRightRadius: '100px',
  },

  // About us image container
  aboutUsImageContainer: (deviceType: DeviceType): SxProps<Theme> => ({
    position: 'relative',
    width: dynamicStylingValue(deviceType, '100%', '50%', '70%'),
    height: dynamicStylingValue(deviceType, '70%', '90%', '100%'),
    top: dynamicStylingValue(deviceType, '0%', '10%', '10%'),
    left: dynamicStylingValue(deviceType, '5%', '50vw', '7%'),
    zIndex: 1,
  }),

  // About us page wrapper
  aboutUsPageWrapper: (isMobile: boolean): SxProps<Theme> => ({
    width: '100vw',
    position: 'relative',
    flexDirection: isMobile ? 'column' : 'row',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: '100vh',
    maxHeight: isMobile ? '90%' : '100%',
    maxWidth: '100%',
    paddingX: '5%',
  }),

  // About us content container
  aboutUsContentContainer: (deviceType: DeviceType): SxProps<Theme> => ({
    position: 'relative',
    alignSelf: 'center',
    width: dynamicStylingValue(deviceType, '100%', '50%', '50%'),
    bottom: dynamicStylingValue(deviceType, '0', '5%', '5%'),
    left: dynamicStylingValue(deviceType, '0', '5%', '5%'),
  }),

  // About us dual color text
  aboutUsDualColorText: (deviceType: DeviceType): SxProps<Theme> => ({
    justifyContent: dynamicStylingValue(deviceType, 'center', 'start', 'start'),
  }),

  // About us gradient title
  aboutUsGradientTitle: (deviceType: DeviceType): SxProps<Theme> => ({
    display: 'flex',
    background:
      'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    justifyContent: dynamicStylingValue(deviceType, 'center', 'start', 'start'),
  }),

  // About us download button
  aboutUsDownloadButton: {
    width: '30%',
    fontSize: '1em',
    color: 'white',
    background:
      'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
    padding: 2,
    borderRadius: 10,
    fontWeight: 600,
    textTransform: 'none',
    marginTop: '3vh',
    '&:hover': {
      background:
        'linear-gradient(to right, rgba(255, 138, 0, 0.9), rgba(245, 75, 2, 0.9))',
    },
  } as SxProps<Theme>,

  // Shared image style
  contentImageStyle: {
    objectFit: 'contain' as const,
  },
};

// About us description style (for inline style prop)
export const aboutUsDescriptionStyle = (
  deviceType: DeviceType,
  language: string
) => ({
  width: dynamicStylingValue(deviceType, '100%', '50%', '90%'),
  color: 'white',
  fontWeight: 400,
  marginTop: language === 'id' ? '4vh' : '1vh',
  fontSize: dynamicStylingValue(deviceType, '0.7em', '1em', '1.25em'),
  textAlign: dynamicStylingValue(deviceType, 'center', 'start', 'start') as
    | 'center'
    | 'start',
});

// About us font sizes
export const aboutUsFontSizes = {
  title: (deviceType: DeviceType) =>
    dynamicStylingValue(deviceType, '2.5rem', '4em', 'clamp(2em, 4vw, 5em)'),
  marginTop: (deviceType: DeviceType) =>
    dynamicStylingValue(deviceType, '-1vh', '-2vh', '-2vh'),
};
