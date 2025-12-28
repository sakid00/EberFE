import { withSentryConfig } from '@sentry/nextjs';
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
    // Image optimization - AVIF first (smaller), then WebP fallback
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024],
    minimumCacheTTL: 31536000, // Cache optimized images for 1 year
    // SVG support and security
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_IMAGE_BASE_URL
        ? [
            {
              protocol: 'https' as const,
              // Extract hostname only (remove https:// and any trailing path)
              hostname: process.env.NEXT_PUBLIC_IMAGE_BASE_URL.replace(
                /^https?:\/\//,
                ''
              ).replace(/\/.*$/, ''),
              port: '',
              pathname: '/**',
            },
          ]
        : []),
      {
        protocol: 'https' as const,
        hostname: 'fish.ebergroup.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'fish.ebergroup.com',
        port: '',
        pathname: '/uploads/**',
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
  // Security and cache headers
  async headers() {
    // Security headers to protect against XSS and other attacks
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
    ];

    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/photo/:path*',
        headers: [
          ...securityHeaders,
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/background/:path*',
        headers: [
          ...securityHeaders,
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icon/:path*',
        headers: [
          ...securityHeaders,
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'synera-xx',

  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
