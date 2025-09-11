import { CSSProperties } from 'react';
import { SxProps, Theme } from '@mui/material';
import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';

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
    color: 'white',
    fontWeight: 500,
    marginTop: dynamicStylingValue(deviceType, '1vh', '4vh', '4vh'),
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
  fieldPersonContainer: (type: DeviceType) => SxProps<Theme>;
  valuesGrid: SxProps<Theme>;
  valuesGridMobile: SxProps<Theme>;
} = {
  container: {
    position: 'relative',
    zIndex: 3,
  },
  titleContainer: {
    position: 'relative',
    marginBottom: '10vh',
    zIndex: 3,
  },
  backgroundImage: {
    width: '100vw',
    height: '100vh',
    marginTop: '10vh',
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
  fieldPersonContainer: (type: DeviceType) => ({
    position: 'absolute',
    width: dynamicStylingValue(type, '100%', '60%', '58%'),
    height: dynamicStylingValue(type, '30%', '90%', '90%'),
    bottom: dynamicStylingValue(type, '53.5%', '17%', '17%'),
    left: dynamicStylingValue(type, '5%', '-2%', '-2%'),
    zIndex: 1000,
  }),
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    position: 'relative',
    gap: '5px',
    padding: '10px',
    zIndex: 100000,
  },
  valuesGridMobile: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(5, 1fr)',
    gap: '8px',
    padding: '10px',
    justifyItems: 'center',
    alignItems: 'center',
    zIndex: 100000,
  },
};

// PrincipleSection Styles
export const principleStyles: {
  fieldPersonContainer: (type: DeviceType) => SxProps<Theme>;
  mainContainer: CSSProperties;
  spacerBox: SxProps<Theme>;
  contentContainer: (type: DeviceType) => SxProps<Theme>;
  backgroundText: (type: DeviceType) => SxProps<Theme>;
  backgroundTextWhite: (type: DeviceType) => SxProps<Theme>;
  visionTitle: SxProps<Theme>;
  visionDescription: SxProps<Theme>;
  missionTitle: SxProps<Theme>;
  missionDescription: SxProps<Theme>;
} = {
  fieldPersonContainer: (type: DeviceType) => ({
    position: 'absolute',
    width: dynamicStylingValue(type, '85%', '55%', '55%'),
    height: dynamicStylingValue(type, '45%', '90%', '90%'),
    top: dynamicStylingValue(type, '-3%', '10%', '10%'),
    left: dynamicStylingValue(type, '7%', '-2%', '-2%'),
    zIndex: 20,
  }),
  mainContainer: {
    background:
      'linear-gradient(145deg,rgba(19, 64, 91, 1) 21%, rgba(120, 71, 145, 1) 70%, rgba(221, 156, 54, 1) 100%)',
    zIndex: -1,
  },
  spacerBox: {
    width: 600,
    height: 509,
  },
  contentContainer: (type: DeviceType) =>
    ({
      display: 'flex',
      flexDirection: 'column',
      maxWidth: dynamicStylingValue(type, '100%', '35%', '35%'),
      padding: dynamicStylingValue(type, '1em', '0px', '0px'),
      borderRadius: dynamicStylingValue(type, '5%', '0px', '0px'),
      backgroundColor: dynamicStylingValue(
        type,
        'rgba(0, 0, 0, 0.2)',
        'transparent',
        'transparent'
      ),
    }) as SxProps<Theme>,
  backgroundText: (type: DeviceType) => ({
    background:
      'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: dynamicStylingValue(type, '1.5em', '3em', '3em'),
    fontWeight: 700,
    lineHeight: '1.2',
  }),
  backgroundTextWhite: (type: DeviceType) => ({
    color: 'white',
    fontSize: dynamicStylingValue(type, '1.5em', '3em', '3em'),
    fontWeight: 700,
    lineHeight: '1.2',
  }),
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
