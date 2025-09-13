'use client';
import { useState, useEffect, useCallback } from 'react';

interface UseAssetLoadingReturn {
  isLoading: boolean;
  progress: number;
  isComplete: boolean;
}

export const useAssetLoading = (): UseAssetLoadingReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const finishLoading = useCallback(() => {
    setProgress(100);
    setIsComplete(true);
    // Much shorter transition time
    setTimeout(() => {
      // Ensure scroll position is at top
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      setIsLoading(false);
    }, 400);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentProgress = 0;
    
    const incrementProgress = (amount: number) => {
      currentProgress += amount;
      setProgress(Math.min(currentProgress, 100));
    };

    const loadAssets = async () => {
      try {
        // Start with immediate progress
        incrementProgress(15);
        
        // Set maximum loading time - force finish after 3 seconds
        timeoutId = setTimeout(() => {
          console.log('Loading timeout reached - finishing early');
          finishLoading();
        }, 3000);

        // Wait for DOM content (usually very fast)
        if (document.readyState === 'loading') {
          await Promise.race([
            new Promise((resolve) => {
              document.addEventListener('DOMContentLoaded', resolve);
            }),
            new Promise((resolve) => setTimeout(resolve, 500)) // 500ms max
          ]);
        }
        incrementProgress(25);

        // Check fonts with shorter timeout
        if ('fonts' in document) {
          await Promise.race([
            document.fonts.ready,
            new Promise((resolve) => setTimeout(resolve, 1000)) // 1s max for fonts
          ]);
        }
        incrementProgress(30);

        // Only wait for critical images (above the fold)
        const images = Array.from(document.images);
        const criticalImages = images.slice(0, 3); // Only first 3 images
        
        const imagePromises = criticalImages.map((img) => {
          if (img.complete) return Promise.resolve();
          return Promise.race([
            new Promise((resolve) => {
              img.addEventListener('load', resolve);
              img.addEventListener('error', resolve); // Resolve on error too
            }),
            new Promise((resolve) => setTimeout(resolve, 1500)) // 1.5s max per image
          ]);
        });

        await Promise.allSettled(imagePromises);
        incrementProgress(20);

        // Quick final check for document ready state
        if (document.readyState !== 'complete') {
          await Promise.race([
            new Promise((resolve) => {
              if (document.readyState === 'complete') {
                resolve(void 0);
              } else {
                window.addEventListener('load', () => resolve(void 0));
              }
            }),
            new Promise((resolve) => setTimeout(resolve, 800)) // 800ms max
          ]);
        }
        incrementProgress(10);

        // Clear timeout since we finished normally
        clearTimeout(timeoutId);
        
        // Much shorter final delay
        await new Promise((resolve) => setTimeout(resolve, 200));
        finishLoading();

      } catch (error) {
        console.warn('Asset loading encountered issues:', error);
        clearTimeout(timeoutId);
        finishLoading();
      }
    };

    // Start loading process
    loadAssets();

    // Cleanup
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [finishLoading]);

  return {
    isLoading,
    progress,
    isComplete,
  };
};
