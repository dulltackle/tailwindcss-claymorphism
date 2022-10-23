import plugin from "tailwindcss/plugin"
import { CSSRuleObject } from "tailwindcss/types/config"
import { defaultClayColors, defaultClayShadows } from "./config"
import { createClayCss } from "./util/createClayCss"

export const tailwindcssClay = plugin(
  ({ addUtilities, theme, e }) => {
    const clayColors: unknown = theme("clayColors")
    const clayShadows: unknown = theme("clayShadows")

    const clayCss: CSSRuleObject[] = createClayCss({ clayColors, clayShadows }).map(([clayClassName, clayClassValue]) => ({
      [`.${e(clayClassName)}`]: clayClassValue,
    }))

    addUtilities(clayCss)
  },
  {
    content: [],
    theme: {
      clayColors: defaultClayColors,
      clayShadows: defaultClayShadows,
    },
  }
)
