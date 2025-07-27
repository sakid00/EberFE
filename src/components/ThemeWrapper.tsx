'use client';

import { ThemeProvider, createTheme } from '@mui/material';
import { Plus_Jakarta_Sans } from 'next/font/google';

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
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: font.style.fontFamily,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: font.style.fontFamily,
        },
      },
    },
  },
});

interface ThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper; 