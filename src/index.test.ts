import merge from "lodash.merge"
import postcss from "postcss"
import tailwindcss, { Config } from "tailwindcss"
import { describe, test } from "vitest"
import { generateAllClayCss, generateClayCss, tailwindcssClay } from "./main"

describe.each([
  {
    colors: [
      {
        name: "red",
        background: "#f87171",
        insetShadowPrimary: "#ef4444",
        insetShadowSecondary: "#fca5a5",
      },
      {
        name: "orange",
        background: "#fb923c",
        insetShadowPrimary: "#f97316",
        insetShadowSecondary: "#fdba74",
      },
    ],
    shadows: [
      {
        name: "medium",
        acronym: "md",
        outset: "8px 8px 16px rgba(0, 0, 0, .25)",
        insetPrimary: "inset -8px -8px 32px",
        insetSecondary: "inset 8px 8px 16px",
        insetModifier: "inset -2px -2px 4px #fafafa",
      },
      {
        name: "small",
        acronym: "sm",
        outset: "4px 4px 8px rgba(0, 0, 0, .25)",
        insetPrimary: "inset -4px -4px 16px",
        insetSecondary: "inset 4px 4px 8px",
        insetModifier: "inset -1px -1px 2px #fafafa",
      },
    ],
  },
])("generate clay css", ({ colors, shadows }) => {
  test("generate a clay css with a color and a shadow", ({ expect }) => {
    const red = colors[0]
    const mediumRed = {
      [".clay-md-red"]: {
        backgroundColor: "#f87171",
        boxShadow:
          "8px 8px 16px rgba(0, 0, 0, .25),inset -8px -8px 32px #ef4444,inset 8px 8px 16px #fca5a5,inset -2px -2px 4px #fafafa",
      },
    }
    const smallRed = {
      [".clay-sm-red"]: {
        backgroundColor: "#f87171",
        boxShadow:
          "4px 4px 8px rgba(0, 0, 0, .25),inset -4px -4px 16px #ef4444,inset 4px 4px 8px #fca5a5,inset -1px -1px 2px #fafafa",
      },
    }
    expect(generateClayCss(red, shadows[0])).toEqual(mediumRed)
    expect(generateClayCss(red, shadows[1])).toEqual(smallRed)
  })
  test("generate clay css with colors and shadows", ({ expect }) => {
    const aimedClayCss = [
      {
        [".clay-md-red"]: {
          backgroundColor: "#f87171",
          boxShadow:
            "8px 8px 16px rgba(0, 0, 0, .25),inset -8px -8px 32px #ef4444,inset 8px 8px 16px #fca5a5,inset -2px -2px 4px #fafafa",
        },
      },
      {
        [".clay-sm-red"]: {
          backgroundColor: "#f87171",
          boxShadow:
            "4px 4px 8px rgba(0, 0, 0, .25),inset -4px -4px 16px #ef4444,inset 4px 4px 8px #fca5a5,inset -1px -1px 2px #fafafa",
        },
      },
      {
        [".clay-md-orange"]: {
          backgroundColor: "#fb923c",
          boxShadow:
            "8px 8px 16px rgba(0, 0, 0, .25),inset -8px -8px 32px #f97316,inset 8px 8px 16px #fdba74,inset -2px -2px 4px #fafafa",
        },
      },
      {
        [".clay-sm-orange"]: {
          backgroundColor: "#fb923c",
          boxShadow:
            "4px 4px 8px rgba(0, 0, 0, .25),inset -4px -4px 16px #f97316,inset 4px 4px 8px #fdba74,inset -1px -1px 2px #fafafa",
        },
      },
    ]
    expect(generateAllClayCss({ colors, shadows })).toEqual(aimedClayCss)
  })
})

const generatePluginCss = (config: Config) => {
  const sandboxConfig: Config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {},
    plugins: [tailwindcssClay],
  }
  const postcssPlugins = [tailwindcss(merge(sandboxConfig, config))]

  return postcss(postcssPlugins)
    .process("@tailwind utilities", { from: undefined })
    .then((result) => result.css)
}

describe("plugin", () => {
  test("generate default clay css with no config", async ({ expect }) => {
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
    }
    await expect(
      generatePluginCss({
        content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
      })
    ).resolves.toEqual(aimedClayCss)
  })
})
