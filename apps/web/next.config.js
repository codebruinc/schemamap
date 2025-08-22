/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: 'output: export' disables API routes needed for Stripe payments
  // Only use export mode for static-only deployments without payment features
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig