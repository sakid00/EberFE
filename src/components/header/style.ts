import { DeviceType, dynamicStylingValue } from '@/hooks/useDeviceType';
import { SxProps, Theme } from '@mui/material';

export const headerStyles = {
  header: {
    position: 'relative' as const,
  },
  headerAccessories: (deviceType: DeviceType, isHomepage: boolean) => ({
    position: 'absolute' as const,
    height: dynamicStylingValue(
      deviceType,
      '40vh',
      isHomepage ? '70vh' : '50vh',
      isHomepage ? '70vh' : '50vh'
    ),
    left: 0,
    top: 0,
    zIndex: 0,
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
      isHomepage ? '80vh' : '50vh'
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
    padding: { xs: '0 1em', md: '0 3em' },
    overflow: 'hidden',
  },
  logoContainer: {
    zIndex: 1,
  },
  navigationButton: (isPathName: boolean): SxProps<Theme> => ({
    textTransform: 'none',
    color: isPathName ? 'white' : 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    fontSize: { xs: '1rem', md: '1rem' },
    marginRight: { xs: 0, md: 4 },
    marginBottom: { xs: 0.5, md: 0 },
    minWidth: { xs: '140px', md: 'auto' },
    padding: { xs: '12px 20px', md: '8px 16px' },
    borderRadius: { xs: '8px', md: '4px' },
    backgroundColor: {
      xs: isPathName ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
      md: 'transparent',
    },
    border: {
      xs: `1px solid ${isPathName ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'}`,
      md: 'none',
    },
    '&:hover': {
      backgroundColor: {
        xs: 'rgba(255, 255, 255, 0.25)',
        md: 'rgba(255, 255, 255, 0.1)',
      },
      border: {
        xs: `1px solid ${isPathName ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)'}`,
        md: 'none',
      },
    },
  }),
  mobileMenuButton: {
    display: { xs: 'block', md: 'none' },
    color: 'white',
    borderRadius: '8px',
    padding: '10px',
    zIndex: 10000000,
  },
  mobileNavigation: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    display: 'block',
  },
  mobileNavigationContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '24px',
    gap: '20px',
    alignItems: 'center',
    minHeight: '200px',
  },
  mobileRightSection: {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: '20px',
    alignItems: 'center',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    width: '100%',
    justifyContent: 'center',
    paddingBottom: '8px',
  },
  languageSelect: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: '16px',
    width: { xs: '80px', md: '80px' },
    height: { xs: '36px', md: '40px' },
    border: '1px solid rgba(255, 255, 255, 0.3)',
    '& .MuiSelect-select': {
      color: 'white',
      textAlign: 'center',
      fontSize: { xs: '0.75rem', md: '0.875rem' },
      fontWeight: '500',
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
  },
  searchButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    width: { xs: 36, md: 40 },
    height: { xs: 36, md: 40 },
    borderRadius: '50%',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.35)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
    },
  },
};
