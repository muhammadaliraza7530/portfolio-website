import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['3000-firebase-protfolio-1778831589519.cluster-ancjwrkgr5dvux4qug5rbzyc2y.cloudworkstations.dev'],
};

export default nextConfig;
