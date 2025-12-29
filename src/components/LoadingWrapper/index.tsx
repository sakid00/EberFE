'use client';
import React, { useEffect, useState } from 'react';
import LoadingPage from '../LoadingPage';
import { useDevAssetLoading } from '@/hooks/useDevAssetLoading';

interface LoadingWrapperProps {
  children: React.ReactNode;
  useModernLoading?: boolean;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [isLoadingVisible, setIsLoadingVisible] = useState(true);

  // Use the asset loading hook to track real image loading progress
  const { isLoading, progress, isComplete } = useDevAssetLoading();

  // Hide loading screen when assets are complete
  useEffect(() => {
    if (isComplete && !isLoading) {
      setIsLoadingVisible(false);
    }
  }, [isComplete, isLoading]);

  // Clean up initial CSS loading and ensure scroll position
  useEffect(() => {
    // Mark that React has loaded
    document.documentElement.classList.add('react-loaded');

    // Clean up the initial loading element - hide instead of removing to prevent hydration errors
    const initialLoading = document.getElementById('initial-loading');
    if (initialLoading) {
      initialLoading.style.transition = 'opacity 0.5s ease-out';
      initialLoading.style.opacity = '0';
      // Hide the element instead of removing it to prevent React hydration errors
      setTimeout(() => {
        initialLoading.style.display = 'none';
      }, 500);
    }

    // Ensure page starts at the top
    window.scrollTo(0, 0);
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <>
      {/* Modern loading screen with real progress tracking */}
      {isLoadingVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            transition: 'opacity 0.5s ease-out',
          }}
        >
          <LoadingPage progress={progress} />
        </div>
      )}

      {/* Main content - only show when loading is complete */}
      <div
        style={{
          opacity: isLoadingVisible ? 0 : 1,
          transition: isLoadingVisible ? 'none' : 'opacity 0.5s ease-in',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default LoadingWrapper;
