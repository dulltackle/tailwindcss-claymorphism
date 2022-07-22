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

  const whitespaceRemoved = (str: string) => str.replace(/[;\s]/g, "")

  if (whitespaceRemoved(received) === whitespaceRemoved(expected)) {
    return {
      message: () => `expected ${received} not to match CSS ${expected}`,
      pass: true,
    }
  } else {
    return {
      message: () => `expected ${received} to match CSS ${expected}`,
      pass: false,
    }
  }
}
