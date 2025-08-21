/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
  // Force all pages to be dynamic - no static generation
  generateStaticParams: () => [],
  // Skip static optimization completely
  poweredByHeader: false,
}

module.exports = nextConfig