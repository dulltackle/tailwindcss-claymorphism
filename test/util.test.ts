import { describe, expect, test } from "vitest"
import { assertClayColor, assertClayShadow, isClayColor, isClayShadow } from "~/util"

describe("utilities that judge the type of input is ClayColor or not", () => {
  test("isClayColor() should return true when the type of input is ClayColor", ({ expect }) => {
    const input: ClayColor = {
      background: "#f87171",
      insetShadowPrimary: "#ef4444",
      insetShadowSecondary: "#fca5a5",
    }

    const result = isClayColor(input)

    expect(result).toBeTruthy()
  })
  test.each([
    {
      input: {
        background: "#f87171",
        // mistyped value
        insetShadowPrimary: 5,
        insetShadowSecondary: "#fca5a5",
      },
    },
    {
      input: {
        background: "#f87171",
        insetShadowPrimary: "#ef4444",
        // mistyped property
        insetShadowThird: "#fca5a5",
      },
    },
  ])("assertClayColor() should throw an error when the type of input is not ClayColor", ({ input }) => {
    expect(() => assertClayColor(input)).toThrowError()
  })
})

describe("isClayShadow() judges the type of input is isClayShadow or not", () => {
  test("isClayShadow() should return true when the type of input is isClayShadow", ({ expect }) => {
    const input: ClayShadow = {
      outset: "8px 8px 16px rgba(0, 0, 0, .25)",
      insetPrimary: "inset -8px -8px 32px",
      insetSecondary: "inset 8px 8px 16px",
      insetModifier: "inset -2px -2px 4px #fafafa",
    }

    const result = isClayShadow(input)

    expect(result).toBeTruthy()
  })
  test.each([
    {
      input: {
        outset: "8px 8px 16px rgba(0, 0, 0, .25)",
        // mistyped value
        insetPrimary: 5,
        insetSecondary: "inset 8px 8px 16px",
        insetModifier: "inset -2px -2px 4px #fafafa",
      },
    },
    {
      input: {
        outset: "8px 8px 16px rgba(0, 0, 0, .25)",
        insetPrimary: "inset -8px -8px 32px",
        // mistyped property
        insetThird: "inset 8px 8px 16px",
        insetModifier: "inset -2px -2px 4px #fafafa",
      },
    },
  ])("assertClayShadow() should throw an error when the type of input is not ClayShadow", ({ input }) => {
    expect(() => assertClayShadow(input)).toThrowError("tailwindcss-clay")
  })
})
