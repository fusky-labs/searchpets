// @ts-check
const pluginBaseStyles = require("tailwindcss/plugin")
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      fontFamily: {
        "inter": ["Inter", ...defaultTheme.fontFamily.sans],
        "open-sans": ["Open Sans", ...defaultTheme.fontFamily.sans]
      },
      inset: {
        unset: "unset"
      },
      spacing: {
        unset: "unset"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    pluginBaseStyles(({ addBase, theme }) => {
      addBase({
        "html": {
          "overflowX": "hidden",
          "scrollBehavior": "smooth",
          "@media (prefers-reduced-motion)": {
            scrollBehavior: "auto"
          }
        },
        "body": {
          fontFamily: theme("fontFamily.open-sans")
        },
        "#__nuxt": {
          minHeight: "100vh"
        }
      })
    })
  ]
}
