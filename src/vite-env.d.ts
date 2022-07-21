/// <reference types="vite/client" />

declare namespace jest {
  interface Matchers<R> {
    toMatchCss(expected: string): R
  }
}
