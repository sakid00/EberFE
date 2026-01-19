'use client';
import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface DeviceInfo {
  type: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
}

// Default breakpoints (can be customized)
const DEFAULT_BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
};

export const useDeviceType = (
  mobileBreakpoint: number = DEFAULT_BREAKPOINTS.mobile,
  tabletBreakpoint: number = DEFAULT_BREAKPOINTS.tablet
): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    // Always start with desktop as default to prevent hydration mismatch
    // We'll update this on the client side after mount
    return {
      type: 'desktop',
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      width: 0,
      height: 0,
    };
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're now on the client
    setIsClient(true);

    const updateDeviceInfo = () => {
      const { innerWidth, innerHeight } = window;
      setDeviceInfo(
        getDeviceInfo(
          innerWidth,
          innerHeight,
          mobileBreakpoint,
          tabletBreakpoint
        )
      );
    };

    // Set initial device info
    updateDeviceInfo();

    // Add event listener for window resize
    window.addEventListener('resize', updateDeviceInfo);

    // Cleanup
    return () => window.removeEventListener('resize', updateDeviceInfo);
  }, [mobileBreakpoint, tabletBreakpoint]);

  // Return device info only after client-side hydration to prevent mismatch
  if (!isClient) {
    return {
      type: 'desktop',
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      width: 0,
      height: 0,
    };
  }

  return deviceInfo;
};

// Utility function to get device info without React hook
export const getDeviceInfo = (
  width: number,
  height: number,
  mobileBreakpoint: number = DEFAULT_BREAKPOINTS.mobile,
  tabletBreakpoint: number = DEFAULT_BREAKPOINTS.tablet
): DeviceInfo => {
  let type: DeviceType;
  let isMobile: boolean;
  let isTablet: boolean;
  let isDesktop: boolean;

  if (width < mobileBreakpoint) {
    type = 'mobile';
    isMobile = true;
    isTablet = false;
    isDesktop = false;
  } else if (width < tabletBreakpoint) {
    type = 'tablet';
    isMobile = false;
    isTablet = true;
    isDesktop = false;
  } else {
    type = 'desktop';
    isMobile = false;
    isTablet = false;
    isDesktop = true;
  }

  return {
    type,
    isMobile,
    isTablet,
    isDesktop,
    width,
    height,
  };
};

// Utility function to check if current device matches a specific type
export const isDeviceType = (
  targetType: DeviceType,
  mobileBreakpoint: number = DEFAULT_BREAKPOINTS.mobile,
  tabletBreakpoint: number = DEFAULT_BREAKPOINTS.tablet
): boolean => {
  if (typeof window === 'undefined') return false;

  const { innerWidth } = window;
  const deviceInfo = getDeviceInfo(
    innerWidth,
    window.innerHeight,
    mobileBreakpoint,
    tabletBreakpoint
  );

  return deviceInfo.type === targetType;
};

// Utility function to get current device type without React hook
export const getCurrentDeviceType = (
  mobileBreakpoint: number = DEFAULT_BREAKPOINTS.mobile,
  tabletBreakpoint: number = DEFAULT_BREAKPOINTS.tablet
): DeviceType => {
  if (typeof window === 'undefined') return 'desktop';

  const { innerWidth } = window;
  const deviceInfo = getDeviceInfo(
    innerWidth,
    window.innerHeight,
    mobileBreakpoint,
    tabletBreakpoint
  );

  return deviceInfo.type;
};

// Solution 3: Generic Type Support
// Now supports numbers, strings, objects, arrays, etc.
export const dynamicStylingValue = <T>(
  deviceType: DeviceType,
  mobileValue: T,
  tabletValue: T,
  desktopValue: T
): T => {
  switch (deviceType) {
    case 'mobile':
      return mobileValue;
    case 'tablet':
      return tabletValue;
    case 'desktop':
      return desktopValue;
    default:
      return tabletValue;
  }
};

// Solution 4: Fluid/Interpolated Values

// Helper function for linear interpolation between two numeric values
export const fluidValue = (
  width: number,
  minWidth: number,
  maxWidth: number,
  minValue: number,
  maxValue: number
): number => {
  // Clamp to min/max bounds
  if (width <= minWidth) return minValue;
  if (width >= maxWidth) return maxValue;

  // Linear interpolation
  const progress = (width - minWidth) / (maxWidth - minWidth);
  return minValue + progress * (maxValue - minValue);
};

// Options for useResponsiveValue hook
export interface ResponsiveValueOptions {
  minWidth?: number; // Default: 320 (small mobile)
  maxWidth?: number; // Default: 1440 (large desktop)
  tabletValue?: number; // Optional intermediate value at tablet breakpoint
}

// Hook for responsive values that scale with viewport width
// For numeric values: smoothly interpolates between min and max
// For string values: returns discrete values based on device type
export const useResponsiveValue = <T extends number | string>(
  mobileValue: T,
  desktopValue: T,
  options?: ResponsiveValueOptions
): T => {
  const { width, type } = useDeviceType();
  const { minWidth = 320, maxWidth = 1440, tabletValue } = options || {};

  // For numeric values, use fluid interpolation
  if (typeof mobileValue === 'number' && typeof desktopValue === 'number') {
    // If tabletValue is provided, use two-segment interpolation
    if (tabletValue !== undefined) {
      const tabletBreakpoint = DEFAULT_BREAKPOINTS.tablet;

      if (width <= DEFAULT_BREAKPOINTS.mobile) {
        // Mobile range: interpolate from mobileValue to tabletValue
        return fluidValue(
          width,
          minWidth,
          DEFAULT_BREAKPOINTS.mobile,
          mobileValue,
          tabletValue
        ) as T;
      } else if (width <= tabletBreakpoint) {
        // Tablet range: use tabletValue or interpolate slightly
        return fluidValue(
          width,
          DEFAULT_BREAKPOINTS.mobile,
          tabletBreakpoint,
          tabletValue,
          tabletValue + (desktopValue - tabletValue) * 0.3
        ) as T;
      } else {
        // Desktop range: interpolate from near-tablet to desktopValue
        return fluidValue(
          width,
          tabletBreakpoint,
          maxWidth,
          tabletValue + (desktopValue - tabletValue) * 0.3,
          desktopValue
        ) as T;
      }
    }

    // Simple two-point interpolation
    return fluidValue(
      width,
      minWidth,
      maxWidth,
      mobileValue,
      desktopValue
    ) as T;
  }

  // For string values, fall back to discrete device-type-based selection
  if (type === 'mobile') return mobileValue;
  return desktopValue;
};

// Hook variant with three explicit values (mobile, tablet, desktop) with interpolation
export const useResponsiveValueThree = <T extends number | string>(
  mobileValue: T,
  tabletValue: T,
  desktopValue: T,
  options?: { minWidth?: number; maxWidth?: number }
): T => {
  const { width, type } = useDeviceType();
  const { minWidth = 320, maxWidth = 1440 } = options || {};
  const mobileBreakpoint = DEFAULT_BREAKPOINTS.mobile;
  const tabletBreakpoint = DEFAULT_BREAKPOINTS.tablet;

  // For numeric values, use fluid interpolation across three segments
  if (
    typeof mobileValue === 'number' &&
    typeof tabletValue === 'number' &&
    typeof desktopValue === 'number'
  ) {
    if (width <= mobileBreakpoint) {
      // Mobile range: minWidth to mobileBreakpoint
      return fluidValue(
        width,
        minWidth,
        mobileBreakpoint,
        mobileValue,
        tabletValue
      ) as T;
    } else if (width <= tabletBreakpoint) {
      // Tablet range: mobileBreakpoint to tabletBreakpoint
      return fluidValue(
        width,
        mobileBreakpoint,
        tabletBreakpoint,
        tabletValue,
        tabletValue + (desktopValue - tabletValue) * 0.5
      ) as T;
    } else {
      // Desktop range: tabletBreakpoint to maxWidth
      return fluidValue(
        width,
        tabletBreakpoint,
        maxWidth,
        tabletValue + (desktopValue - tabletValue) * 0.5,
        desktopValue
      ) as T;
    }
  }

  // For string values, use discrete selection
  switch (type) {
    case 'mobile':
      return mobileValue;
    case 'tablet':
      return tabletValue;
    case 'desktop':
      return desktopValue;
    default:
      return tabletValue;
  }
};

// Utility function for width-based responsive value (non-hook version)
// Use this in style objects or outside of React components
export const getResponsiveValue = <T extends number | string>(
  width: number,
  mobileValue: T,
  tabletValue: T,
  desktopValue: T,
  options?: { minWidth?: number; maxWidth?: number }
): T => {
  const { minWidth = 320, maxWidth = 1440 } = options || {};
  const mobileBreakpoint = DEFAULT_BREAKPOINTS.mobile;
  const tabletBreakpoint = DEFAULT_BREAKPOINTS.tablet;

  // For numeric values, use fluid interpolation
  if (
    typeof mobileValue === 'number' &&
    typeof tabletValue === 'number' &&
    typeof desktopValue === 'number'
  ) {
    if (width <= mobileBreakpoint) {
      return fluidValue(
        width,
        minWidth,
        mobileBreakpoint,
        mobileValue,
        tabletValue
      ) as T;
    } else if (width <= tabletBreakpoint) {
      return fluidValue(
        width,
        mobileBreakpoint,
        tabletBreakpoint,
        tabletValue,
        tabletValue + (desktopValue - tabletValue) * 0.5
      ) as T;
    } else {
      return fluidValue(
        width,
        tabletBreakpoint,
        maxWidth,
        tabletValue + (desktopValue - tabletValue) * 0.5,
        desktopValue
      ) as T;
    }
  }

  // For string values, use discrete selection based on width
  if (width < mobileBreakpoint) return mobileValue;
  if (width < tabletBreakpoint) return tabletValue;
  return desktopValue;
};
