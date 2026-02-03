/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_DEV_OVERLAY: 'false',
  },
  experimental: {
    devOverlay: false,
  },
}

export default nextConfig