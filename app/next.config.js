/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  optimizeFonts: false,
  images: {
    domains: ['www.housepetscomic.com']
  }
}

module.exports = nextConfig
