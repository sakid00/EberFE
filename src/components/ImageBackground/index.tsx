import React from 'react';
import { Box, BoxProps } from '@mui/material';
import Image, { StaticImageData } from 'next/image';

interface ImageBackgroundProps extends Omit<BoxProps, 'children'> {
  /** The background image source - can be a string URL or imported image */
  src: string | StaticImageData;
  /** Alt text for the background image */
  alt: string;
  /** Children components to be rendered on top of the background */
  children: React.ReactNode;
  /** Image object fit style */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /** Image object position */
  objectPosition?: string;
  /** Priority loading for the image */
  priority?: boolean;
  /** Image quality (1-100) */
  quality?: number;
  /** Whether to show overlay gradient */
  showOverlay?: boolean;
  /** Overlay gradient direction */
  overlayDirection?: 'top' | 'bottom' | 'left' | 'right';
  /** Overlay opacity (0-1) */
  overlayOpacity?: number;
  /** Custom overlay color */
  overlayColor?: string;
  /** Center children horizontally and vertically */
  centerChildren?: boolean;
  /** Content container flexbox properties */
  contentSx?: BoxProps['sx'];
}

export const ImageBackground: React.FC<ImageBackgroundProps> = ({
  src,
  alt,
  children,
  objectFit = 'cover',
  objectPosition = 'center',
  priority = false,
  quality = 75,
  showOverlay = false,
  overlayDirection = 'bottom',
  overlayOpacity = 0.5,
  overlayColor = '#000000',
  centerChildren = false,
  contentSx,
  sx,
  className,
  ...boxProps
}) => {
  const getOverlayGradient = () => {
    const color = `${overlayColor}${Math.round(overlayOpacity * 255)
      .toString(16)
      .padStart(2, '0')}`;
    const transparent = `${overlayColor}00`;

    switch (overlayDirection) {
      case 'top':
        return `linear-gradient(to bottom, ${color}, ${transparent})`;
      case 'bottom':
        return `linear-gradient(to top, ${color}, ${transparent})`;
      case 'left':
        return `linear-gradient(to right, ${color}, ${transparent})`;
      case 'right':
        return `linear-gradient(to left, ${color}, ${transparent})`;
      default:
        return `linear-gradient(to top, ${color}, ${transparent})`;
    }
  };

  return (
    <Box
      className={className}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        ...sx,
      }}
      {...boxProps}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{
            objectFit,
            objectPosition,
          }}
          priority={priority}
          quality={quality}
          sizes="100vw"
        />
      </Box>

      {/* Optional Overlay */}
      {showOverlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: getOverlayGradient(),
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: centerChildren ? 'center' : 'stretch',
          justifyContent: centerChildren ? 'center' : 'flex-start',
          ...contentSx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ImageBackground;
