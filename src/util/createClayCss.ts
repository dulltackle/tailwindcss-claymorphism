import { isClayShadow } from "./clay-shadow"
import { isClayColor } from "./isClayColor"

interface Props {
  clayColors: unknown
  clayShadows: unknown
}

export const createClayCss = ({ clayColors, clayShadows }: Props) => {
  if (!clayColors || typeof clayColors !== "object" || !clayShadows || typeof clayShadows !== "object") {
    throw new Error("tailwindcss-clay: can not get clay config info")
  } else {
    return Object.entries(clayColors).flatMap(([colorName, colorValue]) => {
      if (!isClayColor(colorValue)) {
        throw new Error(`tailwindcss-clay: clay color config ${colorName} is not correct`)
      } else {
        return Object.entries(clayShadows).map(([shadowName, shadowValue]) => {
          if (!isClayShadow(shadowValue)) {
            throw new Error(`tailwindcss-clay: clay shadow config ${shadowName} is not correct`)
          } else {
            return [
              `clay-${shadowName}-${colorName}`,
              {
                backgroundColor: colorValue.background,
                boxShadow: `${shadowValue.outset},${shadowValue.insetPrimary} ${colorValue.insetShadowPrimary},${shadowValue.insetSecondary} ${colorValue.insetShadowSecondary},${shadowValue.insetModifier}`,
              },
            ] as const
          }
        })
      }
    })
  }
}
