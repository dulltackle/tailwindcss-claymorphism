import plugin from "tailwindcss/plugin"
import { defaultClayColors, defaultClayShadows } from "./config"
import { isClayColor, isClayShadow } from "./util"

export const tailwindcssClay = plugin(
  ({ addUtilities, theme, e }) => {
    const clayColors: unknown = theme("clayColors")
    const clayShadows: unknown = theme("clayShadows")

    if (!!clayColors && typeof clayColors === "object" && !!clayShadows && typeof clayShadows === "object") {
      const test = Object.entries(clayColors).flatMap(([colorName, colorValue]) => {
        if (!isClayColor(colorValue)) {
          throw new Error(`tailwindcss-clay: clay color config ${colorName} is not correct`)
        } else {
          return Object.entries(clayShadows).map(([shadowName, shadowValue]) => {
            if (!isClayShadow(shadowValue)) {
              throw new Error(`tailwindcss-clay: clay shadow config ${shadowName} is not correct`)
            } else {
              return {
                [`.${e(`clay-${shadowName}-${colorName}`)}`]: {
                  backgroundColor: colorValue.background,
                  boxShadow: `${shadowValue.outset},${shadowValue.insetPrimary} ${colorValue.insetShadowPrimary},${shadowValue.insetSecondary} ${colorValue.insetShadowSecondary},${shadowValue.insetModifier}`,
                },
              }
            }
          })
        }
      })

      test.forEach((value) => addUtilities(value))
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
