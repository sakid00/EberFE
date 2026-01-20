import { SxProps, Theme } from '@mui/material';
import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';

// ValueCard Styles
export const valueCardStyles = {
  container: (isMobile: boolean, containerHeight: string): SxProps<Theme> => ({
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    width: '100%',
    height: isMobile ? '100%' : containerHeight,
    minHeight: 0,
    minWidth: 0,
    overflow: 'hidden',
    boxSizing: 'border-box',
  }),

  imageContainer: (isMobile: boolean): SxProps<Theme> => ({
    flex: isMobile ? '1 1 60%' : '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 0,
    width: '100%',
    overflow: 'hidden',
  }),

  title: (type: DeviceType, isMobile: boolean): SxProps<Theme> => ({
    flex: isMobile ? '0 0 auto' : '0 0 auto',
    lineHeight: 1.2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: isMobile ? 'nowrap' : 'normal',
  }),

  // Font size helper
  titleFontSize: (type: DeviceType) =>
    dynamicStylingValue(
      type,
      'clamp(0.5rem, 1.6vw, 0.8rem)',
      '10px',
      '15px'
    ),
};

// Container class name helper
export const getContainerClassName = (type: DeviceType, index: number) =>
  `flex flex-col justify-center items-center ${type === 'mobile' ? 'p-2 py-5' : 'p-5'} gap-1 rounded-xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`;

// Image styles
export const valueCardImageStyle = (isMobile: boolean) => ({
  width: isMobile ? '50%' : '40%',
  height: 'auto',
  maxHeight: '100%',
  objectFit: 'contain' as const,
});
