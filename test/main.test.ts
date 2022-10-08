import merge from "lodash.merge"
import postcss from "postcss"
import tailwindcss, { Config } from "tailwindcss"
import { beforeAll, describe, expect, test } from "vitest"
import { generateAllClayCss, generateClayCss, tailwindcssClay } from "~/main"
import { cssMatcher } from "./matcher"

beforeAll(() => {
  expect.extend({ toMatchCss: cssMatcher })
})

describe("test helper functions for generating clay utility class ", () => {
  test("generateClayCss() for generating a clay utility class with a color and a shadow", ({ expect }) => {
    const mockedColor: Color = {
      name: "navajo",
      background: "#e2c599",
      insetShadowPrimary: "#af967f",
      insetShadowSecondary: "#feeed4",
    }
    const mockedShadow: Shadow = {
      name: "large",
      acronym: "lg",
      outset: "12px 12px 24px rgba(0, 0, 0, .25)",
      insetPrimary: "inset -12px -12px 48px",
      insetSecondary: "inset 12px 12px 24px",
      insetModifier: "inset -3px -3px 6px #fafafa",
    }
    expect(generateClayCss(mockedColor, mockedShadow)).toEqual({
      [".clay-lg-navajo"]: {
        backgroundColor: "#e2c599",
        boxShadow: "12px 12px 24px rgba(0, 0, 0, .25),inset -12px -12px 48px #af967f,inset 12px 12px 24px #feeed4,inset -3px -3px 6px #fafafa",
      },
    })
  })

  const colors = [
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
  ]
  const shadows = [
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
  ]
  test("generate clay css with colors and shadows", ({ expect }) => {
    const aimedClayCss = [
      {
        [".clay-md-red"]: {
          backgroundColor: "#f87171",
          boxShadow: "8px 8px 16px rgba(0, 0, 0, .25),inset -8px -8px 32px #ef4444,inset 8px 8px 16px #fca5a5,inset -2px -2px 4px #fafafa",
        },
      },
      {
        [".clay-sm-red"]: {
          backgroundColor: "#f87171",
          boxShadow: "4px 4px 8px rgba(0, 0, 0, .25),inset -4px -4px 16px #ef4444,inset 4px 4px 8px #fca5a5,inset -1px -1px 2px #fafafa",
        },
      },
      {
        [".clay-md-orange"]: {
          backgroundColor: "#fb923c",
          boxShadow: "8px 8px 16px rgba(0, 0, 0, .25),inset -8px -8px 32px #f97316,inset 8px 8px 16px #fdba74,inset -2px -2px 4px #fafafa",
        },
      },
      {
        [".clay-sm-orange"]: {
          backgroundColor: "#fb923c",
          boxShadow: "4px 4px 8px rgba(0, 0, 0, .25),inset -4px -4px 16px #f97316,inset 4px 4px 8px #fdba74,inset -1px -1px 2px #fafafa",
        },
      },
    ]
    expect(generateAllClayCss({ colors, shadows })).toEqual(aimedClayCss)
  })
})

const generatePluginCss = async (config: Partial<Config>) => {
  const sandboxConfig: Config = {
    // set the range of files containing the class names
    content: ["./test/main.test.ts"],
    // for testing convenience, disable Tailwind outputting build-in classes
    corePlugins: [],
    // now Tailwind would only output classes from our plugin
    plugins: [tailwindcssClay],
  }
  const postcssPlugins = [tailwindcss(merge(sandboxConfig, config))]

  // `"@tailwind utilities"` means that Tailwind would only output classes belonging to `utilities`
  // for more information about `utilities`, see https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer
  // set `{ from: undefined }` just to peace PostCSS from warning
  const result = await postcss(postcssPlugins).process("@tailwind utilities", { from: undefined })
  return result.css
}

describe.each([
  {
    // with no config
    config: {},
    aimedClayCss: `
      .clay-md-red {
        background-color: #f87171;
        box-shadow: 8px 8px 16px rgba(0, 0, 0, .25), inset -8px -8px 32px #ef4444, inset 8px 8px 16px #fca5a5, inset -2px -2px 4px #fafafa;
      }
      .clay-sm-red {
        background-color: #f87171;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, .25), inset -4px -4px 16px #ef4444, inset 4px 4px 8px #fca5a5, inset -1px -1px 2px #fafafa;
      }
    `,
  },
  // with custom color
  {
    config: {
      theme: {
        extend: {
          clay: {
            colors: [
              {
                name: "orange",
                background: "#fb923c",
                insetShadowPrimary: "#f97316",
                insetShadowSecondary: "#fdba74",
              },
            ],
          },
        },
      },
    },
    aimedClayCss: `
      .clay-md-red {
        background-color: #f87171;
        box-shadow: 8px 8px 16px rgba(0, 0, 0, .25), inset -8px -8px 32px #ef4444, inset 8px 8px 16px #fca5a5, inset -2px -2px 4px #fafafa;
      }
      .clay-sm-red {
        background-color: #f87171;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, .25), inset -4px -4px 16px #ef4444, inset 4px 4px 8px #fca5a5, inset -1px -1px 2px #fafafa;
      }
      .clay-md-orange {
        background-color: #fb923c;
        box-shadow: 8px 8px 16px rgba(0, 0, 0, .25), inset -8px -8px 32px #f97316, inset 8px 8px 16px #fdba74, inset -2px -2px 4px #fafafa;
      }
      .clay-sm-orange {
        background-color: #fb923c;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, .25), inset -4px -4px 16px #f97316, inset 4px 4px 8px #fdba74, inset -1px -1px 2px #fafafa;
      }
    `,
  },
  // with custom shadow
  {
    config: {
      theme: {
        extend: {
          clay: {
            shadows: [
              {
                name: "large",
                acronym: "lg",
                outset: "8px 8px 16px rgba(0, 0, 0, .25)",
                insetPrimary: "inset -8px -8px 32px",
                insetSecondary: "inset 8px 8px 16px",
                insetModifier: "inset -2px -2px 4px #fafafa",
              },
            ],
          },
        },
      },
    },
    aimedClayCss: `
      .clay-md-red {
        background-color: #f87171;
        box-shadow: 8px 8px 16px rgba(0, 0, 0, .25), inset -8px -8px 32px #ef4444, inset 8px 8px 16px #fca5a5, inset -2px -2px 4px #fafafa;
      }
      .clay-sm-red {
        background-color: #f87171;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, .25), inset -4px -4px 16px #ef4444, inset 4px 4px 8px #fca5a5, inset -1px -1px 2px #fafafa;
      }
      .clay-lg-red {
        background-color: #f87171;
        box-shadow: 8px 8px 16px rgba(0, 0, 0, .25), inset -8px -8px 32px #ef4444, inset 8px 8px 16px #fca5a5, inset -2px -2px 4px #fafafa;
      }
    `,
  },
])("plugin with various configs", ({ config, aimedClayCss }) => {
  test("generated clay css should align with its config", async () => {
    await expect(generatePluginCss(config)).resolves.toMatchCss(aimedClayCss)
  })
})
