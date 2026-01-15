import { CSSProperties } from 'react';
import { SxProps, Theme } from '@mui/material';
import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';
import { Language } from '@/contexts/TranslationContext';

// ValueSection Styles
export const valueStyles = {
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
  } as SxProps<Theme>,

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
  } as SxProps<Theme>,

  valuesAndCharactersTitle: {
    marginY: '0.5%',
    marginLeft: '1%',
  } as SxProps<Theme>,

  valuesAndCharactersTitleMobile: {
    marginY: '1%',
    marginLeft: '5%',
    alignSelf: 'flex-start',
    flexShrink: 0,
  } as SxProps<Theme>,

  mainContainerMobile: {
    position: 'relative',
    marginTop: '20vh',
    width: '100vw',
  } as SxProps<Theme>,

  imageBackground: {
    width: '100%',
    height: '80vh',
    position: 'relative',
    overflow: 'visible',
  } as SxProps<Theme>,

  imageBackgroundMobile: {
    width: '100vw',
    height: '100vh',
    overflow: 'visible',
    marginTop: '30vh',
  } as SxProps<Theme>,

  contentSx: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  } as SxProps<Theme>,

  // Desktop content sx for ImageBackground
  contentSxDesktop: (type: DeviceType): SxProps<Theme> => ({
    position: 'relative',
    marginTop: dynamicStylingValue(type, '20%', '0px', '0px'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingX: dynamicStylingValue(type, '5%', '0px', '0px'),
  }),

  contentSxMobile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingX: '5%',
    marginBottom: '-20%',
    height: 'calc(100vh + 28vh)',
    minHeight: 0,
  } as SxProps<Theme>,

  contentContainerMobile: {
    position: 'relative',
    bottom: '28vh',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    height: 'calc(100% + 28vh)',
    maxHeight: 'calc(100vh + 28vh)',
    overflow: 'hidden',
  } as SxProps<Theme>,

  imageContainerMobile: {
    position: 'relative',
    zIndex: 1000,
    width: '100%',
    flex: '0 0 auto',
  } as SxProps<Theme>,

  container: {
    position: 'relative',
    zIndex: 3,
  } as SxProps<Theme>,

  titleContainer: {
    position: 'relative',
    marginBottom: '10vh',
    zIndex: 3,
  } as SxProps<Theme>,

  // Title text center alignment
  titleTextCenter: {
    textAlign: 'center',
  } as SxProps<Theme>,

  backgroundImage: {
    width: '100vw',
    height: '100vh',
    marginTop: '10vh',
  } as SxProps<Theme>,

  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,

  mainShape: {
    transform: 'scale(0.5)',
    background:
      'linear-gradient(-145deg,rgba(19, 64, 91, 1) 21%, rgba(120, 71, 145, 1) 70%, rgba(221, 156, 54, 1) 100%)',
    overflow: 'visible',
    overflowClipMargin: 'content-box',
  } as SxProps<Theme>,

  fieldPersonContainer: {
    position: 'absolute',
    width: '60%',
    height: '110%',
    bottom: '0vh',
    left: '-3%',
    zIndex: 20,
  } as SxProps<Theme>,

  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    position: 'relative',
    gap: '1%',
    padding: '10px',
    zIndex: 100000,
    width: '100%',
  } as SxProps<Theme>,

  valuesGridCharacters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    position: 'relative',
    gap: '1%',
    padding: '10px',
    zIndex: 100000,
    width: '100%',
  } as SxProps<Theme>,

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
  } as SxProps<Theme>,

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
  } as SxProps<Theme>,

  // Mobile card wrapper for last odd item
  mobileCardWrapper: (isLastOdd: boolean): SxProps<Theme> => ({
    width: isLastOdd ? 'calc(50% - 4px)' : '100%',
    height: '100%',
    minHeight: 0,
    ...(isLastOdd && {
      gridColumn: '1 / -1',
      justifySelf: 'center',
    }),
  }),

  // Bottom site background container
  siteBgContainer: (type: DeviceType): SxProps<Theme> => ({
    position: 'absolute',
    bottom: '-45vh',
    right: dynamicStylingValue(type, '0', '-10vw', '-10vw'),
    zIndex: -1,
    width: dynamicStylingValue(type, '120vw', '100vw', '100vw'),
    height: 'auto',
  }),
};

// Image styles for ValueSection
export const valueImageStyles = {
  mobileChemPerson: {
    objectFit: 'fill' as const,
    width: '100%',
    height: '100%',
  },
  siteBg: {
    objectFit: 'fill' as const,
    width: '100%',
    height: '100%',
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
export const certificationStyles = {
  // Mobile download button
  mobileDownloadButton: {
    width: '100%',
    color: 'white',
    background:
      'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
    padding: 2,
    borderRadius: 10,
    fontWeight: 600,
    textTransform: 'none',
    marginTop: '4vh',
    zIndex: 1,
    '&:hover': {
      background:
        'linear-gradient(to right, rgba(255, 138, 0, 0.9), rgba(245, 75, 2, 0.9))',
    },
  } as SxProps<Theme>,

  description: (deviceType: DeviceType) => ({
    width: dynamicStylingValue(deviceType, '100%', '60%', '70%'),
    marginTop: '20px',
  }),

  cardsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px',
    gap: '16px',
  } as SxProps<Theme>,

  cardsContainerMobile: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '24px',
    px: 1,
  } as SxProps<Theme>,

  // Mobile cards overflow container
  mobileCardsOverflowContainer: (
    certificatesLength: number,
    visibleCards: number
  ): SxProps<Theme> => ({
    overflow: 'hidden',
    width: certificatesLength > visibleCards ? 'calc(100% - 80px)' : 'auto',
    mx: 'auto',
  }),

  // Mobile slider container
  mobileSliderContainer: (
    mobileIndex: number,
    cardWidth: number,
    gap: number
  ): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'row',
    gap: `${gap}px`,
    transform: `translateX(-${mobileIndex * (cardWidth + gap)}px)`,
    transition: 'transform 0.5s ease-in-out',
  }),

  // Desktop cards overflow container
  desktopCardsOverflowContainer: (
    certificatesLength: number,
    visibleCards: number,
    cardWidth: number,
    gap: number
  ): SxProps<Theme> => ({
    overflow: 'hidden',
    width:
      certificatesLength >= visibleCards
        ? `${visibleCards * cardWidth + (visibleCards - 1) * gap}px`
        : 'auto',
  }),

  // Desktop slider container
  desktopSliderContainer: (
    currentIndex: number,
    cardWidth: number,
    gap: number
  ): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'row',
    gap: `${gap}px`,
    transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
    transition: 'transform 0.5s ease-in-out',
  }),

  leftArrow: {
    flexShrink: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    '&:hover': {
      backgroundColor: 'white',
      transform: 'scale(1.1)',
    },
    transition: 'all 0.2s ease',
  } as SxProps<Theme>,

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
  } as SxProps<Theme>,

  rightArrow: {
    flexShrink: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    '&:hover': {
      backgroundColor: 'white',
      transform: 'scale(1.1)',
    },
    transition: 'all 0.2s ease',
  } as SxProps<Theme>,

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
  } as SxProps<Theme>,

  // Arrow icon styles
  arrowIconDesktop: {
    fontSize: 32,
    color: '#F54B02',
  },

  arrowIconMobile: {
    fontSize: 24,
    color: '#F54B02',
  },
};
