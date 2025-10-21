'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import logo from '@/public/eber_logo.png';
import Image from 'next/image';

interface ModernLoadingScreenProps {
  showLogo?: boolean;
  compact?: boolean;
}

export const ModernLoadingScreen: React.FC<ModernLoadingScreenProps> = ({
  showLogo = true,
  compact = false,
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          'linear-gradient(135deg, #1e3a5f 0%, #2d4a73 20%, #4a5d8a 40%, #6b5b95 60%, #8e4ec6 80%, #b83dcc 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Content Container */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: compact ? '20px' : '40px',
        }}
      >
        {/* Logo Animation */}
        {showLogo && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src={logo}
              alt="EBER Logo"
              style={{
                width: '95%',
                height: '70%',
                objectFit: 'contain',
                marginBottom: '20px',
              }}
            />
          </motion.div>
        )}

        {/* Loading Animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          {/* Modern Progress Bar */}
          <Box
            sx={{
              width: '100%',
              height: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              marginBottom: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255,140,0,0.2)',
            }}
          >
            <motion.div
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                width: '50%',
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,140,0,0.6) 50%, transparent 100%)',
              }}
            />
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

// Compact version for component-level loading
export const CompactLoadingScreen: React.FC = () => {
  return <ModernLoadingScreen showLogo={false} compact={true} />;
};

// Header-specific loading with matching design
export const HeaderLoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100px', // Header height
        background:
          'linear-gradient(135deg, #1e3a5f 0%, #2d4a73 20%, #4a5d8a 40%, #6b5b95 60%, #8e4ec6 80%, #b83dcc 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(ellipse at 30% 20%, rgba(255,215,0,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.06) 0%, transparent 50%)
          `,
        }}
      />

      {/* Loading Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Animated Logo */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 800,
              background:
                'linear-gradient(135deg, #ff8c00 0%, #ffa500 30%, #ffb347 60%, #ffffff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '3px',
              marginRight: '20px',
              filter: 'drop-shadow(0 0 10px rgba(255,140,0,0.4))',
            }}
          >
            EBER
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ModernLoadingScreen;
