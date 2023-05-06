/** @type {import('tailwindcss').Config} */
const pluginBaseStyles = require("tailwindcss/plugin")
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      fontFamily: {
        "inter": ["Inter", ...defaultTheme.fontFamily.sans],
        "open-sans": ["Open Sans", ...defaultTheme.fontFamily.sans]
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
