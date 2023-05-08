/// <reference types="vitest" />
/// <reference types="vite/client" />
// import { resolve } from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  root: "test/e2e/",
  base: "/tailwindcss-claymorphism/",
})
