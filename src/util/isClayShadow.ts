export function assertClayShadow(value: unknown): asserts value is ClayShadow {
  if (!isClayShadow(value)) {
    throw new Error(`tailwindcss-clay: there is something wrong with clay shadow config`)
  }
}

export function isClayShadow(value: unknown): value is ClayShadow {
  if (!!value && typeof value === "object" && hasClayShadowKeys(value)) {
    const clayShadowValues = Object.values(value)
    return clayShadowValues.every((clayShadowValue) => typeof clayShadowValue === "string")
  } else {
    return false
  }
}

function hasClayShadowKeys(value: object): value is { [Property in keyof ClayShadow]: unknown } {
  const clayShadowKeys = ["outset", "insetPrimary", "insetSecondary", "insetModifier"]
  return clayShadowKeys.every((clayShadowKey) => Object.hasOwn(value, clayShadowKey))
}
