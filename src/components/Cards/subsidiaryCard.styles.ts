import { SxProps, Theme } from '@mui/material';
import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';

// SubsidiaryCard Styles
export const subsidiaryCardStyles = {
  container: (type: DeviceType) =>
    ({
      cursor: 'pointer',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
      },
    }) as SxProps<Theme>,

  imageContainer: (type: DeviceType) =>
    ({
      position: 'relative',
      width: '100%',
      height: dynamicStylingValue(type, '120px', '150px', '200px'),
      minHeight: dynamicStylingValue(type, '120px', '150px', '200px'),
      borderRadius: '10px',
      overflow: 'hidden',
    }) as SxProps<Theme>,

  title: (type: DeviceType) =>
    ({
      fontSize: dynamicStylingValue(type, '0.9em', '1.2em', '1.5em'),
      textAlign: 'left',
      fontWeight: 800,
      color: '#030712',
      alignSelf: 'flex-start',
      marginBottom: '8%',
      minHeight: '10%',

    }) as SxProps<Theme>,

  location: (type: DeviceType) =>
    ({
      color: '#784791',
      fontSize: dynamicStylingValue(type, '0.75em', '1em', '1em'),
      fontWeight: 400,
    }) as SxProps<Theme>,

  description: (type: DeviceType) =>
    ({
      fontSize: dynamicStylingValue(type, '0.75em', '0.8em', '1em'),
      textAlign: 'start',
      color: '#4B5563',
    }) as SxProps<Theme>,
};

// Container class names based on device type
export const getContainerClassName = (type: DeviceType, index: number) =>
  `flex flex-col justify-start items-start bg-white ${type === 'mobile' ? 'w-[100%]' : 'w-[30%] max-w-[600px]'} h-auto p-3 px-4 gap-2 rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`;

// Image styles
export const subsidiaryImageStyle = {
  objectFit: 'contain' as const,
};
