'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Box, BoxProps } from '@mui/material';
import Image, { StaticImageData } from 'next/image';

interface ProgressiveBackgroundImageProps extends Omit<BoxProps, 'children'> {
  /** The background image source */
  src: string | StaticImageData;
  /** Low quality placeholder image (base64 or small image) */
  placeholder?: string;
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
  /** Blur placeholder color */
  placeholderColor?: string;
  /** Use gradient background on mobile instead of image */
  useMobileGradient?: boolean;
  /** Mobile breakpoint in pixels */
  mobileBreakpoint?: number;
  /** Custom gradient colors for mobile [start, middle, end] */
  mobileGradientColors?: [string, string, string];
  /** Enable rounded bottom crop effect */
  roundedBottom?: boolean;
  /** Radius of the rounded bottom curve */
  roundedBottomRadius?: string;
}

// Generate a simple blur placeholder
const generateBlurDataURL = (color: string = '#f3f4f6') => {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="${color}"/></svg>`
  ).toString('base64')}`;
};

export const ProgressiveBackgroundImage: React.FC<
  ProgressiveBackgroundImageProps
> = ({
  src,
  placeholder,
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
  placeholderColor = '#e5e7eb',
  useMobileGradient = false,
  mobileBreakpoint = 768,
  mobileGradientColors = [
    'rgba(19, 64, 91, 1)',
    'rgba(120, 71, 145, 1)',
    'rgba(221, 156, 54, 1)',
  ],
  roundedBottom = false,
  roundedBottomRadius = '50% 50% 0 0 / 0 0 100px 100px',
  sx,
  className,
  ...boxProps
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on client side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    // Initial check
    checkMobile();

    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
    setImageFailed(false);
  }, []);

  const handleError = useCallback(() => {
    setImageFailed(true);
    setImageLoaded(false);
  }, []);

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

  // Preload the image for better performance (only on desktop)
  useEffect(() => {
    if (priority && typeof src === 'string' && !isMobile) {
      const img = new window.Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageFailed(true);
      img.src = src;
    }
  }, [src, priority, isMobile]);

  // Generate mobile gradient background
  const mobileGradient = `linear-gradient(135deg, ${mobileGradientColors[0]} 0%, ${mobileGradientColors[1]} 99%, ${mobileGradientColors[2]} 100%)`;

  // Should use gradient instead of image
  const shouldUseGradient = useMobileGradient && isMobile;

  return (
    <Box
      className={className}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        // Apply rounded bottom effect using border-radius
        ...(roundedBottom && {
          borderRadius: roundedBottomRadius,
        }),
        ...sx,
      }}
      {...boxProps}
    >
      {/* Mobile Gradient Background */}
      {shouldUseGradient && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: mobileGradient,
            zIndex: 0,
          }}
        />
      )}

      {/* Desktop: Background Image with Progressive Loading */}
      {!shouldUseGradient && (
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
          {/* Placeholder/Loading State */}
          {!imageLoaded && !imageFailed && (
            <Box
              className="bg-shimmer"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              {/* Smart gradient based on image type */}
              <Box
                className={
                  typeof src === 'string' && src.includes('homepage_header_bg')
                    ? 'header-bg-fallback'
                    : typeof src === 'string' && src.includes('container')
                      ? 'container-bg-fallback'
                      : typeof src === 'string' && src.includes('site-bg')
                        ? 'site-bg-fallback'
                        : typeof src === 'string' && src.includes('footer')
                          ? 'footer-bg-fallback'
                          : ''
                }
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: !(
                    typeof src === 'string' &&
                    (src.includes('homepage_header_bg') ||
                      src.includes('container') ||
                      src.includes('site-bg') ||
                      src.includes('footer'))
                  )
                    ? `linear-gradient(45deg, ${placeholderColor}15, ${placeholderColor}25)`
                    : undefined,
                }}
              />
            </Box>
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
            onError={handleError}
            priority={priority}
            quality={quality}
            sizes="100vw"
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder || generateBlurDataURL(placeholderColor)}
          />

          {/* Error State */}
          {imageFailed && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(45deg, ${placeholderColor}20, ${placeholderColor}40)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '14px',
              }}
            >
              Background image failed to load
            </Box>
          )}
        </Box>
      )}

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

export default ProgressiveBackgroundImage;
