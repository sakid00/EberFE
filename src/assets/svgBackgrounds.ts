// Optimized WebP imports - Best quality/size balance (98% smaller than PNG)
import homepageHeaderBgWebP from '@/public/background/optimized/homepage_header_bg_optimized.webp';
import container1WebP from '@/public/background/optimized/container1_optimized.webp';
import container1MobileWebP from '@/public/background/optimized/container1_mobile_optimized.webp';
import siteBgWebP from '@/public/background/optimized/site-bg_optimized.webp';

export const WebPBackgrounds = {
  homepageHeaderBg: homepageHeaderBgWebP,
  container1: container1WebP,
  container1Mobile: container1MobileWebP,
  siteBg: siteBgWebP,
} as const;

// Direct getter function - always returns WebP for optimal performance
export const getBackgroundImage = (
  backgroundKey: keyof typeof WebPBackgrounds
) => {
  return WebPBackgrounds[backgroundKey];
};
