'use client';
import React from 'react';
import { ModernLoadingScreen } from '../ModernLoadingScreen';

interface LoadingPageProps {
  progress?: number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ progress = 0 }) => {
  return (
    <ModernLoadingScreen 
      message={`Loading... ${Math.round(progress)}%`}
      showLogo={true}
      compact={false}
    />
  );
};

export default LoadingPage;
