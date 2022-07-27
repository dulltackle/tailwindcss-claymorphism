/// <reference types="vitest" />
/// <reference types="vite/client" />
import { resolve } from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    alias: { "~": resolve(__dirname, "src") },
  },
  test: {
    restoreMocks: true,
  },
})
