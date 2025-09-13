'use client';
import React, { useEffect } from 'react';
import LoadingPage from '../LoadingPage';
// Temporarily using fast dev loading - switch back to useAssetLoading for production
import { useDevAssetLoading as useAssetLoading } from '@/hooks/useDevAssetLoading';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const { isLoading, progress, isComplete } = useAssetLoading();

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

  // Additional effect to handle loading completion
  useEffect(() => {
    if (!isLoading) {
      // Scroll to top when loading is complete
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className={isComplete ? 'loading-page-exit' : ''}>
          <LoadingPage progress={progress} />
        </div>
      )}
      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default LoadingWrapper;
