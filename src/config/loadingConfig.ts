// Loading Configuration
// Set to true if you want to enable modern loading screen

export const LOADING_CONFIG = {
  // Main loading screen
  ENABLE_MAIN_LOADING: false,        // Set to true to show modern loading screen on first visit
  ENABLE_HEADER_LOADING: true,       // Modern header loading fallback
  ENABLE_COMPONENT_LOADING: true,    // Modern component-level loading
  
  // Loading messages
  MAIN_LOADING_MESSAGE: "Initializing Excellence...",
  HEADER_LOADING_MESSAGE: "Loading Header...",
  COMPONENT_LOADING_MESSAGE: "Loading...",
  
  // Timing
  MIN_LOADING_TIME: 1000,           // Minimum loading time in ms (for UX)
  MAX_LOADING_TIME: 3000,           // Maximum loading time in ms (failsafe)
} as const;

// Quick toggles for different loading states
export const enableMainLoading = () => LOADING_CONFIG.ENABLE_MAIN_LOADING;
export const enableHeaderLoading = () => LOADING_CONFIG.ENABLE_HEADER_LOADING;
export const enableComponentLoading = () => LOADING_CONFIG.ENABLE_COMPONENT_LOADING;
