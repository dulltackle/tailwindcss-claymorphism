// import merge from "lodash.merge"
// import postcss from "postcss"
// import tailwindcss, { Config } from "tailwindcss"
// import plugin from "./main"

import { expect, test } from "vitest"
import { generateAllClayCss, generateClayCss } from "./main"

test("generate a clay css with a color and a shadow", () => {
  const red = {
    name: "red",
    backgroundColor: "#f87171",
    insetShadowColorPrimary: "#ef4444",
    insetShadowColorSecondary: "#fca5a5",
  }
  const medium = {
    name: "medium",
    acronym: "md",
    outset: "8px 8px 16px rgba(0, 0, 0, .25)",
    insetPrimary: "inset -8px -8px 32px",
    insetSecondary: "inset 8px 8px 16px",
    insetModifier: "inset -2px -2px 4px #fafafa",
  }
  const aimedClayCss = {
    [".clay-md-red"]: {
      backgroundColor: "#f87171",
      boxShadow: `8px 8px 16px rgba(0, 0, 0, .25),inset -8px -8px 32px #ef4444,inset 8px 8px 16px #fca5a5,inset -2px -2px 4px #fafafa`,
    },
  }
  expect(generateClayCss(red, medium)).toEqual(aimedClayCss)
})

test("generate clay css with colors and shadows", ({ expect }) => {
  const colors = [
    {
      name: "red",
      backgroundColor: "#f87171",
      insetShadowColorPrimary: "#ef4444",
      insetShadowColorSecondary: "#fca5a5",
    },
    {
      name: "orange",
      backgroundColor: "#fb923c",
      insetShadowColorPrimary: "#f97316",
      insetShadowColorSecondary: "#fdba74",
    },
  ]
  const shadows = {
    medium: {
      outsetShadow: "8px 8px 16px rgba(0, 0, 0, .25)",
      insetShadowPrimary: "inset -8px -8px 32px",
      insetShadowSecondary: "inset 8px 8px 16px",
      insetShadowModifier: "inset -2px -2px 4px #fafafa",
    },
    small: {
      outsetShadow: "4px 4px 8px rgba(0, 0, 0, .25)",
      insetShadowPrimary: "inset -4px -4px 16px",
      insetShadowSecondary: "inset 4px 4px 8px",
      insetShadowModifier: "inset -1px -1px 2px #fafafa",
    },
  }
  const aimedClayCss = {
    [".clay-md-red"]: {
      backgroundColor: "#f87171",
      boxShadow:
        "8px 8px 16px rgba(0, 0, 0, .25),inset -8px -8px 32px #ef4444,inset 8px 8px 16px #fca5a5,inset -2px -2px 4px #fafafa",
    },
    [".clay-sm-red"]: {
      backgroundColor: "#f87171",
      boxShadow:
        "4px 4px 8px rgba(0, 0, 0, .25),inset -4px -4px 16px #ef4444,inset 4px 4px 8px #fca5a5,inset -1px -1px 2px #fafafa",
    },
    [".clay-md-orange"]: {
      backgroundColor: "#fb923c",
      boxShadow:
        "8px 8px 16px rgba(0, 0, 0, .25),inset -8px -8px 32px #f97316,inset 8px 8px 16px #fdba74,inset -2px -2px 4px #fafafa",
    },
    [".clay-sm-orange"]: {
      backgroundColor: "#fb923c",
      boxShadow:
        "4px 4px 8px rgba(0, 0, 0, .25),inset -4px -4px 16px #f97316,inset 4px 4px 8px #fdba74,inset -1px -1px 2px #fafafa",
    },
  }
  expect(generateAllClayCss(colors, shadows)).toEqual(aimedClayCss)
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
