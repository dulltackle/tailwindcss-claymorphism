import { beforeAll, describe, expect, test } from "vitest"
import { generateAllClayCss, generateClayCss } from "~/main"
import { cssMatcher } from "./util/matcher"
import { html, runPlugin } from "./util/run"

beforeAll(() => {
  expect.extend({ toMatchCss: cssMatcher })
})

// describe("test helper functions for generating clay utility class ", () => {
//   test("generateClayCss() for generating a clay utility class with a color and a shadow", ({ expect }) => {
//     const mockedColor: Color = {
//       name: "navajo",
//       background: "#e2c599",
//       insetShadowPrimary: "#af967f",
//       insetShadowSecondary: "#feeed4",
//     }
//     const mockedShadow: Shadow = {
//       name: "large",
//       acronym: "lg",
//       outset: "12px 12px 24px rgba(0, 0, 0, .25)",
//       insetPrimary: "inset -12px -12px 48px",
//       insetSecondary: "inset 12px 12px 24px",
//       insetModifier: "inset -3px -3px 6px #fafafa",
//     }
//     expect(generateClayCss(mockedColor, mockedShadow)).toEqual({
//       [".clay-lg-navajo"]: {
//         backgroundColor: "#e2c599",
//         boxShadow: "12px 12px 24px rgba(0, 0, 0, .25),inset -12px -12px 48px #af967f,inset 12px 12px 24px #feeed4,inset -3px -3px 6px #fafafa",
//       },
//     })
//   })

//   test("generateAllClayCss() for generating clay utility classes with colors and shadows", ({ expect }) => {
//     const mockedColors: Color[] = [
//       {
//         name: "navajo",
//         background: "#e2c599",
//         insetShadowPrimary: "#af967f",
//         insetShadowSecondary: "#feeed4",
//       },
//       {
//         name: "turquoise",
//         background: "#48d1cc",
//         insetShadowPrimary: "#66cdaa",
//         insetShadowSecondary: "#40e0d0",
//       },
//     ]
//     const mockedShadows: Shadow[] = [
//       {
//         name: "large",
//         acronym: "lg",
//         outset: "12px 12px 24px rgba(0, 0, 0, .25)",
//         insetPrimary: "inset -12px -12px 48px",
//         insetSecondary: "inset 12px 12px 24px",
//         insetModifier: "inset -3px -3px 6px #fafafa",
//       },
//       {
//         name: "extra large",
//         acronym: "xl",
//         outset: "16px 16px 32px rgba(0, 0, 0, .25)",
//         insetPrimary: "inset -16px -16px 64px",
//         insetSecondary: "inset 16px 16px 32px",
//         insetModifier: "inset -4px -4px 8px #fafafa",
//       },
//     ]
//     expect(generateAllClayCss({ colors: mockedColors, shadows: mockedShadows })).toEqual([
//       {
//         [".clay-lg-navajo"]: {
//           backgroundColor: "#e2c599",
//           boxShadow: "12px 12px 24px rgba(0, 0, 0, .25),inset -12px -12px 48px #af967f,inset 12px 12px 24px #feeed4,inset -3px -3px 6px #fafafa",
//         },
//       },
//       {
//         [".clay-xl-navajo"]: {
//           backgroundColor: "#e2c599",
//           boxShadow: "16px 16px 32px rgba(0, 0, 0, .25),inset -16px -16px 64px #af967f,inset 16px 16px 32px #feeed4,inset -4px -4px 8px #fafafa",
//         },
//       },
//       {
//         [".clay-lg-turquoise"]: {
//           backgroundColor: "#48d1cc",
//           boxShadow: "12px 12px 24px rgba(0, 0, 0, .25),inset -12px -12px 48px #66cdaa,inset 12px 12px 24px #40e0d0,inset -3px -3px 6px #fafafa",
//         },
//       },
//       {
//         [".clay-xl-turquoise"]: {
//           backgroundColor: "#48d1cc",
//           boxShadow: "16px 16px 32px rgba(0, 0, 0, .25),inset -16px -16px 64px #66cdaa,inset 16px 16px 32px #40e0d0,inset -4px -4px 8px #fafafa",
//         },
//       },
//     ])
//   })
// })

describe.each([
  {
    // with no config
    config: {
      content: [{ raw: html`<div class="clay-md-red"></div>` }],
    },
    aimedClayCss: `
      .clay-md-red {
        background-color: #f87171;
        box-shadow: 8px 8px 16px rgba(0, 0, 0, .25), inset -8px -8px 32px #ef4444, inset 8px 8px 16px #fecaca, inset -2px -2px 4px #fafafa;
      }
    `,
  },
  // with custom color
  {
    config: {
      theme: {
        extend: {
          clayColors: {
            navajo: {
              background: "#e2c599",
              insetShadowPrimary: "#af967f",
              insetShadowSecondary: "#feeed4",
            },
          },
        },
      },
      content: [{ raw: html`<div class="clay-md-navajo"></div>` }],
    },
    aimedClayCss: `
      .clay-md-navajo {
        background-color: #e2c599;
        box-shadow: 8px 8px 16px rgba(0, 0, 0, .25), inset -8px -8px 32px #af967f, inset 8px 8px 16px #feeed4, inset -2px -2px 4px #fafafa;
      }
    `,
  },
  // with custom shadow
  {
    config: {
      theme: {
        extend: {
          clayShadows: {
            lg: {
              outset: "12px 12px 24px rgba(0, 0, 0, .25)",
              insetPrimary: "inset -12px -12px 48px",
              insetSecondary: "inset 12px 12px 24px",
              insetModifier: "inset -3px -3px 6px #fafafa",
            },
          },
        },
      },
      content: [{ raw: html`<div class="clay-lg-red"></div>` }],
    },
    aimedClayCss: `
      .clay-lg-red {
        background-color: #f87171;
        box-shadow: 12px 12px 24px rgba(0, 0, 0, .25), inset -12px -12px 48px #ef4444, inset 12px 12px 24px #fecaca, inset -3px -3px 6px #fafafa;
      }
    `,
  },
])("plugin with various configs", ({ config, aimedClayCss }) => {
  test("generated clay css should align with its config", async () => {
    await expect(runPlugin(config)).resolves.toMatchCss(aimedClayCss)
  })
})
