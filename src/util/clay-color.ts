export function isClayColor(value: unknown): value is ClayColor {
  if (!!value && typeof value === "object" && hasClayColorKeys(value)) {
    const clayColorValues = Object.values(value)
    return clayColorValues.every((clayColorValue) => typeof clayColorValue === "string" && isColor(clayColorValue))
  } else {
    return false
  }
}

function hasClayColorKeys(value: object): value is { [Property in keyof ClayColor]: unknown } {
  const clayColorKeys = ["background", "insetShadowPrimary", "insetShadowSecondary"]
  return clayColorKeys.every((colorKey) => Object.hasOwn(value, colorKey))
}

const isColor = (value: string) => value.startsWith("#")
