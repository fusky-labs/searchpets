// https://nuxt.com/docs/api/configuration/nuxt-config

const __c_id = process.env.CLARITY_ID || "undefined"
const CLARITY_INJECT = `
  (function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "${__c_id}");
`

export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@nuxt/content",
    "@nuxt/image-edge",
    "@nuxtjs/color-mode"
  ],
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]]
  },
  css: ["~/assets/css/main.scss"],
  components: [
    {
      path: "~/components",
      global: true
    }
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        dir: "ltr"
      },
      link: [
        { rel: "shortcut icon", href: "./sp-logo.png", fetchpriority: "high" }
      ],
      meta: [
        { "http-equiv": "X-UA-Compatible", "content": "IE=edge;chrome=1" },
        { property: "og:site_name", content: "Searchpets!" }
      ],
      script: [
        {
          type: "text/javascript",
          innerHTML: CLARITY_INJECT
        }
      ]
    }
  },
  routeRules: {
    "/about": { static: true }
  },
  srcDir: "src/",
  webpack: {
    optimizeCSS: true
  },
  nitro: {
    prerender: {
      routes: ["/sitemap.xml"]
    }
  },
  runtimeConfig: {
    REDIS_URL: process.env.REDIS_URL,
    public: {
      COMMIT_SHA: process.env.NUXT_ENV_VERCEL_GIT_COMMIT_SHA
    }
  },
  image: {
    domains: [
      "housepetscomic.com",
      "www.housepetscomic.com",
      "housepetscomic.fandom.com",
      "weasyl.com",
      "res.cloudinary.com"
    ],
    cloudinary: {
      baseURL: "https://res.cloudinary.com/kuroji-fusky-s3/image/upload/"
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  typescript: {
    shim: false,
    strict: true
  }
})
