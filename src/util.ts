import {
  matcherErrorMessage,
  matcherHint,
  printDiffOrStringify,
  printExpected,
  printReceived,
  printWithType,
  stringify,
} from "jest-matcher-utils"

export const cssMatcher = (received: string, expected: string) => {
  for (const element of [received, expected]) {
    if (typeof element !== "string") {
      throw new Error(
        matcherErrorMessage(
          matcherHint("toMatchCss"),
          `both received and expected must be string`,
          printWithType("Expected", stringify(expected), printExpected) +
            "\n" +
            printWithType("Received", stringify(received), printReceived)
        )
      )
    }
  }

  const receivedWithoutWhitespace = whitespaceRemoved(received)
  const expectedWithoutWhitespace = whitespaceRemoved(expected)

  const pass = receivedWithoutWhitespace === expectedWithoutWhitespace
  const message = () => printDiffOrStringify(receivedWithoutWhitespace, expectedWithoutWhitespace, "Expected CSS", "Received CSS", true)

  return { pass, message }
}

const whitespaceRemoved = (str: string) => str.replace(/[;\s]/g, "")
