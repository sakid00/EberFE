'use client';
import React, { useEffect, useState } from 'react';
import LoadingPage from '../LoadingPage';
import { useDevAssetLoading as useAssetLoading } from '@/hooks/useDevAssetLoading';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  
  // Always call the hook (Rules of Hooks)
  const assetLoading = useAssetLoading();
  
  // Only show loading on first mount
  const isLoading = !hasLoaded ? assetLoading.isLoading : false;
  const progress = !hasLoaded ? assetLoading.progress : 100;
  const isComplete = !hasLoaded ? assetLoading.isComplete : true;

  // Mark as loaded after first load completes
  useEffect(() => {
    if (!isLoading && !hasLoaded) {
      setHasLoaded(true);
      console.log('✅ First load complete, navigation will be instant now');
    }
  }, [isLoading, hasLoaded]);

  useEffect(() => {
    // Mark that React has loaded and hide the initial CSS loading screen
    document.documentElement.classList.add('react-loaded');
    
    // Clean up the initial loading element after React takes over
    const initialLoading = document.getElementById('initial-loading');
    if (initialLoading) {
      // Add a small fade out effect
      initialLoading.style.transition = 'opacity 0.3s ease-out';
      initialLoading.style.opacity = '0';
      setTimeout(() => {
        if (initialLoading.parentNode) {
          initialLoading.parentNode.removeChild(initialLoading);
        }
      }, 300);
    }

    // Ensure page starts at the top
    window.scrollTo(0, 0);
    
    // Also reset any potential scroll lock
    document.body.style.overflow = 'unset';
  }, []);

  // Show loading screen only on first load
  const shouldShowLoadingScreen = isLoading && !hasLoaded;

  return (
    <>
      {/* Full loading screen only for first load */}
      {shouldShowLoadingScreen && (
        <div className={isComplete ? 'loading-page-exit' : ''}>
          <LoadingPage progress={progress} />
        </div>
      )}
      
      {/* Direct render without transitions for fast navigation */}
      <div
        style={{
          opacity: shouldShowLoadingScreen ? 0 : 1,
          transition: shouldShowLoadingScreen ? 'opacity 0.5s ease-in-out' : 'none',
          pointerEvents: shouldShowLoadingScreen ? 'none' : 'auto',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default LoadingWrapper;
