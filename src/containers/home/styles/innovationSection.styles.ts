import {
  COLORS,
  dynamicStylingValue,
  DeviceType,
  SxProps,
  Theme,
} from './common';

// Innovation Section Styles
export const innovationSectionStyles = {
  container: {
    flexDirection: 'column',
    display: 'flex',
    position: 'relative',
    marginTop: '30%',
  } as SxProps<Theme>,

  imageContainer: (type: DeviceType) =>
    ({
      position: dynamicStylingValue(type, 'relative', 'absolute', 'absolute'),
      display: 'flex',
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
      width: dynamicStylingValue(type, '100%', '80%', '80%'),
      right: dynamicStylingValue(type, '-10%', '-15%', '-17%'),
      bottom: dynamicStylingValue(type, '0%', '20%', '20%'),
    }) as SxProps<Theme>,

  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
  } as SxProps<Theme>,

  contentLeft: (type: DeviceType) =>
    ({
      marginTop: 5,
      width: dynamicStylingValue(type, '100%', '25%', '25%'),
    }) as SxProps<Theme>,

  title: {
    fontSize: '2.25rem', // h4 equivalent
    fontWeight: 700,
    color: COLORS.text.primary,
  } as SxProps<Theme>,

  subtitle: {
    color: COLORS.text.primary,
    width: '35vw',
  } as SxProps<Theme>,

  description: (type: DeviceType) =>
    ({
      fontSize: dynamicStylingValue(type, '0.75rem', '1.1rem', '1.5rem'),
      fontWeight: 400,
      color: COLORS.text.secondary,
      textAlign: dynamicStylingValue(type, 'center', 'left', 'left'),
      marginTop: 2,
      width: dynamicStylingValue(type, '100%', '30vw', '30vw'),
    }) as SxProps<Theme>,

  spacer: {
    width: '20%',
    backgroundColor: 'blue',
  } as SxProps<Theme>,

  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1.5,
    marginTop: '10%',
  } as SxProps<Theme>,

  cardsContainerMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: 1,
  } as SxProps<Theme>,
};
