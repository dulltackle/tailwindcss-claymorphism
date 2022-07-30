/// <reference types="vite/client" />

declare namespace jest {
  interface Matchers<R, T = unknown> {
    toMatchCss: T extends string | Promise<string>
      ? (expected: string) => R
      : `Type-level Error: Received value must be "string" but received is "${T}"`
  }
}
