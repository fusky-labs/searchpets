// @ts-check

/**
 *  @type {import('next').NextConfig}
 **/
module.exports = async (phase) => {
  const withPlugins = require("next-compose-plugins")
  const withMDX = require("@next/mdx")({
    extension : /\.mdx?$/,
    options : {providerImportSource : "@mdx-js/react"}
  })

  const nextConfig = {
    reactStrictMode : true,
    swcMinify : true,
    compress : true,
    experimental : {nextScriptWorkers : true},
    images :
        {domains : [ "www.housepetscomic.com" ], formats : [ "image/webp" ]}
  }

  const defaultConfig = {}

  return withPlugins(
      [ withMDX({pageExtensions : [ "ts", "tsx", "js", "jsx", "md", "mdx" ]}) ],
      nextConfig)(phase, {defaultConfig})
}
