/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  compiler: {
    removeConsole: true,
  },
  images: {
    domains: ['www.housepetscomic.com']
  },
}

module.exports = nextConfig
