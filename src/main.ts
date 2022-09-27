import plugin from "tailwindcss/plugin"
import type { CSSRuleObject } from "tailwindcss/types/config"
import { defaultColors, defaultShadows } from "./config"
import { isClay } from "./util"

export const themeWithClay: { clay: Clay } = {
  clay: {
    colors: defaultColors,
    shadows: defaultShadows,
  },
}

export const tailwindcssClay = plugin(
  ({ addUtilities, theme }) => {
    const clay: unknown = theme("clay")
    if (!!clay && isClay(clay)) {
      addUtilities(generateAllClayCss(clay))
    } else {
      throw new Error("tailwindcss-clay: can not get clay config info")
    }
  },
  {
    content: [],
    theme: themeWithClay,
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
