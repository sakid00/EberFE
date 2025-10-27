// Photo Assets Management System with WebP Optimization

// WebP Photo Assets (90%+ size reduction)
export const WebPPhotos = {
  // Person/People Photos
  chemPerson: '/photo/optimized/chem-person_optimized.webp', // 6.2MB → 225KB (97% reduction)
  eberBig2: '/photo/optimized/eber-big-2_optimized.webp', // 8.89MB → 18KB (100% reduction)
  eberBig2Mobile: '/photo/optimized/eber-big-2-mobile_optimized.webp', // 179KB → 8KB (96% reduction)
  fieldPerson: '/photo/optimized/field-person_optimized.webp', // 1.9MB → 72KB (96% reduction)
  fieldPerson2: '/photo/optimized/field_person2_optimized.webp', // 2.1MB → 98KB (96% reduction)
  fieldPerson3: '/photo/optimized/field_person3_optimized.webp', // 1.74MB → 95KB (95% reduction)
  labPerson: '/photo/optimized/lab-person_optimized.webp', // 1.72MB → 79KB (96% reduction)
  safetyPerson: '/photo/optimized/safety-person_optimized.webp', // 1.29MB → 47KB (97% reduction)
  tankiPerson: '/photo/optimized/tangki-person_optimized.webp', // 514KB → 87KB (83% reduction)

  // Industrial/Corporate Photos
  headerCorporate: '/photo/optimized/header_corporate_optimized.webp', // 842KB → 26KB (97% reduction)
  subtract: '/photo/optimized/subtract_optimized.webp', // 349KB → 69KB (81% reduction)
  subtractMobile: '/photo/optimized/subtract-mobile_optimized.webp', // 992KB → 34KB (97% reduction)
  tanki: '/photo/optimized/tangki_optimized.webp', // 6.88MB → 89KB (99% reduction)

  // Company Logos
  eternal: '/photo/optimized/eternal_optimized.webp', // 9KB → 6KB (30% reduction)
  eng: '/photo/optimized/eng_optimized.webp', // 9KB → 5KB (47% reduction)
  mega: '/photo/optimized/mega_optimized.webp', // 15KB → 7KB (62% reduction)
  petro: '/photo/optimized/petro_optimized.webp', // 10KB → 5KB (64% reduction)
} as const;

// Direct getter function - always returns WebP for optimal performance
export const getPhoto = (photoKey: keyof typeof WebPPhotos) => {
  return WebPPhotos[photoKey];
};

// Type definitions for better TypeScript support
export type PhotoKey = keyof typeof WebPPhotos;
export type PhotoAsset = string;

// Utility functions
export const getAllWebPPhotos = () => WebPPhotos;
export const getPhotoFormat = () => 'WebP (Optimized)';

// Photo size information
export const PhotoSizeInfo = {
  chemPerson: { original: '6.2MB', webp: '225KB', reduction: '97%' },
  eberBig2: { original: '8.89MB', webp: '18KB', reduction: '100%' },
  eberBig2Mobile: { original: '179KB', webp: '8KB', reduction: '96%' },
  fieldPerson: { original: '1.9MB', webp: '72KB', reduction: '96%' },
  fieldPerson2: { original: '2.1MB', webp: '98KB', reduction: '96%' },
  fieldPerson3: { original: '1.74MB', webp: '95KB', reduction: '95%' },
  labPerson: { original: '1.72MB', webp: '79KB', reduction: '96%' },
  safetyPerson: { original: '1.29MB', webp: '47KB', reduction: '97%' },
  tankiPerson: { original: '514KB', webp: '87KB', reduction: '83%' },
  headerCorporate: { original: '842KB', webp: '26KB', reduction: '97%' },
  subtract: { original: '349KB', webp: '69KB', reduction: '81%' },
  subtractMobile: { original: '992KB', webp: '34KB', reduction: '97%' },
  tanki: { original: '6.88MB', webp: '89KB', reduction: '99%' },
  eternal: { original: '9KB', webp: '6KB', reduction: '30%' },
  eng: { original: '9KB', webp: '5KB', reduction: '47%' },
  mega: { original: '15KB', webp: '7KB', reduction: '62%' },
  petro: { original: '10KB', webp: '5KB', reduction: '64%' },
} as const;

const PhotoAssets = {
  getPhoto,
  WebPPhotos,
  PhotoSizeInfo,
};

export default PhotoAssets;
