'use client';
import React, { useEffect, useState } from 'react';
import LoadingPage from '../LoadingPage';
import { useDevAssetLoading as useAssetLoading } from '@/hooks/useDevAssetLoading';

interface LoadingWrapperProps {
  children: React.ReactNode;
  useModernLoading?: boolean; // Option to use modern loading instead
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [isLoadingVisible, setIsLoadingVisible] = useState(true); // Show loading initially
  
  // Use actual loading with modern design
  const { isLoading, progress, isComplete } = useAssetLoading();
  
  // Show beautiful loading screen for 2.5 seconds then fade out
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoadingVisible(false);
      console.log('✨ Modern loading screen completed!');
    }, 2500); // 2.5 seconds of beautiful loading
    
    return () => clearTimeout(loadingTimer);
  }, []); // Run once on mount

  // Clean up initial CSS loading and ensure scroll position
  useEffect(() => {
    // Mark that React has loaded
    document.documentElement.classList.add('react-loaded');
    
    // Clean up the initial loading element
    const initialLoading = document.getElementById('initial-loading');
    if (initialLoading) {
      initialLoading.style.transition = 'opacity 0.5s ease-out';
      initialLoading.style.opacity = '0';
      setTimeout(() => {
        if (initialLoading.parentNode) {
          initialLoading.parentNode.removeChild(initialLoading);
        }
      }, 500);
    }

    // Ensure page starts at the top
    window.scrollTo(0, 0);
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <>
      {/* Modern loading screen */}
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
          <LoadingPage progress={Math.min(progress, 100)} />
        </div>
      )}
      
      {/* Main content */}
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
