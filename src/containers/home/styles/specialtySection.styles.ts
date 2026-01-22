import { COLORS, dynamicStylingValue, DeviceType, SxProps, Theme } from './common';

// Specialty Section Styles
export const specialtySectionStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingY: '10vh',
    gap: 3,
  } as SxProps<Theme>,

  titleContainer: {
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,

  title: {
    color: COLORS.text.primary,
  } as SxProps<Theme>,

  description: (type: DeviceType) =>
    ({
      width: dynamicStylingValue(type, '100%', '70%', '90%'),
      maxWidth: '2000px',
      marginTop: '2vh',
      textAlign: 'center',
      fontSize: dynamicStylingValue(type, '0.75rem', '1.5rem', '1.5rem'),
      color: COLORS.text.secondary,
    }) as SxProps<Theme>,

  cardsContainer: {
    width: '100vw',
    maxWidth: '2000px',
    maxHeight: '80vh',
    paddingX: '10%',
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
