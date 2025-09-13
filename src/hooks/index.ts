export { useAssetLoading } from './useAssetLoading';
export { useDevAssetLoading } from './useDevAssetLoading';

// Main API hook
export { useApi } from './useApi';
export type {
  HttpMethod,
  ApiResponse,
  ApiOptions,
  ApiConfig,
  UseApiReturn,
} from './useApi';

// Re-export existing hooks
export { useScrollAnimation } from './useScrollAnimation';

// Device detection utilities
export {
  useDeviceType,
  getDeviceInfo,
  isDeviceType,
  getCurrentDeviceType,
} from './useDeviceType';
export type { DeviceType, DeviceInfo } from './useDeviceType';

// Translation hook
export { useTranslation } from './useTranslation';
