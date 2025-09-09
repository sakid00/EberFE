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
