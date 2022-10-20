interface ClayColor {
  background: string
  insetShadowPrimary: string
  insetShadowSecondary: string
}

interface ClayShadow {
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
