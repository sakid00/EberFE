'use client';
import React, { useState, useCallback } from 'react';
import Image, { ImageProps } from 'next/image';
import { Box, CircularProgress } from '@mui/material';

interface ImageWithLoaderProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  showLoader?: boolean;
  loaderSize?: number;
  fallbackSrc?: string;
  onLoadComplete?: () => void;
  onError?: () => void;
}

export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  showLoader = true,
  loaderSize = 24,
  fallbackSrc,
  onLoadComplete,
  onError,
  style,
  className,
  ...imageProps
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(imageProps.src);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    onLoadComplete?.();
  }, [onLoadComplete]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
    
    // Try fallback if available
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
      setHasError(false);
    }
  }, [onError, fallbackSrc, currentSrc]);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        height: '100%',
      }}
      className={className}
    >
      {/* Loading indicator */}
      {showLoader && isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        >
          <CircularProgress size={loaderSize} />
        </Box>
      )}

      {/* Error indicator */}
      {hasError && !fallbackSrc && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            color: 'text.secondary',
            textAlign: 'center',
          }}
        >
          Image failed to load
        </Box>
      )}

      {/* Image */}
      <Image
        {...imageProps}
        src={currentSrc}
        alt={imageProps.alt || ''}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          opacity: isLoading ? 0.3 : 1,
          transition: 'opacity 0.3s ease-in-out',
          ...style,
        }}
      />
    </Box>
  );
};

export default ImageWithLoader;
