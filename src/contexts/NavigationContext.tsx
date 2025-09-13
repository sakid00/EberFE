'use client';
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface NavigationContextType {
  isNavigating: boolean;
  isFirstLoad: boolean;
  navigateTo: (path: string) => void;
  setNavigationComplete: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: React.ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);
  const navigationTimeout = useRef<NodeJS.Timeout | null>(null);

  // Track navigation state
  useEffect(() => {
    if (previousPathname.current === null) {
      previousPathname.current = pathname;
      return;
    }

    if (previousPathname.current !== pathname) {
      console.log('🚀 Fast navigation context:', previousPathname.current, '->', pathname);
      setIsFirstLoad(false);
      setIsNavigating(true);
      
      // Auto-complete navigation immediately
      navigationTimeout.current = setTimeout(() => {
        setIsNavigating(false);
        console.log('⏰ Navigation auto-completed');
      }, 10); // Sangat cepat - hampir instan
      
      previousPathname.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    // Mark first load as complete once we've been mounted
    const timer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 2000); // After initial loading period

    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (path: string) => {
    if (path === pathname) return; // Don't navigate to same page
    
    console.log('🎯 Initiating navigation to:', path);
    setIsNavigating(true);
    router.push(path);
  };

  const setNavigationComplete = () => {
    if (navigationTimeout.current) {
      clearTimeout(navigationTimeout.current);
      navigationTimeout.current = null;
    }
    setIsNavigating(false);
    console.log('✅ Navigation manually completed');
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (navigationTimeout.current) {
        clearTimeout(navigationTimeout.current);
      }
    };
  }, []);

  const contextValue: NavigationContextType = {
    isNavigating,
    isFirstLoad,
    navigateTo,
    setNavigationComplete,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
