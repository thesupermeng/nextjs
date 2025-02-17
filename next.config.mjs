import path from 'path';


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY',
  //         },
  //         {
  //           key: 'Content-Security-Policy',
  //           value: "frame-ancestors 'none';",
  //         },
  //       ],
  //     },
  //   ];
  // },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.yingshi.tv/:path*',
      },
    ];
  },

  transpilePackages: ['crypto-js'],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    unoptimized: true,
    minimumCacheTTL: 600,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(process.cwd(), 'src');
    return config;
  },
};

export default nextConfig;
