// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
    output: process.env.DEPLOY_TARGET === 'github' ? 'export' : 'standalone',
    images: {
        unoptimized: process.env.DEPLOY_TARGET === 'github',
      },
    ...(process.env.NETLIFY === 'true' && {
        // Netlify-specific configurations
        output: 'standalone',
        images: {
          unoptimized: false,
        },
      }),

      // Other Next.js configurations
      reactStrictMode: true,
      swcMinify: true,
      // Add other configurations as needed
    };

    export default nextConfig;