import { beforeAll, describe, expect, test } from "vitest"
import { cssMatcher } from "./util/matcher"
import { html, runPlugin } from "./util/run"

beforeAll(() => {
  expect.extend({ toMatchCss: cssMatcher })
})

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
