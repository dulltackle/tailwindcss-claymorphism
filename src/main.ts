import plugin from "tailwindcss/plugin"

interface Color {
  name: string
  backgroundColor: string
  insetShadowColorPrimary: string
  insetShadowColorSecondary: string
}

interface Shadow {
  outsetShadow: string
  insetShadowPrimary: string
  insetShadowSecondary: string
  insetShadowModifier: string
}

interface Shadows {
  large?: Shadow
  medium?: Shadow
  small?: Shadow
}

interface Clay {
  colors: Color[]
  shadows: Shadows
}

interface ClayCss {
  backgroundColor: string
  boxShadow: string
}

export const themeWithClay: { clay: Clay } = {
  clay: {
    colors: [
      {
        name: "red",
        backgroundColor: "#f87171",
        insetShadowColorPrimary: "#ef4444",
        insetShadowColorSecondary: "#fca5a5",
      },
    ],
    shadows: {
      medium: {
        outsetShadow: "8px 8px 16px rgba(0 ,0, 0, .25)",
        insetShadowPrimary: "inset -8px -8px 32px",
        insetShadowSecondary: "inset 8px 8px 16px",
        insetShadowModifier: "inset -2px -2px 4px #fafafa",
      },
      small: {
        outsetShadow: "4px 4px 8px rgba(0 ,0, 0, .25)",
        insetShadowPrimary: "inset -4px -4px 16px",
        insetShadowSecondary: "inset 4px 4px 8px",
        insetShadowModifier: "inset -1px -1px 2px #fafafa",
      },
    },
  },
}

export default plugin(
  ({ addUtilities, theme }) => {
    const clay: Clay = theme("clay")
  },
  {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: themeWithClay,
  }
)

export const generateClayCss = (
  color: Color,
  shadowName: string,
  shadowInfo: Shadow
) => {
  const acronyms = new Map([
    ["small", "sm"],
    ["medium", "md"],
    ["large", "lg"],
  ])

  const shadowAcronym = acronyms.get(shadowName)
  if (!shadowAcronym) {
    throw new Error("Unknown shadow name")
  } else {
    return {
      [`.clay-${shadowAcronym}-${color.name}`]: {
        backgroundColor: color.backgroundColor,
        boxShadow: `${shadowInfo.outsetShadow},${shadowInfo.insetShadowPrimary} ${color.insetShadowColorPrimary},${shadowInfo.insetShadowSecondary} ${color.insetShadowColorSecondary},${shadowInfo.insetShadowModifier}`,
      },
    }
  }
}
