import { COLORS, dynamicStylingValue, DeviceType, SxProps, Theme } from './common';

// Innovation Section Styles
export const innovationSectionStyles = {
  container: {
    position: 'relative',
    marginTop: '30%',
  } as SxProps<Theme>,

  imageContainer: (type: DeviceType) =>
    ({
      position: dynamicStylingValue(type, 'relative', 'absolute', 'absolute'),
      width: dynamicStylingValue(type, '100%', '70vw', '70vw'),
      top: '-10vw',
      left: dynamicStylingValue(type, '10%', '25%', '25vw'),
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
    width: '23vw',
  } as SxProps<Theme>,

  description: (type: DeviceType) =>
    ({
      fontSize: '1.1rem',
      fontWeight: 400,
      color: COLORS.text.secondary,
      textAlign: dynamicStylingValue(type, 'center', 'left', 'left'),
      marginTop: 2,
    }) as SxProps<Theme>,

  spacer: {
    width: '80%',
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
