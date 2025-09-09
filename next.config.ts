import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
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
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
      '@/components': require('path').resolve(__dirname, 'src/components'),
      '@/containers': require('path').resolve(__dirname, 'src/containers'),
      '@/contexts': require('path').resolve(__dirname, 'src/contexts'),
      '@/hooks': require('path').resolve(__dirname, 'src/hooks'),
      '@/public': require('path').resolve(__dirname, 'public'),
      '@/utils': require('path').resolve(__dirname, 'src/utils'),
      '@/lib': require('path').resolve(__dirname, 'src/lib'),
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
