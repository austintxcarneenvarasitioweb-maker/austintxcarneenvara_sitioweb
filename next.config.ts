import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    localPatterns: [
      { pathname: '/api/media/file/**' },
      { pathname: '/images/**' },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
