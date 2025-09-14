'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface ModernLoadingScreenProps {
  message?: string;
  showLogo?: boolean;
  compact?: boolean;
}

export const ModernLoadingScreen: React.FC<ModernLoadingScreenProps> = ({
  message = "Loading...",
  showLogo = true,
  compact = false
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2d4a73 20%, #4a5d8a 40%, #6b5b95 60%, #8e4ec6 80%, #b83dcc 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern with matching gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(ellipse at 25% 20%, rgba(255,215,0,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(139,69,19,0.1) 0%, transparent 70%)
          `,
          zIndex: 1,
        }}
      />

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
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: compact ? '2.5rem' : '4rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 30%, #ffb347 60%, #ffffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '6px',
                marginBottom: compact ? '12px' : '24px',
                textShadow: '0 6px 12px rgba(255,140,0,0.4)',
                filter: 'drop-shadow(0 0 20px rgba(255,165,0,0.3))',
              }}
            >
              EBER
            </Typography>
          </motion.div>
        )}

        {/* Tagline */}
        {showLogo && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: compact ? '0.875rem' : '1rem',
                fontWeight: 300,
                color: 'rgba(255, 255, 255, 0.8)',
                letterSpacing: '1px',
                marginBottom: compact ? '20px' : '40px',
              }}
            >
              Excellence in Every Detail
            </Typography>
          </motion.div>
        )}

        {/* Loading Animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          {/* Modern Progress Bar */}
          <Box
            sx={{
              width: compact ? '200px' : '300px',
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
                ease: "easeInOut",
              }}
              style={{
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,140,0,0.6) 50%, transparent 100%)',
              }}
            />
          </Box>
          
          {/* Animated Dots */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
            }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{
                  scale: [1, 1.4, 1],
                  y: [-2, -8, -2],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeInOut",
                }}
                style={{
                  width: compact ? '10px' : '14px',
                  height: compact ? '10px' : '14px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff8c00, #ffa500)',
                  margin: '0 8px',
                  boxShadow: '0 0 15px rgba(255,140,0,0.6), 0 0 30px rgba(255,165,0,0.3)',
                }}
              />
            ))}
          </Box>

          {/* Loading Text */}
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: compact ? '0.75rem' : '0.9rem',
              fontWeight: 500,
              letterSpacing: '0.8px',
              textAlign: 'center',
            }}
          >
            {message}
          </Typography>
          
          {/* Subtitle */}
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: compact ? '0.65rem' : '0.75rem',
              fontWeight: 300,
              letterSpacing: '0.5px',
              textAlign: 'center',
              marginTop: '8px',
              fontStyle: 'italic',
            }}
          >
            Powering innovation across industries
          </Typography>
        </motion.div>
      </Box>

      {/* Floating Elements - Industrial Style */}
      <motion.div
        animate={{
          y: [-8, 12, -8],
          x: [-3, 3, -3],
          rotate: [0, 360],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '80px',
          height: '80px',
          borderRadius: '12px',
          background: 'linear-gradient(45deg, rgba(255,140,0,0.15) 0%, rgba(255,165,0,0.08) 50%, transparent 100%)',
          border: '1px solid rgba(255,140,0,0.2)',
          zIndex: 1,
        }}
      />

      <motion.div
        animate={{
          y: [12, -8, 12],
          x: [3, -3, 3],
          rotate: [0, -180],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '60px',
          height: '60px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, rgba(255,165,0,0.12) 0%, rgba(255,140,0,0.06) 100%)',
          border: '1px solid rgba(255,165,0,0.15)',
          zIndex: 1,
        }}
      />

      {/* Additional industrial accent */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          position: 'absolute',
          top: '60%',
          left: '75%',
          width: '100px',
          height: '20px',
          borderRadius: '20px',
          background: 'linear-gradient(90deg, rgba(255,140,0,0.1) 0%, transparent 100%)',
          zIndex: 1,
        }}
      />
    </Box>
  );
};

// Compact version for component-level loading
export const CompactLoadingScreen: React.FC<{ message?: string }> = ({ 
  message = "Loading..." 
}) => {
  return (
    <ModernLoadingScreen 
      message={message} 
      showLogo={false} 
      compact={true} 
    />
  );
};

// Header-specific loading with matching design
export const HeaderLoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100px', // Header height
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2d4a73 20%, #4a5d8a 40%, #6b5b95 60%, #8e4ec6 80%, #b83dcc 100%)',
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
      <Box sx={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center' }}>
        {/* Animated Logo */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 30%, #ffb347 60%, #ffffff 100%)',
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

        {/* Loading Dots */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.25,
                ease: "easeInOut",
              }}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff8c00, #ffa500)',
                margin: '0 4px',
                boxShadow: '0 0 12px rgba(255,140,0,0.7), 0 0 24px rgba(255,165,0,0.3)',
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ModernLoadingScreen;
