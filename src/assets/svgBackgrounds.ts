// SVG Background Imports - Ultra lightweight alternatives
import homepageHeaderBgSvg from '@/public/background/homepage_header_bg.svg';
import container1Svg from '@/public/background/container1.svg';
import container1MobileSvg from '@/public/background/container1-mobile.svg';
import siteBgSvg from '@/public/background/site-bg.svg';

// Optimized WebP imports - Best quality/size balance
import homepageHeaderBgWebP from '@/public/background/optimized/homepage_header_bg_optimized.webp';
import container1WebP from '@/public/background/optimized/container1_optimized.webp';
import container1MobileWebP from '@/public/background/optimized/container1_mobile_optimized.webp';
import siteBgWebP from '@/public/background/optimized/site-bg_optimized.webp';

// Original PNG imports (for fallback if needed)
import homepageHeaderBgPng from '@/public/background/homepage_header_bg.png';
import container1Png from '@/public/background/container1.png';
import container1MobilePng from '@/public/background/container1-mobile.png';
import siteBgPng from '@/public/background/site-bg.png';

export const SVGBackgrounds = {
  homepageHeaderBg: homepageHeaderBgSvg,
  container1: container1Svg,
  container1Mobile: container1MobileSvg,
  siteBg: siteBgSvg,
} as const;

export const WebPBackgrounds = {
  homepageHeaderBg: homepageHeaderBgWebP,
  container1: container1WebP,
  container1Mobile: container1MobileWebP,
  siteBg: siteBgWebP,
} as const;

export const PNGBackgrounds = {
  homepageHeaderBg: homepageHeaderBgPng,
  container1: container1Png,
  container1Mobile: container1MobilePng,
  siteBg: siteBgPng,
} as const;

// Configuration for which backgrounds to use
export const USE_SVG_BACKGROUNDS = false; // Ultra lightweight but simplified design
export const USE_WEBP_BACKGROUNDS = true;  // Best quality/size balance - 98% smaller than PNG
export const USE_PNG_FALLBACK = false;     // Original heavy files

export const getBackgroundImage = (backgroundKey: keyof typeof SVGBackgrounds) => {
  if (USE_SVG_BACKGROUNDS) {
    return SVGBackgrounds[backgroundKey];
  } else if (USE_WEBP_BACKGROUNDS) {
    return WebPBackgrounds[backgroundKey];
  } else {
    return PNGBackgrounds[backgroundKey];
  }
};
