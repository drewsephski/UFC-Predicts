/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "randomuser.me"
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com"
            },
            {
                protocol: "https",
                hostname: "cdn.ufc.com"
            },
            {
                protocol: "https",
                hostname: "dmxg5wxfqgb4u.cloudfront.net"
            }
        ]
    },
    // Optimize performance
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    // Improve build performance
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn'],
        } : false,
    },
    // Improve runtime performance
    experimental: {
        optimizeCss: true,
        optimizePackageImports: [
            'lucide-react',
            '@radix-ui/react-icons',
            'date-fns',
            'framer-motion',
            'recharts'
        ],
    }
};

export default nextConfig;
