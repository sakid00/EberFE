'use client';
import { useState, useEffect, useCallback } from 'react';

interface UseAssetLoadingReturn {
  isLoading: boolean;
  progress: number;
  isComplete: boolean;
}

// Real asset loading for proper synchronization
export const useDevAssetLoading = (): UseAssetLoadingReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const finishLoading = useCallback(() => {
    setProgress(100);
    setIsComplete(true);
    setTimeout(() => {
      // Ensure scroll position is at top
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      setIsLoading(false);
    }, 100);
  }, []);

  const waitForImages = useCallback(async () => {
    const images = Array.from(document.images);

    // Filter for images that are actually in the viewport or critical
    // Prioritize background images which are usually large and slow to load
    const criticalImages = images.filter((img) => {
      const rect = img.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight + 500; // Include some buffer
      const isBackgroundImage =
        img.src.includes('homepage_header_bg') ||
        img.src.includes('site-bg') ||
        img.src.includes('bg-footer') ||
        img.src.includes('bg_footer') ||
        img.src.includes('container1') ||
        img.src.includes('container2');
      const isCritical =
        img.hasAttribute('priority') ||
        img.src.includes('field_person') ||
        img.closest('[data-critical]') ||
        isBackgroundImage;
      return isInViewport || isCritical;
    });

    // Sort to prioritize background images first
    criticalImages.sort((a, b) => {
      const aIsBackground =
        a.src.includes('homepage_header_bg') ||
        a.src.includes('site-bg') ||
        a.src.includes('container');
      const bIsBackground =
        b.src.includes('homepage_header_bg') ||
        b.src.includes('site-bg') ||
        b.src.includes('container');
      if (aIsBackground && !bIsBackground) return -1;
      if (!aIsBackground && bIsBackground) return 1;
      return 0;
    });

    const imagePromises = criticalImages.map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        const onLoad = () => {
          img.removeEventListener('load', onLoad);
          img.removeEventListener('error', onError);
          resolve();
        };

        const onError = () => {
          img.removeEventListener('load', onLoad);
          img.removeEventListener('error', onError);
          resolve(); // Resolve anyway to not block loading
        };

        img.addEventListener('load', onLoad);
        img.addEventListener('error', onError);

        // Reduced timeout for faster loading
        const isBackgroundImage =
          img.src.includes('homepage_header_bg') ||
          img.src.includes('site-bg') ||
          img.src.includes('container');
        const timeout = isBackgroundImage ? 1500 : 800; // 1.5s for backgrounds, 800ms for others

        setTimeout(() => {
          img.removeEventListener('load', onLoad);
          img.removeEventListener('error', onError);
          resolve();
        }, timeout);
      });
    });

    await Promise.all(imagePromises);
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadAssets = async () => {
      try {
        // Initial progress
        if (!mounted) return;
        setProgress(10);

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
          await new Promise((resolve) => {
            const handler = () => {
              document.removeEventListener('DOMContentLoaded', handler);
              resolve(void 0);
            };
            document.addEventListener('DOMContentLoaded', handler);
          });
        }

        if (!mounted) return;
        setProgress(25);

        // Wait for fonts
        if ('fonts' in document) {
          await Promise.race([
            document.fonts.ready,
            new Promise((resolve) => setTimeout(resolve, 1000)),
          ]);
        }

        if (!mounted) return;
        setProgress(40);

        // Small delay to ensure DOM is fully painted
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (!mounted) return;
        setProgress(50);

        // Wait for critical images
        await waitForImages();

        if (!mounted) return;
        setProgress(80);

        // Wait for window load event
        if (document.readyState !== 'complete') {
          await Promise.race([
            new Promise((resolve) => {
              if (document.readyState === 'complete') {
                resolve(void 0);
              } else {
                window.addEventListener('load', () => resolve(void 0), {
                  once: true,
                });
              }
            }),
            new Promise((resolve) => setTimeout(resolve, 2000)),
          ]);
        }

        if (!mounted) return;
        setProgress(95);

        // Final delay for smooth transition
        await new Promise((resolve) => setTimeout(resolve, 200));

        if (!mounted) return;
        finishLoading();
      } catch (error) {
        console.warn('Asset loading encountered issues:', error);
        if (mounted) finishLoading();
      }
    };

    // Start loading after a short delay to ensure DOM is ready
    const timer = setTimeout(loadAssets, 50);

    // Safety timeout - force finish after 2 seconds max
    const safetyTimeout = setTimeout(() => {
      if (mounted) {
        console.warn('⚠️ Safety timeout reached - forcing completion');
        finishLoading();
      }
    }, 2000);

    return () => {
      mounted = false;
      clearTimeout(timer);
      clearTimeout(safetyTimeout);
    };
  }, [finishLoading, waitForImages]);

  return {
    isLoading,
    progress,
    isComplete,
  };
};
