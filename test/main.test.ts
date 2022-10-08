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

  test("generateAllClayCss() for generating clay utility classes with colors and shadows", ({ expect }) => {
    const mockedColors: Color[] = [
      {
        name: "navajo",
        background: "#e2c599",
        insetShadowPrimary: "#af967f",
        insetShadowSecondary: "#feeed4",
      },
      {
        name: "turquoise",
        background: "#48d1cc",
        insetShadowPrimary: "#66cdaa",
        insetShadowSecondary: "#40e0d0",
      },
    ]
    const mockedShadows: Shadow[] = [
      {
        name: "large",
        acronym: "lg",
        outset: "12px 12px 24px rgba(0, 0, 0, .25)",
        insetPrimary: "inset -12px -12px 48px",
        insetSecondary: "inset 12px 12px 24px",
        insetModifier: "inset -3px -3px 6px #fafafa",
      },
      {
        name: "extra large",
        acronym: "xl",
        outset: "16px 16px 32px rgba(0, 0, 0, .25)",
        insetPrimary: "inset -16px -16px 64px",
        insetSecondary: "inset 16px 16px 32px",
        insetModifier: "inset -4px -4px 8px #fafafa",
      },
    ]
    expect(generateAllClayCss({ colors: mockedColors, shadows: mockedShadows })).toEqual([
      {
        [".clay-lg-navajo"]: {
          backgroundColor: "#e2c599",
          boxShadow: "12px 12px 24px rgba(0, 0, 0, .25),inset -12px -12px 48px #af967f,inset 12px 12px 24px #feeed4,inset -3px -3px 6px #fafafa",
        },
      },
      {
        [".clay-xl-navajo"]: {
          backgroundColor: "#e2c599",
          boxShadow: "16px 16px 32px rgba(0, 0, 0, .25),inset -16px -16px 64px #af967f,inset 16px 16px 32px #feeed4,inset -4px -4px 8px #fafafa",
        },
      },
      {
        [".clay-lg-turquoise"]: {
          backgroundColor: "#48d1cc",
          boxShadow: "12px 12px 24px rgba(0, 0, 0, .25),inset -12px -12px 48px #66cdaa,inset 12px 12px 24px #40e0d0,inset -3px -3px 6px #fafafa",
        },
      },
      {
        [".clay-xl-turquoise"]: {
          backgroundColor: "#48d1cc",
          boxShadow: "16px 16px 32px rgba(0, 0, 0, .25),inset -16px -16px 64px #66cdaa,inset 16px 16px 32px #40e0d0,inset -4px -4px 8px #fafafa",
        },
      },
    ])
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
