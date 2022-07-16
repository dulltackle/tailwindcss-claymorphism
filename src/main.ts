import plugin from "tailwindcss/plugin"

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
  shadow: Shadow
): Record<string, ClayCss> => ({
  [`.clay-${shadow.acronym ?? shadow.name}-${color.name}`]: {
    backgroundColor: color.backgroundColor,
    boxShadow: `${shadow.outset},${shadow.insetPrimary} ${color.insetShadowColorPrimary},${shadow.insetSecondary} ${color.insetShadowColorSecondary},${shadow.insetModifier}`,
  },
})
