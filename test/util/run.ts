import merge from "lodash.merge"
import path from "path"
import postcss from "postcss"
import tailwind, { Config } from "tailwindcss"
import { expect } from "vitest"
import tailwindcssClay from "~/export"

export * from "./strings"

export const runPlugin = async (userConfig: Config) => {
  const testName = expect.getState().currentTestName ?? "Test name not found"

  const sandboxConfig = merge(userConfig, {
    // for testing convenience, disable Tailwind outputting build-in classes
    corePlugins: [],
    // now Tailwind would only output classes from our plugin
    plugins: [tailwindcssClay],
  })

  // `"@tailwind utilities"` means that Tailwind would only output classes belonging to `utilities`
  // for more information about `utilities`, see https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer
  const result = await postcss(tailwind(sandboxConfig)).process("@tailwind utilities", {
    from: `${path.resolve(__filename)}?test=${testName}`,
  })

  return result.css
}
