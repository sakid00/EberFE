import { SxProps, Theme } from '@mui/material';
import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';

// TopProductsCard Styles
export const topProductsCardStyles = {
  imageContainer: (type: DeviceType) =>
    ({
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: dynamicStylingValue(type, '60%', '80%', '40%'),
      height: dynamicStylingValue(type, '25%', '40%', '40%'),
    }) as SxProps<Theme>,

  contentContainer: (type: DeviceType) =>
    ({
      position: 'relative',
      width: '100%',
      height: dynamicStylingValue(type, '100%', '60%', '100%'),
      display: 'flex',
      justifyContent: dynamicStylingValue(type, 'flex-start', 'center', 'center'),
      alignItems: 'center',
      flexDirection: 'column',
      gap: '15%',
    }) as SxProps<Theme>,

  productText: (type: DeviceType) =>
    ({
      paddingY: '5%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: dynamicStylingValue(type, '0.5em', '0.85em', '1em'),
      fontWeight: 400,
      color: '#4B5563',
      textAlign: 'center',
    }) as SxProps<Theme>,
};

// Container class names based on device type
export const getTopProductsCardClassName = (type: DeviceType, index: number) => {
  const sizeClass = dynamicStylingValue(type, 'w-[100%]', 'w-[28%]', 'w-[28%]');
  const paddingClass = type === 'mobile' ? 'py-5 px-1' : 'py-6 px-6';
  return `flex flex-col justify-center items-center bg-white ${sizeClass} ${paddingClass} gap-2 rounded-2xl shadow-lg z-10 animate-stagger animate-delay-${(index + 1) * 100}`;
};

// Image styles
export const topProductsImageStyle = {
  objectFit: 'contain' as const,
};
