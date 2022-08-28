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
    const { name, ...colorObject } = value
    const colorValues = Object.values(colorObject)
    return typeof name === "string" && colorValues.every((colorValue) => typeof colorValue === "string" && colorValue.startsWith("#"))
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
