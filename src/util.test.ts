import { describe, test } from "vitest"
import { cssMatcher } from "./util"

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
