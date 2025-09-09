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

export const dynamicStylingValue = (
  deviceType: DeviceType,
  mobileValue: string,
  tabletValue: string,
  desktopValue: string
) => {
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
