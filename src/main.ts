import plugin from "tailwindcss/plugin"

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
        outset: "8px 8px 16px rgba(0, 0, 0, .25)",
        insetPrimary: "inset -8px -8px 32px",
        insetSecondary: "inset 8px 8px 16px",
        insetModifier: "inset -2px -2px 4px #fafafa",
      },
    ],
  },
}

export const tailwindcssClay = plugin(
  ({ addUtilities, theme }) => {
    const clay: Clay = theme("clay")
  },
  {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: themeWithClay,
  }
)

export const generateAllClayCss = (clay: Clay): Record<string, ClayCss> => {
  const { colors, shadows } = clay
  let allClayCss: Record<string, ClayCss> = {}
  colors.forEach((color) => {
    shadows.forEach((shadow) => {
      allClayCss = {
        ...generateClayCss(color, shadow),
        ...allClayCss,
      }
    })
  })
  return allClayCss
}

export const generateClayCss = (
  color: Color,
  shadow: Shadow
): Record<string, ClayCss> => ({
  [`.clay-${shadow.acronym ?? shadow.name}-${color.name}`]: {
    backgroundColor: color.background,
    boxShadow: `${shadow.outset},${shadow.insetPrimary} ${color.insetShadowPrimary},${shadow.insetSecondary} ${color.insetShadowSecondary},${shadow.insetModifier}`,
  },
})
