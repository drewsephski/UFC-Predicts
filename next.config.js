/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Configure base path for GitHub Pages deployment
  basePath: isProd ? '/UFC-Predicts' : '',
  assetPrefix: isProd ? '/UFC-Predicts/' : '',

  // Enable static exports for GitHub Pages
  output: 'export',

  // Configure image optimization
  images: {
    unoptimized: true, // Required for static export
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/UFC-Predicts' : '',
  },

  // Enable source maps in production for debugging
  productionBrowserSourceMaps: true,

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

module.exports = nextConfig;
