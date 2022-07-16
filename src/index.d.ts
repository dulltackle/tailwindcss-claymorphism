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
