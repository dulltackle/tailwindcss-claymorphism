import { assertClayColor } from "./isClayColor"
import { assertClayShadow } from "./isClayShadow"

interface Props {
  clayColors: unknown
  clayShadows: unknown
}

export const createClayCss = ({ clayColors, clayShadows }: Props) => {
  if (!clayColors || typeof clayColors !== "object" || !clayShadows || typeof clayShadows !== "object") {
    throw new Error("tailwindcss-clay: can not get clay config info")
  } else {
    return Object.entries(clayColors).flatMap(([colorName, colorValue]) => {
      assertClayColor(colorValue)
      return Object.entries(clayShadows).map(([shadowName, shadowValue]) => {
        assertClayShadow(shadowValue)
        return [
          `clay-${shadowName}-${colorName}`,
          {
            backgroundColor: colorValue.background,
            boxShadow: `${shadowValue.outset},${shadowValue.insetPrimary} ${colorValue.insetShadowPrimary},${shadowValue.insetSecondary} ${colorValue.insetShadowSecondary},${shadowValue.insetModifier}`,
          },
        ] as const
      })
    })
  }
}
