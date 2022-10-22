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

    //     (
    //       Object.entries(clayShadows).flatMap(([shadowName, shadowValues]) => (  [`.clay-${shadowName}-${colorName}`, {
    //     backgroundColor: color.background,
    //     boxShadow: `${shadow.outset},${shadow.insetPrimary} ${color.insetShadowPrimary},${shadow.insetSecondary} ${color.insetShadowSecondary},${shadow.insetModifier}`,
    //   }]
    //         ,
    // ))
    //     ))

    // if (!!clay && isClay(clay)) {
    //   addUtilities(generateAllClayCss(clay))
    // } else {
    //   throw new Error("tailwindcss-clay: can not get clay config info")
    // }
  },
  {
    content: [],
    theme: {
      clayColors: defaultClayColors,
      clayShadows: defaultClayShadows,
    },
  }
)

// export const generateAllClayCss = (clay: Clay): CSSRuleObject[] => {
//   const { colors, shadows } = clay
//   const allClayCss: CSSRuleObject[] = []
//   colors.forEach((color) => {
//     shadows.forEach((shadow) => {
//       allClayCss.push(generateClayCss(color, shadow))
//     })
//   })
//   return allClayCss
// }

// export const generateClayCss = (color: Color, shadow: Shadow): CSSRuleObject => ({
//   [`.clay-${shadow.acronym ?? shadow.name}-${color.name}`]: {
//     backgroundColor: color.background,
//     boxShadow: `${shadow.outset},${shadow.insetPrimary} ${color.insetShadowPrimary},${shadow.insetSecondary} ${color.insetShadowSecondary},${shadow.insetModifier}`,
//   },
// })
