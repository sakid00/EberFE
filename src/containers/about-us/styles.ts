import { CSSProperties } from 'react';
import { SxProps, Theme } from '@mui/material';
import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';
import { Language } from '@/contexts/TranslationContext';

// HeaderSection Styles
export const headerStyles: {
  headerPhoto: (deviceType: DeviceType) => CSSProperties;
  headerContent: (deviceType: DeviceType) => SxProps<Theme>;
  backgroundText: SxProps<Theme>;
  description: (deviceType: DeviceType, language: Language) => CSSProperties;
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
    height: '10%',
    width: dynamicStylingValue(deviceType, '100vw', '50vw', '50vw'),
    top: dynamicStylingValue(deviceType, '2%', '5%', '5%'),
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
  description: (deviceType: DeviceType, language: Language) => ({
    paddingRight: dynamicStylingValue(deviceType, '10%', '0', '0'),
    paddingLeft: dynamicStylingValue(deviceType, '10%', '0', '0'),
    width: dynamicStylingValue(deviceType, '100%', '50%', '50%'),
    color: 'white',
    fontWeight: 500,
    marginTop: language === 'id' ? '4vh' : '2vh',
    fontSize: dynamicStylingValue(deviceType, '0.7em', '1em', '1em'),
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
  valuesGridCharacters: SxProps<Theme>;
  valuesGridMobile: SxProps<Theme>;
  mainContainerMobile: SxProps<Theme>;
  imageBackground: SxProps<Theme>;
  imageBackgroundMobile: SxProps<Theme>;
  contentSx: SxProps<Theme>;
  contentSxMobile: SxProps<Theme>;
  contentContainerMobile: SxProps<Theme>;
  imageContainerMobile: SxProps<Theme>;
  valuesContainer: SxProps<Theme>;
  valuesAndCharactersTitle: SxProps<Theme>;
  valuesAndCharactersTitleMobile: SxProps<Theme>;
  valuesContainerMobile: SxProps<Theme>;
  valuesGridCharactersMobile: SxProps<Theme>;
} = {
  valuesContainerMobile: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '5%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '3%',
    width: '80vw',
    maxWidth: '100vw',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
    boxSizing: 'border-box',
    marginBottom: '5%',
  },
  valuesContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '5%',
    top: '30%',
    position: 'absolute',
    zIndex: 100000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: '80%',
    padding: '2%',
  },
  valuesAndCharactersTitle: {
    marginY: '0.5%',
    marginLeft: '1%',
  },
  valuesAndCharactersTitleMobile: {
    marginY: '1%',
    marginLeft: '5%',
    alignSelf: 'flex-start',
    flexShrink: 0,
  },
  mainContainerMobile: {
    position: 'relative',
    marginTop: '20vh',
    width: '100vw',
  },
  imageBackground: {
    width: '100%',
    height: '80vh',
    position: 'relative',
    overflow: 'visible',
  },
  imageBackgroundMobile: {
    width: '100vw',
    height: '100vh',
    overflow: 'visible',
    marginTop: '30vh',
  },
  contentSx: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSxMobile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingX: '5%',
    marginBottom: '-20%',
    height: 'calc(100vh + 28vh)', // Extra height to allow child to extend
    minHeight: 0,
  },
  contentContainerMobile: {
    position: 'relative',
    bottom: '28vh',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    height: 'calc(100% + 28vh)', // Add extra height to compensate for bottom offset
    maxHeight: 'calc(100vh + 28vh)',
    overflow: 'hidden',
  },
  imageContainerMobile: {
    position: 'relative',
    zIndex: 1000,
    width: '100%',
    flex: '0 0 auto',
  },
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
  fieldPersonContainer: {
    position: 'absolute',
    width: '60%',
    height: '110%',
    bottom: '0vh',
    left: '-3%',
    zIndex: 20,
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    position: 'relative',
    gap: '1%',
    padding: '10px',
    zIndex: 100000,
    width: '100%',
  },
  valuesGridCharacters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    position: 'relative',
    gap: '1%',
    padding: '10px',
    zIndex: 100000,
    width: '100%',
  },
  valuesGridMobile: {
    width: '100%',
    maxWidth: '100%',
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
    gap: '8px',
    padding: '8px',
    justifyItems: 'stretch',
    alignItems: 'stretch',
    zIndex: 100000,
    boxSizing: 'border-box',
    flex: 1,
    minHeight: 0,
  },
  valuesGridCharactersMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
    position: 'relative',
    gap: '8px',
    padding: '8px',
    zIndex: 100000,
    width: '100%',
    maxWidth: '100%',
    justifyItems: 'stretch',
    alignItems: 'stretch',
    boxSizing: 'border-box',
    flex: 1,
    minHeight: 0,
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
  mainContainerMobile: SxProps<Theme>;
  imageBackgroundMobile: SxProps<Theme>;
  contentSxMobile: SxProps<Theme>;
  contentContainerMobile: SxProps<Theme>;
  imageContainerMobile: SxProps<Theme>;
} = {
  mainContainerMobile: {
    position: 'relative',
    marginTop: '25vh',
    width: '100vw',
  },
  imageBackgroundMobile: {
    width: '100vw',
    height: 'auto',
    overflow: 'visible',
  },
  contentSxMobile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingX: '5%',
    marginBottom: '-20%',
  },
  contentContainerMobile: {
    position: 'relative',
    bottom: '5vh',
  },
  imageContainerMobile: {
    position: 'relative',
    width: '100%',
    zIndex: 1000,
  },
  fieldPersonContainer: (type: DeviceType) => ({
    position: 'absolute',
    width: dynamicStylingValue(type, '85%', '40vw', '40vw'),
    height: dynamicStylingValue(type, '38%', '90%', '90%'),
    top: dynamicStylingValue(type, '4%', '10%', '10%'),
    left: dynamicStylingValue(type, '7%', '-2%', '-2%'),
    zIndex: 20,
  }),
  mainContainer: {
    background:
      'linear-gradient(145deg,rgba(19, 64, 91, 1) 21%, rgba(120, 71, 145, 1) 70%, rgba(221, 156, 54, 1) 100%)',
    zIndex: -1,
  },
  spacerBox: {
    width: '40vw',
    height: '50vh',
  },
  contentContainer: (type: DeviceType) =>
    ({
      display: 'flex',
      flexDirection: 'column',
      maxWidth: dynamicStylingValue(type, '100%', '35%', '35%'),
      padding: dynamicStylingValue(type, '10%', '0px', '0px'),
      borderRadius: dynamicStylingValue(type, '5%', '0px', '0px'),
      backgroundColor: dynamicStylingValue(
        type,
        'rgba(0, 0, 0, 0.2)',
        'transparent',
        'transparent'
      ),
      overflow: 'hidden',
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
  cardsContainerMobile: SxProps<Theme>;
  leftArrow: SxProps<Theme>;
  leftArrowMobile: SxProps<Theme>;
  rightArrow: SxProps<Theme>;
  rightArrowMobile: SxProps<Theme>;
} = {
  description: (deviceType: DeviceType) => ({
    width: dynamicStylingValue(deviceType, '100%', '60%', '60%'),
    marginTop: '20px',
  }),
  cardsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px',
    gap: '16px',
  },
  cardsContainerMobile: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '24px',
    px: 1,
  },
  leftArrow: {
    flexShrink: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    '&:hover': {
      backgroundColor: 'white',
      transform: 'scale(1.1)',
    },
    transition: 'all 0.2s ease',
  },
  leftArrowMobile: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    width: 36,
    height: 36,
    '&:active': {
      backgroundColor: 'white',
      transform: 'scale(0.95)',
    },
  },
  rightArrow: {
    flexShrink: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    '&:hover': {
      backgroundColor: 'white',
      transform: 'scale(1.1)',
    },
    transition: 'all 0.2s ease',
  },
  rightArrowMobile: {
    position: 'absolute',
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    width: 36,
    height: 36,
    '&:active': {
      backgroundColor: 'white',
      transform: 'scale(0.95)',
    },
  },
};
