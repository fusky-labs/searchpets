/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
  ],
  theme: {
    fontFamily: {
      'open-sans': ["Open Sans", ...defaultTheme.fontFamily.sans],
      'inter': ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      borderRadius: {
        full: '50%',
      },
    },
  },
  plugins: [],
}
