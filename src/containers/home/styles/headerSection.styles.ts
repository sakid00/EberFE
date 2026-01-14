import { Language } from '../../../contexts/TranslationContext';
import { COLORS, dynamicStylingValue, DeviceType, SxProps, Theme } from './common';

// Header Section Styles
export const headerSectionStyles = {
  headerAccessories: (deviceType: DeviceType) => ({
    position: 'absolute' as const,
    height: dynamicStylingValue(deviceType, '40vh', '80vh', '80vh'),
    right: '10%',
    left: 0,
    top: 0,
    zIndex: 1,
  }),

  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10vh',
  } as SxProps<Theme>,

  leftSide: {
    height: '10%',
    width: '50vw',
    top: '3.5%',
    left: '10%',
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 1,
  } as SxProps<Theme>,

  title: {
    width: '90%',
    marginTop: '-2%',
    color: COLORS.text.white,
  } as SxProps<Theme>,

  titleMobile: {
    width: '90%',
    marginTop: '-6%',
    color: COLORS.text.white,
  } as SxProps<Theme>,

  description: (language: Language, type: DeviceType) =>
    ({
      fontSize: dynamicStylingValue(type, '0.9em', '0.95em', '0.95em'),
      width: dynamicStylingValue(
        type,
        '100%',
        language === 'en' ? '25%' : '32%',
        '50%'
      ),
      paddingX: dynamicStylingValue(type, '1em', '0px', '0px'),
      color: dynamicStylingValue(
        type,
        COLORS.text.secondary,
        COLORS.text.white,
        COLORS.text.white
      ),
      textAlign: dynamicStylingValue(type, 'center', 'start', 'start'),
    }) as SxProps<Theme>,

  buttonsWrapper: (type: DeviceType) =>
    ({
      display: 'flex',
      flexDirection: dynamicStylingValue(type, 'column', 'row', 'row'),
      paddingX: dynamicStylingValue(type, '1em', '0px', '0px'),
      gap: 2,
      marginTop: 4,
      marginBottom: dynamicStylingValue(type, '10vh', '0px', '0px'),
    }) as SxProps<Theme>,

  primaryButton: {
    fontSize: '1em',
    color: COLORS.text.white,
    background: COLORS.primary.gradient,
    padding: 2,
    borderRadius: 10,
    fontWeight: 600,
    textTransform: 'none',
  } as SxProps<Theme>,

  secondaryButton: (type: DeviceType) =>
    ({
      fontSize: '1em',
      color: dynamicStylingValue(
        type,
        '#784791',
        COLORS.text.white,
        COLORS.text.white
      ),
      background: dynamicStylingValue(
        type,
        'white',
        COLORS.background.transparent,
        COLORS.background.transparent
      ),
      padding: 2,
      borderRadius: 10,
      fontWeight: 600,
      borderColor: COLORS.border.purple,
      borderWidth: 1,
      textTransform: 'none',
    }) as SxProps<Theme>,
};
