'use client';
import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

interface LoadingPageProps {
  progress?: number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ progress = 0 }) => {
  return (
    <Box
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
      }}
    >
      {/* Simple EBER Logo */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          sx={{
            fontFamily: 'var(--font-plus-jakarta-sans)',
            fontWeight: 900,
            fontSize: { xs: '3rem', md: '4rem' },
            background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #ffffff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '4px',
            mb: 1,
          }}
        >
          EBER
        </Typography>
        
        <Typography
          sx={{
            fontFamily: 'var(--font-plus-jakarta-sans)',
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: { xs: '0.9rem', md: '1rem' },
            letterSpacing: '1px',
          }}
        >
          Excellence in Every Detail
        </Typography>
      </Box>

      {/* Simple Progress Bar */}
      <Box sx={{ width: { xs: '80%', md: '400px' }, mb: 2 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 2,
              background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
              boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)',
            },
          }}
        />
      </Box>

      {/* Simple Loading Text */}
      <Typography
        sx={{
          fontFamily: 'var(--font-plus-jakarta-sans)',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.9rem',
        }}
      >
        Loading... {Math.round(progress)}%
      </Typography>
    </Box>
  );
};

export default LoadingPage;
