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
  headerAccessories: (deviceType: DeviceType, isHomepage: boolean) => ({
    position: 'absolute' as const,
    display: 'block',
    width: '100%',
    height: dynamicStylingValue(
      deviceType,
      '80%',
      isHomepage ? '100%' : '60vh',
      isHomepage ? '80vh' : '60vh'
    ),
    right: 0,
    top: '-30%',
    zIndex: 0,
    objectFit: isHomepage ? ('contain' as const) : ('fill' as const),
  }),
  backgroundImage: (
    deviceType: DeviceType,
    isHomepage: boolean
  ): SxProps<Theme> => ({
    width: '100%',
    height: dynamicStylingValue(
      deviceType,
      '80vh',
      isHomepage ? '80vh' : '50vh',
      isHomepage ? '90vh' : '50vh'
    ),
    alignItems: 'start',
    overflow: 'hidden',
    zIndex: 0,
  }),
  backgroundImageContent: {
    alignItems: 'start',
    justifyContent: 'center',
    paddingTop: '5vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    padding: '0 3em',
    overflow: 'hidden',
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
    marginRight: 4,
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
    width: '110px',
    height: '40px',
    transition: ANIMATION.transition,
    '& .MuiSelect-select': {
      color: COLORS.white,
      textAlign: 'center',
      fontSize: '0.875rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '6%',
      paddingBottom: '6%',
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
};
