/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingExcludes: {
    '*': ['**/@swc/core*', '**/@esbuild*', '**/webpack*'],
  },
}

module.exports = nextConfig
