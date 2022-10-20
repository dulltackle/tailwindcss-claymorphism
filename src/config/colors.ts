import colors from "tailwindcss/colors"

type Filter = "inherit" | "current" | "transparent" | "black" | "white"

const filteredColors: Omit<typeof colors, Filter> = colors

export const defaultClayColors: Record<string, ClayColor> = Object.fromEntries(
  Object.entries(filteredColors).map(([colorName, colorValues]) => [
    colorName,
    {
      background: colorValues[400],
      insetShadowPrimary: colorValues[500],
      insetShadowSecondary: colorValues[200],
    },
  ])
)
