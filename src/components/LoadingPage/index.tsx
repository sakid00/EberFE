'use client';
import React from 'react';
import { ModernLoadingScreen } from '../ModernLoadingScreen';

const LoadingPage: React.FC = () => {
  return <ModernLoadingScreen showLogo={true} compact={false} />;
};

export default LoadingPage;
