import {
  matcherErrorMessage,
  matcherHint,
  printExpected,
  printReceived,
  printWithType,
} from "jest-matcher-utils"

export const cssMatcher = (received: string, expected: string) => {
  for (const element of [received, expected]) {
    if (typeof element !== "string") {
      throw new Error(
        matcherErrorMessage(
          matcherHint("toMatchCss", String(received), String(expected)),
          `value must be a string`,
          printWithType("Expected", expected, printExpected) +
            "\n" +
            printWithType("Received", received, printReceived)
        )
      )
    }
  }

  const pass = whitespaceRemoved(received) === whitespaceRemoved(expected)
  const message = () =>
    `expected ${received}${pass ? " not" : ""} to match CSS ${expected}`

  return { pass, message }
}

const whitespaceRemoved = (str: string) => str.replace(/[;\s]/g, "")
