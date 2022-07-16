interface Color {
  name: string
  backgroundColor: string
  insetShadowColorPrimary: string
  insetShadowColorSecondary: string
}

interface Shadow {
  name: string
  acronym?: string
  outset: string
  insetPrimary: string
  insetSecondary: string
  insetModifier: string
}

interface Clay {
  colors: Color[]
  shadows: Shadow[]
}

interface ClayCss {
  backgroundColor: string
  boxShadow: string
}
