import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Performance optimizations
  reactStrictMode: false, // Disable for faster dev
  poweredByHeader: false,
  compress: true,
  
  // Experimental features for better performance
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_IMAGE_BASE_URL
        ? [
            {
              protocol: 'https' as const,
              hostname: process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
              port: '',
              pathname: '/**',
            },
          ]
        : []),
      {
        protocol: 'https' as const,
        hostname: 'eber-api.agepedia.info',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'eber-api.agepedia.infouploads',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Turbopack configuration for path aliases
  turbopack: {
    resolveAlias: {
      '@': './src',
      '@/components': './src/components',
      '@/containers': './src/containers',
      '@/contexts': './src/contexts',
      '@/hooks': './src/hooks',
      '@/public': './public',
      '@/utils': './src/utils',
      '@/lib': './src/lib',
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/containers': path.resolve(__dirname, 'src/containers'),
      '@/contexts': path.resolve(__dirname, 'src/contexts'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/public': path.resolve(__dirname, 'public'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
      fs: false,
      path: false,
    };
    return config;
  },
};

export default nextConfig;
