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
      meta: [
        { "http-equiv": "X-UA-Compatible", "content": "IE=edge;chrome=1" },
        { property: "og:site_name", content: "Searchpets!" }
      ],
      script: [
        // prettier-ignore
        {
          type: "text/javascript",
          innerHTML: `
            (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.CLARITY_ID || 'undefined'}");
          `
        }
      ]
    }
  },
  typescript: {
    shim: false,
    strict: true
  },
  webpack: {
    optimizeCSS: true
  },

  image: {
    domains: [
      "www.housepetscomic.com",
      "housepetscomic.fandom.com",
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
  }
})
