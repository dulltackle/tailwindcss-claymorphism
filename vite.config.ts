/// <reference types="vitest" />
/// <reference types="vite/client" />
import { resolve } from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      formats: ["cjs"],
      name: "TailwindcssClay",
      fileName: "index",
    },
    outDir: "lib",
  },
  resolve: {
    alias: { "~": resolve(__dirname, "src") },
  },
  test: {
    restoreMocks: true,
  },
})
