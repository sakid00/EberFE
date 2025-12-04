export const WebPBackgrounds = {
  homepageHeaderBg: '/background/optimized/homepage_header_bg_optimized.webp',
  container1: '/background/optimized/container1_optimized.webp',
  container1Mobile: '/background/optimized/container1_mobile_optimized.webp',
  siteBg: '/background/optimized/site-bg_optimized.webp',
} as const;

// Direct getter function - always returns WebP for optimal performance
export const getBackgroundImage = (
  backgroundKey: keyof typeof WebPBackgrounds
) => {
  return WebPBackgrounds[backgroundKey];
};
