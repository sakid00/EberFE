'use client';
import { useEffect, useRef } from 'react';

const ANIMATION_SELECTOR = '.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale, .animate-stagger';

export const useScrollAnimation = (deps: unknown[] = []) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    // Create intersection observer
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, observerOptions);

    const observeElements = () => {
      const animatedElements = document.querySelectorAll(ANIMATION_SELECTOR);
      animatedElements.forEach((el) => {
        // Only observe elements that don't already have animate-visible
        if (!el.classList.contains('animate-visible') && observerRef.current) {
          observerRef.current.observe(el);
        }
      });
    };

    // Initial observation with small delay to ensure DOM is ready
    const timeoutId = setTimeout(observeElements, 100);

    // Create mutation observer to watch for new animated elements
    mutationObserverRef.current = new MutationObserver((mutations) => {
      let shouldReobserve = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
              // Check if the node itself or its children have animation classes
              if (node.matches?.(ANIMATION_SELECTOR) || node.querySelector?.(ANIMATION_SELECTOR)) {
                shouldReobserve = true;
              }
            }
          });
        }
      });
      if (shouldReobserve) {
        // Small delay to let the DOM settle
        setTimeout(observeElements, 50);
      }
    });

    mutationObserverRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeoutId);
      observerRef.current?.disconnect();
      mutationObserverRef.current?.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
