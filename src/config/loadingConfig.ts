// Loading Configuration
// Set to true if you want to enable modern loading screen

export const LOADING_CONFIG = {
  // Main loading screen
  ENABLE_MAIN_LOADING: false, // Disabled for instant loading
  ENABLE_HEADER_LOADING: false, // Disabled for instant loading
  ENABLE_COMPONENT_LOADING: false, // Disabled for instant loading

  // Loading messages
  MAIN_LOADING_MESSAGE: 'Initializing Excellence...',
  HEADER_LOADING_MESSAGE: 'Loading Header...',
  COMPONENT_LOADING_MESSAGE: 'Loading...',

  // Timing
  MIN_LOADING_TIME: 0, // No artificial delay
  MAX_LOADING_TIME: 1000, // Reduced from 3000ms to 1000ms
} as const;

// Quick toggles for different loading states
export const enableMainLoading = () => LOADING_CONFIG.ENABLE_MAIN_LOADING;
export const enableHeaderLoading = () => LOADING_CONFIG.ENABLE_HEADER_LOADING;
export const enableComponentLoading = () =>
  LOADING_CONFIG.ENABLE_COMPONENT_LOADING;
