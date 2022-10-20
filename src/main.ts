import plugin from "tailwindcss/plugin"
import type { CSSRuleObject } from "tailwindcss/types/config"
import { defaultClayColors, defaultClayShadows } from "./config"
import { isClay } from "./util"

export const tailwindcssClay = plugin(
  ({ addUtilities, theme }) => {
    const clayColors: unknown = theme("clayColors")
    const clayShadows: unknown = theme("clayShadows")

    if (!!clay && isClay(clay)) {
      addUtilities(generateAllClayCss(clay))
    } else {
      throw new Error("tailwindcss-clay: can not get clay config info")
    }
  },
  {
    content: [],
    theme: {
      clayColors: defaultClayColors,
      clayShadows: defaultClayShadows,
    },
  }
)

export const generateAllClayCss = (clay: Clay): CSSRuleObject[] => {
  const { colors, shadows } = clay
  const allClayCss: CSSRuleObject[] = []
  colors.forEach((color) => {
    shadows.forEach((shadow) => {
      allClayCss.push(generateClayCss(color, shadow))
    })
  })
  return allClayCss
}

export const generateClayCss = (color: Color, shadow: Shadow): CSSRuleObject => ({
  [`.clay-${shadow.acronym ?? shadow.name}-${color.name}`]: {
    backgroundColor: color.background,
    boxShadow: `${shadow.outset},${shadow.insetPrimary} ${color.insetShadowPrimary},${shadow.insetSecondary} ${color.insetShadowSecondary},${shadow.insetModifier}`,
  },
})
