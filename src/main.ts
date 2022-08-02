import plugin from "tailwindcss/plugin"
import { CSSRuleObject } from "tailwindcss/types/config"
import { isClay } from "./util"

export const themeWithClay: { clay: Clay } = {
  clay: {
    colors: [
      {
        name: "red",
        background: "#f87171",
        insetShadowPrimary: "#ef4444",
        insetShadowSecondary: "#fca5a5",
      },
    ],
    shadows: [
      {
        name: "medium",
        acronym: "md",
        outset: "8px 8px 16px rgba(0, 0, 0, .25)",
        insetPrimary: "inset -8px -8px 32px",
        insetSecondary: "inset 8px 8px 16px",
        insetModifier: "inset -2px -2px 4px #fafafa",
      },
      {
        name: "small",
        acronym: "sm",
        outset: "4px 4px 8px rgba(0, 0, 0, .25)",
        insetPrimary: "inset -4px -4px 16px",
        insetSecondary: "inset 4px 4px 8px",
        insetModifier: "inset -1px -1px 2px #fafafa",
      },
    ],
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
