/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["test/e2e/main.ts"],
  theme: {
    extend: {},
  },
  plugins: [require("./dist/index.cjs")],
}
