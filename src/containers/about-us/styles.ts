import { CSSProperties } from 'react';
import { SxProps, Theme } from '@mui/material';
import { DeviceType, dynamicStylingValue } from '@/hooks/useDeviceType';

// HeaderSection Styles
export const headerStyles: {
  headerPhoto: (deviceType: DeviceType) => CSSProperties;
  headerContent: (deviceType: DeviceType) => SxProps<Theme>;
  backgroundText: SxProps<Theme>;
  description: (deviceType: DeviceType) => CSSProperties;
} = {
  headerPhoto: (deviceType: DeviceType) => ({
    position: 'absolute' as const,
    width: dynamicStylingValue(deviceType, '80vw', '50vw', '50vw'),
    height: dynamicStylingValue(deviceType, '40vh', '80vh', '80vh'),
    right: 0,
    top: dynamicStylingValue(deviceType, '42vh', '10vh', '10vh'),
    zIndex: 1,
  }),
  headerContent: (deviceType: DeviceType) => ({
    position: 'absolute',
    top: '20%',
    left: dynamicStylingValue(deviceType, '0%', '10%', '10%'),
    right: 0,
    bottom: 0,
    zIndex: 1,
    textAlign: dynamicStylingValue(deviceType, 'center', 'start', 'start') as
      | 'center'
      | 'start',
  }),
  backgroundText: {
    background:
      'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  description: (deviceType: DeviceType) => ({
    paddingRight: dynamicStylingValue(deviceType, '10%', '0', '0'),
    paddingLeft: dynamicStylingValue(deviceType, '10%', '0', '0'),
    width: dynamicStylingValue(deviceType, '100%', '25%', '25%'),
    marginTop: '4vh',
    fontSize: dynamicStylingValue(deviceType, '0.8em', '1em', '1em'),
    textAlign: dynamicStylingValue(deviceType, 'center', 'start', 'start') as
      | 'center'
      | 'start',
  }),
};

// ValueSection Styles
export const valueStyles: {
  container: SxProps<Theme>;
  titleContainer: SxProps<Theme>;
  backgroundImage: SxProps<Theme>;
  contentContainer: SxProps<Theme>;
  mainShape: SxProps<Theme>;
  fieldPersonContainer: SxProps<Theme>;
  valuesGrid: SxProps<Theme>;
} = {
  container: {
    position: 'relative',
    zIndex: 3,
  },
  titleContainer: {
    position: 'relative',
    zIndex: 3,
  },
  backgroundImage: {
    width: '100vw',
    height: '100vh',
    marginBottom: '-10vh',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainShape: {
    transform: 'scale(0.5)',
    background:
      'linear-gradient(-145deg,rgba(19, 64, 91, 1) 21%, rgba(120, 71, 145, 1) 70%, rgba(221, 156, 54, 1) 100%)',
    overflow: 'visible',
    overflowClipMargin: 'content-box',
  },
  fieldPersonContainer: {
    position: 'absolute',
    bottom: 20,
    left: -20,
    zIndex: 0,
  },
  valuesGrid: {
    position: 'relative',
    zIndex: 100000,
  },
};

// PrincipleSection Styles
export const principleStyles: {
  fieldPersonContainer: SxProps<Theme>;
  mainContainer: CSSProperties;
  spacerBox: SxProps<Theme>;
  contentContainer: SxProps<Theme>;
  backgroundText: SxProps<Theme>;
  visionTitle: SxProps<Theme>;
  visionDescription: SxProps<Theme>;
  missionTitle: SxProps<Theme>;
  missionDescription: SxProps<Theme>;
} = {
  fieldPersonContainer: {
    position: 'absolute',
    top: '16%',
    left: '-2%',
  },
  mainContainer: {
    background:
      'linear-gradient(145deg,rgba(19, 64, 91, 1) 21%, rgba(120, 71, 145, 1) 70%, rgba(221, 156, 54, 1) 100%)',
    zIndex: -1,
  },
  spacerBox: {
    width: 600,
    height: 509,
  },
  contentContainer: {
    maxWidth: '35%',
  },
  backgroundText: {
    background:
      'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  visionTitle: {
    marginTop: '10px',
  },
  visionDescription: {
    marginTop: '5px',
  },
  missionTitle: {
    marginTop: '10px',
  },
  missionDescription: {
    marginTop: '5px',
  },
};

// CorporateSection Styles
export const corporateStyles: {
  description: (deviceType: DeviceType) => React.CSSProperties;
  cardsContainer: SxProps<Theme>;
} = {
  description: (deviceType: DeviceType) => ({
    width: dynamicStylingValue(deviceType, '100%', '80%', '80%'),
    marginTop: '2%',
  }),
  cardsContainer: {
    marginTop: '40px',
  },
};

// CertificationSection Styles
export const certificationStyles: {
  description: (deviceType: DeviceType) => React.CSSProperties;
  cardsContainer: SxProps<Theme>;
} = {
  description: (deviceType: DeviceType) => ({
    width: dynamicStylingValue(deviceType, '100%', '60%', '60%'),
    marginTop: '20px',
  }),
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    marginTop: '40px',
  },
};
