'use client';
import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale, .animate-stagger'
      );

      animatedElements.forEach((el) => observer.observe(el));
    }, 500); // Wait 500ms after loading

    return () => {
      observer.disconnect();
    };
  }, []);
};
