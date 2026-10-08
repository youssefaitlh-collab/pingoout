import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/category/:slug', destination: '/genres/:slug', permanent: true },
      { source: '/platform/:slug', destination: '/platforms/:slug', permanent: true },
    ]
  },
}

export default nextConfig
