import { COLORS, dynamicStylingValue, DeviceType, SxProps, Theme } from './common';

// Top Product Section Styles
export const topProductSectionStyles = {
  imageBackground: (type: DeviceType) =>
    ({
      width: '100%',
      height: dynamicStylingValue(type, '35vh', '35vh', '40vh'),
      maxHeight: dynamicStylingValue(type, '250px', '500px', '500px'),
      position: 'relative',
      overflow: 'visible',
    }) as SxProps<Theme>,

  contentContainer: (type: DeviceType) =>
    ({
      position: 'relative',
      marginTop: dynamicStylingValue(type, '10%', '15%', '5%'),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingX: dynamicStylingValue(type, '5%', '0px', '0px'),
    }) as SxProps<Theme>,

  description: (type: DeviceType) =>
    ({
      fontSize: dynamicStylingValue(type, '0.75em', '0.875em', '1em'),
      fontWeight: 400,
      color: COLORS.text.white,
      textAlign: 'center',
      width: dynamicStylingValue(type, '100%', '65%', '60%'),
      marginTop: '2%',
    }) as SxProps<Theme>,

  cardsContainer: (type: DeviceType) =>
    ({
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      gap: '2%',
      width: dynamicStylingValue(type, '100%', '90%', '90%'),
      height: dynamicStylingValue(type, '50vh', '50vh', '50vh'),
      top: dynamicStylingValue(type, '10%', '5%', '10%'),
      justifyContent: 'center',
      alignItems: 'center',
    }) as SxProps<Theme>,
};

// Title styling values (separate for DualColorText component props)
export const getTitleFontSize = (type: DeviceType) =>
  dynamicStylingValue(type, '1.5em', '2.5em', '3em');
