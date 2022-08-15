/// <reference types="vitest" />
/// <reference types="vite/client" />
import { resolve } from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/export.ts"),
      formats: ["cjs"],
      fileName: (format) => (format === "cjs" ? "index.cjs" : "index.js"),
    },
    outDir: "dist",
  },
  resolve: {
    alias: { "~": resolve(__dirname, "src") },
  },
  test: {
    restoreMocks: true,
  },
})
