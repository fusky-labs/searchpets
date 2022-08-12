/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  experimental: {
    nextScriptWorkers: true,
  },
  images: {
    domains: ['www.housepetscomic.com']
  },
}

module.exports = nextConfig
