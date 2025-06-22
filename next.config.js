/** *********************************************************************
 * Global Next.js configuration
 *  – Adds bundle-analysis support            (yarn analyze / npm run analyze)
 *  – Keeps GitHub-Pages static-export setup  (basePath / assetPrefix)
 *  – Enables extra performance features      (gzip, CSS optim)
 *  – Improves image handling (modern formats, remote domains)
 ********************************************************************* */

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// Lazy-load bundle-analyser only when requested (`ANALYZE=true`)
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Enable gzip compression for rendered responses (default = true, set explicitly)
  compress: true,

  // Configure base path for GitHub Pages deployment
  basePath: isProd ? '/UFC-Predicts' : '',
  assetPrefix: isProd ? '/UFC-Predicts/' : '',

  // Enable static exports for GitHub Pages
  output: 'export',

  // Configure image optimization
  images: {
    // Static export for GH-Pages still needs unoptimized images,
    // but keep modern formats & remote domains for local/server deployments.
    ...(isProd ? { unoptimized: true } : {}),
    formats: ['image/avif', 'image/webp'],
    // Remote images we expect to use (UFC official assets, etc.)
    domains: ['ufc.com', 'static.ufc.com', 'media.ufcstats.com'],
    // Cache TTL (seconds) for optimized images
    minimumCacheTTL: 60,
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/UFC-Predicts' : '',
  },

  // Enable source maps in production for debugging
  productionBrowserSourceMaps: true,

  // Small SWC / build-time optimisations
  experimental: {
    optimizeCss: true,
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Custom webpack configurations can go here
    return config;
  },

  // Configure headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Configure redirects if needed
  async redirects() {
    return [
      // Add any redirects here
    ];
  },

  // Configure rewrites if needed
  async rewrites() {
    return [
      // Add any rewrites here
    ];
  },
};

// Wrap with bundle analyzer (no-op unless ANALYZE=true)
module.exports = withBundleAnalyzer(nextConfig);
