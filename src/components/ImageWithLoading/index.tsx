'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Skeleton, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  skeletonHeight?: number;
  onError?: () => void;
}

const ImageWithLoading: React.FC<ImageWithLoadingProps> = ({
  src,
  alt,
  width = 1000,
  height = 1000,
  style,
  priority = false,
  fill = false,
  className,
  skeletonHeight,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleLoadComplete = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (onError) {
      onError();
    }
  };

  const handleRetry = () => {
    if (retryCount < 3) {
      setIsLoading(true);
      setHasError(false);
      setRetryCount(prev => prev + 1);
      // Note: Image will be re-rendered due to state change
    }
  };

  const imageStyle = {
    objectFit: 'fill' as const,
    borderRadius: '20px',
    width: '100%',
    height: 'auto',
    ...style,
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
      {/* Loading Skeleton */}
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={skeletonHeight || (fill ? '100%' : height)}
          sx={{
            borderRadius: '20px',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      )}

      {/* Error State */}
      {hasError && (
        <Box
          sx={{
            width: '100%',
            height: skeletonHeight || height,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: '20px',
            border: '2px dashed #ccc',
          }}
        >
          <Box sx={{ textAlign: 'center', color: '#666' }}>
            <Box sx={{ fontSize: '2rem', mb: 1 }}>🖼️</Box>
            <Box sx={{ fontSize: '0.9rem', mb: 2 }}>
              Failed to load image
            </Box>
            {retryCount < 3 && (
              <IconButton
                onClick={handleRetry}
                size="small"
                sx={{
                  backgroundColor: '#e3f2fd',
                  '&:hover': { backgroundColor: '#bbdefb' },
                }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
      )}

      {/* Actual Image */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          style={{
            ...imageStyle,
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
          className={className}
          priority={priority}
          onLoad={handleLoadComplete}
          onError={handleError}
        />
      )}
    </Box>
  );
};

export default ImageWithLoading;
