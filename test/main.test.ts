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
  const mockedBuildInTheme: { clay: Clay } = {
    clay: {
      colors: [
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
      ],
      shadows: [
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
      ],
    },
  }

  const sandboxConfig: Config = {
    // set the range of files containing the class names
    content: ["./test/main.test.ts"],
    // for testing convenience, disable Tailwind outputting build-in classes
    corePlugins: [],
    // now Tailwind would only output classes from our plugin
    plugins: [tailwindcssClay],
    theme: mockedBuildInTheme,
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
      .clay-lg-navajo {
        background-color: #e2c599;
        box-shadow: 12px 12px 24px rgba(0, 0, 0, .25), inset -12px -12px 48px #af967f, inset 12px 12px 24px #feeed4, inset -3px -3px 6px #fafafa;
      }
      .clay-xl-navajo {
        background-color: #e2c599;
        box-shadow: 16px 16px 32px rgba(0, 0, 0, .25), inset -16px -16px 64px #af967f, inset 16px 16px 32px #feeed4, inset -4px -4px 8px #fafafa;
      }
      .clay-lg-turquoise {
        background-color: #48d1cc;
        box-shadow: 12px 12px 24px rgba(0, 0, 0, .25), inset -12px -12px 48px #66cdaa, inset 12px 12px 24px #40e0d0, inset -3px -3px 6px #fafafa;
      }
      .clay-xl-turquoise {
        background-color: #48d1cc;
        box-shadow: 16px 16px 32px rgba(0, 0, 0, .25), inset -16px -16px 64px #66cdaa, inset 16px 16px 32px #40e0d0, inset -4px -4px 8px #fafafa;
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
                name: "slate",
                background: "#483d8b",
                insetShadowPrimary: "#0000cd",
                insetShadowSecondary: "#6a5acd",
              },
            ],
          },
        },
      },
    },
    aimedClayCss: `
      .clay-lg-navajo {
        background-color: #e2c599;
        box-shadow: 12px 12px 24px rgba(0, 0, 0, .25), inset -12px -12px 48px #af967f, inset 12px 12px 24px #feeed4, inset -3px -3px 6px #fafafa;
      }
      .clay-xl-navajo {
        background-color: #e2c599;
        box-shadow: 16px 16px 32px rgba(0, 0, 0, .25), inset -16px -16px 64px #af967f, inset 16px 16px 32px #feeed4, inset -4px -4px 8px #fafafa;
      }
      .clay-lg-turquoise {
        background-color: #48d1cc;
        box-shadow: 12px 12px 24px rgba(0, 0, 0, .25), inset -12px -12px 48px #66cdaa, inset 12px 12px 24px #40e0d0, inset -3px -3px 6px #fafafa;
      }
      .clay-xl-turquoise {
        background-color: #48d1cc;
        box-shadow: 16px 16px 32px rgba(0, 0, 0, .25), inset -16px -16px 64px #66cdaa, inset 16px 16px 32px #40e0d0, inset -4px -4px 8px #fafafa;
      }
      .clay-lg-slate {
        background-color: #483d8b;
        box-shadow: 12px 12px 24px rgba(0, 0, 0, .25), inset -12px -12px 48px #0000cd, inset 12px 12px 24px #6a5acd, inset -3px -3px 6px #fafafa;
      }
      .clay-xl-slate {
        background-color: #483d8b;
        box-shadow: 16px 16px 32px rgba(0, 0, 0, .25), inset -16px -16px 64px #0000cd, inset 16px 16px 32px #6a5acd, inset -4px -4px 8px #fafafa;
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
                name: "extra small",
                acronym: "xs",
                outset: "2px 2px 4px rgba(0, 0, 0, .25)",
                insetPrimary: "inset -2px -2px 8px",
                insetSecondary: "inset 2px 2px 4px",
                insetModifier: "inset -1px -1px 1px #fafafa",
              },
            ],
          },
        },
      },
    },
    aimedClayCss: `
      .clay-lg-navajo {
        background-color: #e2c599;
        box-shadow: 12px 12px 24px rgba(0, 0, 0, .25), inset -12px -12px 48px #af967f, inset 12px 12px 24px #feeed4, inset -3px -3px 6px #fafafa;
      }
      .clay-xl-navajo {
        background-color: #e2c599;
        box-shadow: 16px 16px 32px rgba(0, 0, 0, .25), inset -16px -16px 64px #af967f, inset 16px 16px 32px #feeed4, inset -4px -4px 8px #fafafa;
      }
      .clay-xs-navajo {
        background-color: #e2c599;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .25), inset -2px -2px 8px #af967f, inset 2px 2px 4px #feeed4, inset -1px -1px 1px #fafafa;
      }
      .clay-lg-turquoise {
        background-color: #48d1cc;
        box-shadow: 12px 12px 24px rgba(0, 0, 0, .25), inset -12px -12px 48px #66cdaa, inset 12px 12px 24px #40e0d0, inset -3px -3px 6px #fafafa;
      }
      .clay-xl-turquoise {
        background-color: #48d1cc;
        box-shadow: 16px 16px 32px rgba(0, 0, 0, .25), inset -16px -16px 64px #66cdaa, inset 16px 16px 32px #40e0d0, inset -4px -4px 8px #fafafa;
      }
      .clay-xs-turquoise {
        background-color: #48d1cc;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .25), inset -2px -2px 8px #66cdaa, inset 2px 2px 4px #40e0d0, inset -1px -1px 1px #fafafa;
      }

    `,
  },
])("plugin with various configs", ({ config, aimedClayCss }) => {
  test("generated clay css should align with its config", async () => {
    await expect(generatePluginCss(config)).resolves.toMatchCss(aimedClayCss)
  })
})
