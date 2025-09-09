import { DeviceType } from '@/hooks';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { SxProps, Theme } from '@mui/material';

export const notFoundStyles = {
  container: (type: DeviceType) =>
    ({
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      paddingY: '20vh',
      backgroundColor: 'white',
      borderRadius: '12px',
      marginTop: dynamicStylingValue(type, '-60vh', '-20vh', '-20vh'),
      marginBottom: '20vh',
    }) as SxProps<Theme>,

  image: {
    width: '30%',
    height: 'auto',
  },

  title: {
    fontSize: '2rem',
    fontWeight: 600,
    color: '#030712',
    marginBottom: '1rem',
  } as SxProps<Theme>,

  description: {
    fontSize: '1rem',
    marginBottom: '2rem',
    color: '#4B5563',
    maxWidth: '500px',
    lineHeight: 1.6,
  } as SxProps<Theme>,

  button: {
    backgroundColor: '#784791',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#6a3d7a',
    },
  } as SxProps<Theme>,
};
