import { describe, test } from "vitest"
import { cssMatcher } from "./util"

describe("`cssMatcher()`", () => {
  test("two css classes with same content should be equal(return `equalObj`)", ({
    expect,
  }) => {
    const received = ".clay-md-red: { backgroundColor: #f87171; }"
    const expected = `
      .clay-md-red: {
        backgroundColor: #f87171;
      }
    `
    const equalObj = {
      message: () => `expected ${received} not to match CSS ${expected}`,
      pass: true,
    }

    const matcher = cssMatcher(received, expected)
    expect(matcher.pass).toBe(equalObj.pass)
    expect(matcher.message()).toBe(equalObj.message())
  })

  test("two css classes with different content should not be equal(return `notEqualObj`)", ({
    expect,
  }) => {
    const received = ".text-color: { color: #fff; }"
    const expected = `
      .clay-md-red: {
        backgroundColor: #f87171;
      }
    `
    const notEqualObj = {
      message: () => `expected ${received} to match CSS ${expected}`,
      pass: false,
    }

    const matcher = cssMatcher(received, expected)
    expect(matcher.pass).toBe(notEqualObj.pass)
    expect(matcher.message()).toBe(notEqualObj.message())
  })
})
