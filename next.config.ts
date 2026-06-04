import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: false },
      { source: '/services', destination: '/#services', permanent: false },
      { source: '/work', destination: '/#work', permanent: false },
      { source: '/testimonials', destination: '/#testimonials', permanent: false },
      { source: '/training', destination: '/#training', permanent: false },
      { source: '/contact', destination: '/#contact', permanent: false },
      { source: '/process', destination: '/#process', permanent: false },
      { source: '/faq', destination: '/#faq', permanent: false },
    ];
  },
};

export default nextConfig;
