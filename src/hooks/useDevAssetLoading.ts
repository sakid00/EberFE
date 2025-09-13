'use client';
import { useState, useEffect } from 'react';

interface UseAssetLoadingReturn {
  isLoading: boolean;
  progress: number;
  isComplete: boolean;
}

// Ultra-fast loading for development - shows loading for minimal time
export const useDevAssetLoading = (): UseAssetLoadingReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;
    
    // Simulate loading with smooth progress
    const simulateLoading = () => {
      let currentProgress = 0;
      
      progressInterval = setInterval(() => {
        currentProgress += Math.random() * 15 + 10; // Random increments
        if (currentProgress >= 100) {
          currentProgress = 100;
          setProgress(100);
          clearInterval(progressInterval);
          
          // Mark complete and finish quickly
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              // Ensure scroll position is at top
              window.scrollTo(0, 0);
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
              setIsLoading(false);
            }, 200);
          }, 200);
          
          return;
        }
        setProgress(currentProgress);
      }, 150); // Update every 150ms
      
      // Force finish after 1.5 seconds max
      timeoutId = setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        setIsComplete(true);
        setTimeout(() => {
          // Ensure scroll position is at top
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          setIsLoading(false);
        }, 200);
      }, 1500);
    };

    simulateLoading();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, []);

  return {
    isLoading,
    progress,
    isComplete,
  };
};
