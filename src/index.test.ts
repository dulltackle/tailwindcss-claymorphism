// import merge from "lodash.merge"
// import postcss from "postcss"
// import tailwindcss, { Config } from "tailwindcss"
// import plugin from "./main"

import { expect, test } from "vitest"
import { generateClayCss } from "./main"

test("generate a clay css with a color and a shadow", () => {
  const red = {
    name: "red",
    backgroundColor: "#f87171",
    insetShadowColorPrimary: "#ef4444",
    insetShadowColorSecondary: "#fca5a5",
  }
  const medium = {
    outsetShadow: "8px 8px 16px rgba(0 ,0, 0, .25)",
    insetShadowPrimary: "inset -8px -8px 32px",
    insetShadowSecondary: "inset 8px 8px 16px",
    insetShadowModifier: "inset -2px -2px 4px #fafafa",
  }
  const aimedClayCss = {
    [".clay-md-red"]: {
      backgroundColor: "#f87171",
      boxShadow: `8px 8px 16px rgba(0 ,0, 0, .25),inset -8px -8px 32px #ef4444,inset 8px 8px 16px #fca5a5,inset -2px -2px 4px #fafafa`,
    },
  }
  expect(generateClayCss(red, "medium", medium)).toEqual(aimedClayCss)
})

// const generatePluginCss = (testConfig = {}, pluginOptions = {}) => {
//   const sandboxConfig: Config = {
//     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//     theme: {
//       colors: {
//         royalblue: {
//           400: "#5fa7fa",
//           500: "#2f7af9",
//         },
//         indigo: {
//           400: "#8994fa",
//           500: "#6066fa",
//         },
//       },
//     },
//     plugins: [plugin()],
//   }
//   const postcssPlugins = [tailwindcss(merge(sandboxConfig, testConfig))]

//   return postcss(postcssPlugins)
//     .process("@tailwind utilities", { from: undefined })
//     .then((result) => result.css)
// }
