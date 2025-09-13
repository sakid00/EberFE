'use client';

import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import createEmotionCache from '@/lib/createEmotionCache';

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

// Create Material-UI theme with Plus Jakarta Sans
const theme = createTheme({
  typography: {
    fontFamily: font.style.fontFamily,
  },
  // Disable ripple effect globally to prevent hydration mismatches
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface ThemeWrapperProps {
  children: React.ReactNode;
  emotionCache?: EmotionCache;
}

const ThemeWrapper = ({ 
  children, 
  emotionCache = clientSideEmotionCache 
}: ThemeWrapperProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ThemeWrapper;
