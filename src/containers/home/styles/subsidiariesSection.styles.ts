import { COLORS, dynamicStylingValue, DeviceType, SxProps, Theme } from './common';

// Subsidiaries Section Styles
export const subsidiariesSectionStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20vh',
  } as SxProps<Theme>,

  titleContainer: {
    // Add any specific title container styles here
  } as SxProps<Theme>,

  title: {
    fontSize: '2.25rem', // h4 equivalent
    fontWeight: 700,
    color: COLORS.text.primary,
  } as SxProps<Theme>,

  description: (type: DeviceType) =>
    ({
      width: dynamicStylingValue(type, '100%', '80%', '80%'),
      marginTop: '2vh',
      textAlign: 'center',
      color: COLORS.text.secondary,
    }) as SxProps<Theme>,

  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1.5,
    marginTop: 5,
  } as SxProps<Theme>,

  cardsContainerMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: 1,
    marginTop: 5,
  } as SxProps<Theme>,
};
