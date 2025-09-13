'use client';
import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

interface LoadingPageProps {
  progress?: number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ progress = 0 }) => {
  return (
    <Box
      className="eber-loading-container"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 50%, #6b46c1 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* Industrial Background Elements */}
      <div className="eber-bg-grid"></div>
      <div className="eber-bg-shapes">
        <div className="eber-shape eber-shape-1"></div>
        <div className="eber-shape eber-shape-2"></div>
        <div className="eber-shape eber-shape-3"></div>
      </div>
      
      {/* Geometric accent */}
      <div className="eber-accent-line"></div>

      {/* EBER Logo Section */}
      <Box className="eber-brand-section" sx={{ mb: 5, textAlign: 'center', position: 'relative', zIndex: 10 }}>
        {/* Logo with industrial styling */}
        <Box className="eber-logo-container" sx={{ mb: 2 }}>
          <Typography
            className="eber-logo-text"
            sx={{
              fontFamily: 'var(--font-plus-jakarta-sans)',
              fontWeight: 900,
              fontSize: { xs: '3.5rem', md: '5rem' },
              background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #ffffff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 8px 32px rgba(245, 158, 11, 0.3)',
              letterSpacing: '4px',
              lineHeight: 1,
              position: 'relative',
            }}
          >
            EBER
          </Typography>
          <div className="eber-logo-underline"></div>
        </Box>
        
        {/* Tagline */}
        <Typography
          variant="h6"
          className="eber-tagline"
          sx={{
            fontFamily: 'var(--font-plus-jakarta-sans)',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.9)',
            letterSpacing: '2px',
            fontSize: { xs: '1rem', md: '1.2rem' },
            textTransform: 'uppercase',
            mb: 1,
          }}
        >
          Innovating as Sustainable Future
        </Typography>
        
        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'var(--font-plus-jakarta-sans)',
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.7)',
            letterSpacing: '1px',
            fontSize: { xs: '0.85rem', md: '0.95rem' },
          }}
        >
          High Performance Materials
        </Typography>
      </Box>

      {/* Industrial Loading Animation */}
      <Box className="eber-loading-animation" sx={{ mb: 4 }}>
        <div className="eber-gear-container">
          <div className="eber-gear eber-gear-large"></div>
          <div className="eber-gear eber-gear-medium"></div>
          <div className="eber-gear eber-gear-small"></div>
        </div>
      </Box>

      {/* Progress Section */}
      <Box className="eber-progress-section" sx={{ width: { xs: '85%', md: '450px' }, mb: 3 }}>
        {/* Progress Bar */}
        <Box sx={{ mb: 1.5, position: 'relative' }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #fcd34d 100%)',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              },
            }}
          />
          {/* Progress indicator */}
          <Box
            className="eber-progress-indicator"
            sx={{
              position: 'absolute',
              left: `${progress}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              boxShadow: '0 0 15px rgba(245, 158, 11, 0.8)',
              transition: 'left 0.3s ease-out',
            }}
          />
        </Box>
        
        {/* Loading Text */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'var(--font-plus-jakarta-sans)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
              fontSize: '0.9rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Loading System
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'var(--font-plus-jakarta-sans)',
              color: '#fbbf24',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '1px',
            }}
          >
            {Math.round(progress)}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingPage;
