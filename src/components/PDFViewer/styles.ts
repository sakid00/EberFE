import { SxProps, Theme } from '@mui/material';

// Modal styles
export const modalStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0)',
    },
    '40%': {
      transform: 'translateY(-5px)',
    },
    '60%': {
      transform: 'translateY(-3px)',
    },
  },
};

// Container box styles
export const getContainerStyles = (isMobile: boolean): SxProps<Theme> => ({
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  position: 'relative',
  width: isMobile ? '100%' : '80%',
  height: isMobile ? '100%' : '90%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: isMobile ? 0 : 10,
});

// Close button styles
export const closeButtonStyles: SxProps<Theme> = {
  position: 'absolute',
  right: 8,
  top: 8,
  zIndex: 1000,
};

// Hidden document container
export const hiddenDocumentStyles: SxProps<Theme> = {
  display: 'none',
};

// Flipbook wrapper styles
export const flipbookWrapperStyles: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  overflow: 'visible',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};

// Navigation button base styles
const navButtonBaseStyles: SxProps<Theme> = {
  position: 'absolute',
  zIndex: 100,
  bgcolor: 'rgba(120, 71, 145, 0.9)',
  color: 'white',
  width: { xs: 40, sm: 48 },
  height: { xs: 40, sm: 48 },
  '&:hover': {
    bgcolor: 'rgba(120, 71, 145, 1)',
  },
  '&:disabled': {
    bgcolor: 'rgba(0, 0, 0, 0.2)',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
};

// Previous button styles
export const getPrevButtonStyles = (
  isVertical: boolean,
  isMobile: boolean
): SxProps<Theme> => ({
  ...navButtonBaseStyles,
  ...(isVertical
    ? {
        top: { xs: 8, sm: 16 },
        left: '50%',
        transform: 'translateX(-50%)',
      }
    : {
        left: {
          xs: '10%',
          sm: 16,
          md: 32,
        },
        top: isMobile ? '85%' : '50%',
        transform: 'translateY(-50%)',
      }),
});

// Next button styles
export const getNextButtonStyles = (
  isVertical: boolean,
  isMobile: boolean
): SxProps<Theme> => ({
  ...navButtonBaseStyles,
  ...(isVertical
    ? {
        bottom: { xs: 50, sm: 60 },
        left: '50%',
        transform: 'translateX(-50%)',
      }
    : {
        right: {
          xs: '10%',
          sm: 16,
          md: 32,
        },
        top: isMobile ? '85%' : '50%',
        transform: 'translateY(-50%)',
      }),
});

// Navigation icon styles
export const navIconStyles: SxProps<Theme> = {
  fontSize: { xs: 28, sm: 32 },
};

// Zoom controls container styles
export const getZoomControlsContainerStyles = (
  isMobile: boolean
): SxProps<Theme> => ({
  position: 'absolute',
  top: isMobile ? '5%' : { xs: 16, sm: 24 },
  right: isMobile ? '10%' : { xs: 16, sm: 24 },
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
  zIndex: 101,
});

// Zoom button styles
export const zoomButtonStyles: SxProps<Theme> = {
  bgcolor: 'rgba(120, 71, 145, 0.9)',
  color: 'white',
  width: { xs: 36, sm: 40 },
  height: { xs: 36, sm: 40 },
  '&:hover': {
    bgcolor: 'rgba(120, 71, 145, 1)',
  },
  '&:disabled': {
    bgcolor: 'rgba(0, 0, 0, 0.2)',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
};

// Zoom reset button styles (without disabled state)
export const zoomResetButtonStyles: SxProps<Theme> = {
  bgcolor: 'rgba(120, 71, 145, 0.9)',
  color: 'white',
  width: { xs: 36, sm: 40 },
  height: { xs: 36, sm: 40 },
  '&:hover': {
    bgcolor: 'rgba(120, 71, 145, 1)',
  },
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
};

// Zoom icon styles
export const zoomIconStyles: SxProps<Theme> = {
  fontSize: { xs: 20, sm: 24 },
};

// Horizontal flipbook container styles
export const getHorizontalFlipbookContainerStyles = (
  isMobile: boolean,
  zoom: number
): SxProps<Theme> => ({
  position: 'relative',
  overflow: 'hidden',
  touchAction: isMobile ? 'none' : 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: zoom > 1 ? 'move' : 'default',
});

// Horizontal flipbook transform wrapper styles
export const getHorizontalFlipbookTransformStyles = (
  zoom: number,
  position: { x: number; y: number }
): SxProps<Theme> => ({
  transition: zoom === 1 ? 'transform 0.2s ease-out' : 'none',
  transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
});

// Vertical viewer container styles
export const getVerticalViewerContainerStyles = (
  isMobile: boolean,
  zoom: number
): SxProps<Theme> => ({
  width: isMobile ? '95%' : '50%',
  height: isMobile ? '70%' : '80%',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 2,
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  cursor: zoom > 1 ? 'move' : 'grab',
  userSelect: 'none',
  perspective: '1000px',
  touchAction: 'none',
  '&:active': {
    cursor: zoom > 1 ? 'move' : 'grabbing',
  },
});

// Vertical viewer transform wrapper styles
export const getVerticalViewerTransformStyles = (
  isMobile: boolean,
  isFlipping: boolean,
  flipDirection: 'up' | 'down' | null,
  zoom: number,
  position: { x: number; y: number }
): SxProps<Theme> => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
  transition: isMobile
    ? 'none'
    : isFlipping
      ? 'transform 0.3s ease-in-out'
      : zoom === 1
        ? 'transform 0.2s ease-out'
        : 'none',
  transform: isMobile
    ? `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`
    : isFlipping
      ? flipDirection === 'down'
        ? 'rotateX(-15deg)'
        : 'rotateX(15deg)'
      : `rotateX(0deg) scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
  transformOrigin: flipDirection === 'down' ? 'top center' : 'bottom center',
});

// Loading/status text styles
export const statusTextStyles: SxProps<Theme> = {
  textAlign: 'center',
};

// Error text styles
export const errorTextStyles: SxProps<Theme> = {
  textAlign: 'center',
  color: 'red',
};

// Page indicator styles
export const pageIndicatorStyles: SxProps<Theme> = {
  position: 'absolute',
  bottom: { xs: 8, sm: 16 },
  left: '50%',
  transform: 'translateX(-50%)',
  bgcolor: 'rgba(120, 71, 145, 0.9)',
  color: 'white',
  px: 2,
  py: 0.5,
  borderRadius: 2,
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
};

// PDF page inline styles (for use with style prop, not sx)
export const pdfPageStyles: React.CSSProperties = {
  position: 'relative',
  cursor: 'default',
  pointerEvents: 'none',
};

// PDF page image inline styles
export const pdfPageImageStyles: React.CSSProperties = {
  objectFit: 'contain',
  cursor: 'default',
  pointerEvents: 'none',
};

// Vertical viewer image inline styles
export const verticalViewerImageStyles: React.CSSProperties = {
  objectFit: 'contain',
  background: 'white',
};

