export const cssMatcher = (received: string, expected: string) => {
  const whitespaceRemoved = (str: string) => str.replace(/[;\s]/g, "")

  if (whitespaceRemoved(received) === whitespaceRemoved(expected)) {
    return {
      message: () => `expected ${received} not to match CSS ${expected}`,
      pass: true,
    }
  } else {
    return {
      message: () => `expected ${received} to match CSS ${expected}`,
      pass: false,
    }
  }
}
