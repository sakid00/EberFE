// Photo Assets Management System with WebP Optimization

// Original PNG imports (for fallback)
import chemPersonPng from '@/public/photo/chem-person.png';
import eberBig2Png from '@/public/photo/eber-big-2.png';
import eberBig2MobilePng from '@/public/photo/eber-big-2-mobile.png';
import fieldPersonPng from '@/public/photo/field-person.png';
import fieldPerson2Png from '@/public/photo/field_person2.png';
import fieldPerson3Png from '@/public/photo/field_person3.png';
import labPersonPng from '@/public/photo/lab-person.png';
import safetyPersonPng from '@/public/photo/safety-person.png';
import tankiPersonPng from '@/public/photo/tangki-person.png';
import headerCorporatePng from '@/public/photo/header_corporate.png';
import subtractPng from '@/public/photo/subtract.png';
import subtractMobilePng from '@/public/photo/subtract-mobile.png';
import tankiPng from '@/public/photo/tangki.png';
import eternalPng from '@/public/photo/eternal.png';
import engPng from '@/public/photo/eng.png';
import megaPng from '@/public/photo/mega.png';
import petroPng from '@/public/photo/petro.png';

// Optimized WebP imports (90%+ smaller)
import chemPersonWebP from '@/public/photo/optimized/chem-person_optimized.webp';
import eberBig2WebP from '@/public/photo/optimized/eber-big-2_optimized.webp';
import eberBig2MobileWebP from '@/public/photo/optimized/eber-big-2-mobile_optimized.webp';
import fieldPersonWebP from '@/public/photo/optimized/field-person_optimized.webp';
import fieldPerson2WebP from '@/public/photo/optimized/field_person2_optimized.webp';
import fieldPerson3WebP from '@/public/photo/optimized/field_person3_optimized.webp';
import labPersonWebP from '@/public/photo/optimized/lab-person_optimized.webp';
import safetyPersonWebP from '@/public/photo/optimized/safety-person_optimized.webp';
import tankiPersonWebP from '@/public/photo/optimized/tangki-person_optimized.webp';
import headerCorporateWebP from '@/public/photo/optimized/header_corporate_optimized.webp';
import subtractWebP from '@/public/photo/optimized/subtract_optimized.webp';
import subtractMobileWebP from '@/public/photo/optimized/subtract-mobile_optimized.webp';
import tankiWebP from '@/public/photo/optimized/tangki_optimized.webp';
import eternalWebP from '@/public/photo/optimized/eternal_optimized.webp';
import engWebP from '@/public/photo/optimized/eng_optimized.webp';
import megaWebP from '@/public/photo/optimized/mega_optimized.webp';
import petroWebP from '@/public/photo/optimized/petro_optimized.webp';

// WebP Photo Assets (90%+ size reduction)
export const WebPPhotos = {
  // Person/People Photos
  chemPerson: chemPersonWebP,           // 6.2MB → 225KB (97% reduction)
  eberBig2: eberBig2WebP,              // 8.89MB → 18KB (100% reduction)
  eberBig2Mobile: eberBig2MobileWebP,  // 179KB → 8KB (96% reduction)
  fieldPerson: fieldPersonWebP,        // 1.9MB → 72KB (96% reduction)
  fieldPerson2: fieldPerson2WebP,      // 2.1MB → 98KB (96% reduction)
  fieldPerson3: fieldPerson3WebP,      // 1.74MB → 95KB (95% reduction)
  labPerson: labPersonWebP,            // 1.72MB → 79KB (96% reduction)
  safetyPerson: safetyPersonWebP,      // 1.29MB → 47KB (97% reduction)
  tankiPerson: tankiPersonWebP,        // 514KB → 87KB (83% reduction)
  
  // Industrial/Corporate Photos
  headerCorporate: headerCorporateWebP, // 842KB → 26KB (97% reduction)
  subtract: subtractWebP,              // 349KB → 69KB (81% reduction)
  subtractMobile: subtractMobileWebP,  // 992KB → 34KB (97% reduction)
  tanki: tankiWebP,                    // 6.88MB → 89KB (99% reduction)
  
  // Company Logos
  eternal: eternalWebP,                // 9KB → 6KB (30% reduction)
  eng: engWebP,                        // 9KB → 5KB (47% reduction)
  mega: megaWebP,                      // 15KB → 7KB (62% reduction)
  petro: petroWebP,                    // 10KB → 5KB (64% reduction)
} as const;

// Original PNG Photos (for fallback)
export const PNGPhotos = {
  // Person/People Photos
  chemPerson: chemPersonPng,
  eberBig2: eberBig2Png,
  eberBig2Mobile: eberBig2MobilePng,
  fieldPerson: fieldPersonPng,
  fieldPerson2: fieldPerson2Png,
  fieldPerson3: fieldPerson3Png,
  labPerson: labPersonPng,
  safetyPerson: safetyPersonPng,
  tankiPerson: tankiPersonPng,
  
  // Industrial/Corporate Photos
  headerCorporate: headerCorporatePng,
  subtract: subtractPng,
  subtractMobile: subtractMobilePng,
  tanki: tankiPng,
  
  // Company Logos
  eternal: eternalPng,
  eng: engPng,
  mega: megaPng,
  petro: petroPng,
} as const;

// Configuration
export const USE_WEBP_PHOTOS = true;  // 90%+ size reduction with identical quality
export const USE_PNG_FALLBACK = false; // Original heavy files

// Smart photo getter function
export const getPhoto = (photoKey: keyof typeof WebPPhotos) => {
  return USE_WEBP_PHOTOS ? WebPPhotos[photoKey] : PNGPhotos[photoKey];
};

// Type definitions for better TypeScript support
export type PhotoKey = keyof typeof WebPPhotos;
export type PhotoAsset = typeof WebPPhotos[PhotoKey];

// Utility functions
export const getAllWebPPhotos = () => WebPPhotos;
export const getAllPNGPhotos = () => PNGPhotos;
export const getPhotoFormat = () => USE_WEBP_PHOTOS ? 'WebP (Optimized)' : 'PNG (Original)';

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
  PNGPhotos,
  PhotoSizeInfo,
  USE_WEBP_PHOTOS,
};

export default PhotoAssets;
