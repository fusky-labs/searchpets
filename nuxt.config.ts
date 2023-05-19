// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]]
      }
    ],
    "@nuxt/image-edge",
    "@nuxtjs/color-mode"
  ],
  css: ["~/assets/css/main.scss"],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        dir: "ltr"
      },
      link: [
        { rel: "shortcut icon", href: "./sp-logo.png", fetchpriority: "high" }
      ],
      meta: [{ property: "og:site_name", content: "Searchpets!" }]
    }
  },
  typescript: {
    shim: false,
    strict: true
  },
  webpack: {
    optimizeCSS: true
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
