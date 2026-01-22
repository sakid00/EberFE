import { CSSProperties } from 'react';

export const styles = {
  imageStyle: {
    top: '3vw',
    left: '4vw',
    width: '40vw',
    minwidth: '20%',
    height: 'auto',
    zIndex: -1000,
    position: 'relative' as const,
    marginTop: '-10vw',
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
    right: '6%',
    marginTop: '-30vh',
    marginBottom: '-15vw',
  } as CSSProperties,
};
