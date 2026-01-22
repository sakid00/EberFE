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
    width: '115vw',
    maxWidth: '115vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    alignSelf: 'center',
    marginTop: '-35vh',
    marginBottom: '-20vw',
    left: '0%',
  } as CSSProperties,
};
