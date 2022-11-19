// @ts-check

/**
 *  @type {import('next').NextConfig}
 **/
module.exports = async (phase) => {
	const withPlugins = require("next-compose-plugins")

	const runtimeCaching = require('next-pwa/cache')
	runtimeCaching[0].handler = 'StaleWhileRevalidate'

	const withPWA = require('next-pwa')({
		dest: "public",
		disable: process.env.NODE_ENV === "development",
		register: true,
		runtimeCaching
	});

	const nextConfig = {
		reactStrictMode: true,
		swcMinify: true,
		compress: true,
		compiler: {
			removeConsole: process.env.NODE_ENV !== "development"
		},
		images: {
			domains: ["www.housepetscomic.com"],
			formats: ["image/webp"]
		},
	}

	const defaultConfig = {}

	return withPlugins(
		[
			withPWA
		],
		nextConfig
	)(phase, { defaultConfig })
}
