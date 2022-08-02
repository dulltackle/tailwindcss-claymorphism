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

export function isClay(value: unknown): value is Clay {
  if (!!value && typeof value === "object" && hasClayKeys(value)) {
    const { colors, shadows } = value
    return Array.isArray(colors) && colors.every((color) => isColor(color)) && Array.isArray(shadows) && shadows.every((shadow) => isShadow(shadow))
  } else {
    return false
  }
}

function hasClayKeys(value: object): value is { [Property in keyof Clay]: unknown } {
  const clayKeys = ["colors", "shadows"]
  return clayKeys.every((clayKey) => Object.hasOwn(value, clayKey))
}

function isColor(value: unknown): value is Color {
  if (!!value && typeof value === "object" && hasColorKeys(value)) {
    const colorValues = Object.values(value)
    return colorValues.every((colorValue) => typeof colorValue === "string")
  } else {
    return false
  }
}

function hasColorKeys(value: object): value is { [Property in keyof Color]: unknown } {
  const colorKeys = ["name", "background", "insetShadowPrimary", "insetShadowSecondary"]
  return colorKeys.every((colorKey) => Object.hasOwn(value, colorKey))
}

function isShadow(value: unknown): value is Shadow {
  if (!!value && typeof value === "object" && hasShadowKeys(value)) {
    const shadowValues = Object.values(value)
    return shadowValues.every((shadowValue) => typeof shadowValue === "string")
  } else {
    return false
  }
}

function hasShadowKeys(value: object): value is { [Property in keyof Shadow]: unknown } {
  const colorKeys = ["name", "acronym", "outset", "insetPrimary", "insetSecondary", "insetModifier"]
  return colorKeys.every((colorKey) => Object.hasOwn(value, colorKey))
}
