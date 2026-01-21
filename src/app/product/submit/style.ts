import { CSSProperties } from 'react';

export const styles = {
  imageStyle: {
    top: '2vw',
    maxWidth: '100vw',
    width: '25vw',
    minwidth: '20%',
    height: 'auto',
    zIndex: -1000,
    position: 'relative' as const,
  },
  imageStyleMobile: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    maxWidth: '90vw',
    alignSelf: 'center',
    marginTop: '-30vh',
    marginBottom: '-15vw',
  } as CSSProperties,
};
