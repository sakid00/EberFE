import { BoxProps } from '@mui/material';
import { StaticImageData } from 'next/image';

export interface ImageBackgroundProps extends Omit<BoxProps, 'children'> {
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
}
