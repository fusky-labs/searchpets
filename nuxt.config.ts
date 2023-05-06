// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [],
  css: ["~/assets/css/main.scss"],
  app: {
    head: {
      meta: [{ property: "og:site_name", content: "Searchpets!" }],
      link: [{ rel: "shortcut icon", href: "./sp-logo.png" }]
    }
  },
  typescript: {
    shim: false,
    strict: true
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
