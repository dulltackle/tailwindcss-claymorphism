import { describe, test } from "vitest"
import { cssMatcher, isClay } from "~/util"

describe("`cssMatcher()`", () => {
  test("two css classes with same content should be equal", ({ expect }) => {
    const received = ".clay-md-red { backgroundColor: #f87171; }"
    const expected = `
      .clay-md-red {
        backgroundColor: #f87171;
      }
    `

    const matcher = cssMatcher(received, expected)
    expect(matcher.pass).toBeTruthy()
  })

  test("two css classes with different content should not be equal", ({ expect }) => {
    const received = ".text-color { color: #fff; }"
    const expected = `
      .clay-md-red {
        backgroundColor: #f87171;
      }
    `

    const matcher = cssMatcher(received, expected)
    expect(matcher.pass).toBeFalsy()
  })

  test("should throw a error when `received` or `expected` is not string", ({ expect }) => {
    const random = Math.floor(Math.random() * 1000)
    const [received, expected] = random < 500 ? [random, random.toString()] : [random.toString(), random]
    // @ts-expect-error: test the throwing error feature
    expect(() => cssMatcher(received, expected)).toThrowError()
  })
})

describe.each([
  {
    aimedResult: true,
    input: {
      colors: [
        {
          name: "red",
          background: "#f87171",
          insetShadowPrimary: "#ef4444",
          insetShadowSecondary: "#fca5a5",
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
  },
  {
    aimedResult: false,
    input: {
      // `colors` is missing
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
  },
  {
    aimedResult: false,
    input: {
      colors: [
        {
          name: "red",
          background: "#f87171",
          insetShadowPrimary: "#ef4444",
          insetShadowSecondary: "#fca5a5",
        },
      ],
      // type of `shadows` is not `Array`
      shadows: {
        name: "medium",
        acronym: "md",
        outset: "8px 8px 16px rgba(0, 0, 0, .25)",
        insetPrimary: "inset -8px -8px 32px",
        insetSecondary: "inset 8px 8px 16px",
        insetModifier: "inset -2px -2px 4px #fafafa",
      },
    },
  },
  {
    aimedResult: false,
    input: {
      colors: [
        {
          // `name` and `insetShadowSecondary` are missing
          background: "#f87171",
          insetShadowPrimary: "#ef4444",
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
      ],
    },
  },
  {
    aimedResult: false,
    input: {
      colors: [
        {
          name: "red",
          background: "#f87171",
          insetShadowPrimary: "#ef4444",
          insetShadowSecondary: "#fca5a5",
        },
      ],
      shadows: [
        {
          // type of `name` is not `string`
          name: 33,
          acronym: "md",
          outset: "8px 8px 16px rgba(0, 0, 0, .25)",
          insetPrimary: "inset -8px -8px 32px",
          insetSecondary: "inset 8px 8px 16px",
          insetModifier: "inset -2px -2px 4px #fafafa",
        },
      ],
    },
  },
])("isClay()", ({ input, aimedResult }) => {
  test("isClay() should judge the type of input is `Clay` or not", ({ expect }) => {
    expect(isClay(input)).toBe(aimedResult)
  })
})
