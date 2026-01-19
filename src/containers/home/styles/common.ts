import { DeviceType, dynamicStylingValue } from '../../../hooks/useDeviceType';
import { SxProps, Theme } from '@mui/material';

// Common color constants
export const COLORS = {
  primary: {
    orange: 'rgba(255, 138, 0, 1)',
    red: 'rgba(245, 75, 2, 1)',
    gradient:
      'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
  },
  text: {
    primary: '#030712',
    secondary: '#4B5563',
    light: '#D6CBE3',
    white: 'white',
  },
  background: {
    customGradient:
      'linear-gradient(145deg,rgba(19, 64, 91, 1) 21%, rgba(120, 71, 145, 1) 70%, rgba(221, 156, 54, 1) 100%)',
    transparent: 'transparent',
  },
  border: {
    purple: '#786C95',
  },
} as const;

// Common animation classes (these will be used with className)
export const animationClasses = {
  onScroll: 'animate-on-scroll',
  fadeIn: 'animate-fade-in',
  slideLeft: 'animate-slide-left',
  slideRight: 'animate-slide-right',
  scale: 'animate-scale',
  stagger: 'animate-stagger',
  visible: 'animate-visible',
} as const;

// Common utility classes
export const utilityClasses = {
  clipCustomShape: 'clip-custom-shape',
  tangkiGradientOverlay: 'tangki-gradient-overlay',
} as const;

// Re-export types and utilities for convenience
export type { DeviceType };
export { dynamicStylingValue };
export type { SxProps, Theme };
