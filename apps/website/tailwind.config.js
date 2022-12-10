/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
	content: [
		"./src/pages/**/*.{js,jsx,ts,tsx}",
		"./src/components/**/*.{js,jsx,ts,tsx}",
		"./src/layout/index.tsx",
	],
  theme: {
    extend: {
			fontFamily: {
				"open-sans": ["Open Sans", ...defaultTheme.fontFamily.sans],
				inter: ["Inter", ...defaultTheme.fontFamily.sans]
			},
		},
  },
  plugins: [],
}
