'use client';
import React, { useState, useCallback } from 'react';
import { Box, BoxProps } from '@mui/material';
import Image, { StaticImageData } from 'next/image';

interface ProgressiveBackgroundImageProps extends Omit<BoxProps, 'children'> {
  /** The background image source (optional - if not provided, uses gradient) */
  src?: string | StaticImageData;
  /** Alt text for accessibility */
  alt?: string;
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
  /** Center children horizontally and vertically */
  centerChildren?: boolean;
  /** Content container flexbox properties */
  contentSx?: BoxProps['sx'];
  /** Custom gradient colors for background [start, middle, end] */
  gradientColors?: [string, string, string];
  /** Enable rounded bottom crop effect */
  roundedBottom?: boolean;
  /** Radius of the rounded bottom curve */
  roundedBottomRadius?: string;
  /** Custom gradient CSS (overrides gradientColors) */
  customGradient?: string;
  /** Placeholder color for image loading */
  placeholderColor?: string;
}

export const ProgressiveBackgroundImage: React.FC<
  ProgressiveBackgroundImageProps
> = ({
  src,
  alt = 'background',
  children,
  objectFit = 'cover',
  objectPosition = 'center',
  priority = false,
  quality = 75,
  centerChildren = false,
  contentSx,
  gradientColors = [
    'rgba(19, 64, 91, 1)',
    'rgba(120, 71, 145, 1)',
    'rgba(221, 156, 54, 1)',
  ],
  roundedBottom = false,
  roundedBottomRadius = '0 0 50% 50% / 0 0 100px 100px',
  customGradient,
  placeholderColor = '#e5e7eb',
  sx,
  className,
  ...boxProps
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // Generate gradient background - matches the design with dark blue flowing through purple to orange
  const defaultGradient = `
    linear-gradient(
      135deg,
      ${gradientColors[0]} 0%,
      ${gradientColors[1]} 85%,
      ${gradientColors[2]} 100%
    )
  `;

  const backgroundGradient = customGradient || defaultGradient;

  // Use image if src is provided, otherwise use gradient
  const useImage = !!src;

  return (
    <Box
      className={className}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        ...(roundedBottom && {
          borderRadius: roundedBottomRadius,
        }),
        ...sx,
      }}
      {...boxProps}
    >
      {/* Gradient Background (when no image provided) */}
      {!useImage && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: backgroundGradient,
            zIndex: 0,
          }}
        />
      )}

      {/* Image Background (when src is provided) */}
      {useImage && (
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
          {/* Loading placeholder */}
          {!imageLoaded && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(45deg, ${placeholderColor}15, ${placeholderColor}25)`,
              }}
            />
          )}

          {/* Actual Image */}
          <Image
            src={src}
            alt={alt}
            fill
            style={{
              objectFit,
              objectPosition,
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.6s ease-in-out',
            }}
            onLoad={handleLoad}
            priority={priority}
            quality={quality}
            sizes="100vw"
          />
        </Box>
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

export default ProgressiveBackgroundImage;
