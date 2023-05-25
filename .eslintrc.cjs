module.exports = {
  root: true,
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/prefer-regexp-exec": "warn",
    "@typescript-eslint/ban-types": "error"
  }
}
