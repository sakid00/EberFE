'use client';

import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
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
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface ThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ThemeWrapper;
