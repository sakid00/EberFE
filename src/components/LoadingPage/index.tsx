'use client';
import React from 'react';
import { ModernLoadingScreen } from '../ModernLoadingScreen';

interface LoadingPageProps {
  progress?: number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ progress = 0 }) => {
  return (
    <ModernLoadingScreen showLogo={true} compact={false} progress={progress} />
  );
};

export default LoadingPage;
