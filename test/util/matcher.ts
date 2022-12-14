import { matcherErrorMessage, matcherHint, printDiffOrStringify, printExpected, printReceived, printWithType } from "jest-matcher-utils"

export const cssMatcher = (received: string, expected: string) => {
  for (const element of [received, expected]) {
    if (typeof element !== "string") {
      throw new Error(
        matcherErrorMessage(
          matcherHint(".toMatchCss"),
          `both received and expected must be string`,
          printWithType("Expected", expected, printExpected) + "\n" + printWithType("Received", received, printReceived)
        )
      )
    }
  }

  const receivedWithoutFormat = removeFormat(received)
  const expectedWithoutFormat = removeFormat(expected)
  const pass = receivedWithoutFormat === expectedWithoutFormat

  const diffMessage = printDiffOrStringify(expectedWithoutFormat, receivedWithoutFormat, "Expected CSS", "Received CSS", true)
  const passMessage =
    matcherHint(".not.toMatchCss") +
    "\n\n" +
    "Two CSS classes should not be equal while ignoring white-space and semicolon (using ===):\n" +
    diffMessage
  const failMessage =
    matcherHint(".toMatchCss") + "\n\n" + "Two CSS classes should be equal while ignoring white-space and semicolon (using ===):\n" + diffMessage

  return { pass, message: () => (pass ? passMessage : failMessage) }
}

const removeFormat = (str: string) => str.trim().replace(/[;\s]+/g, "")
