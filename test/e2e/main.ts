import "./index.css"

const COLUMN_AMOUNT = 4

const CLAY_CLASS_NAMES: [string, string][] = [["clay-sm-red", "clay-md-red"]]

const Card = (clayClassName: string): string => `
  <div class="h-full flex flex-col justify-center items-center ${clayClassName} rounded-xl">
    <p class="text-lg text-white text-center">Hello tailwindcss-claymorphism</p>
  </div>
`

const Button = (clayClassName: string): string => `
  <div class="h-full flex flex-col justify-center items-center">
    <button type="button" class="px-6 py-2 rounded-3xl text-white transition hover:scale-105 ${clayClassName}">Hi 👋🏻</button>
  </div>
`

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <ul class="grid" style="grid-template-columns: repeat(${COLUMN_AMOUNT}, 1fr)">
    ${CLAY_CLASS_NAMES.map((clayColor) => {
      const [clayColorSmall, clayColorMiddle] = clayColor
      return [`<li class="aspect-video p-2">${Card(clayColorMiddle)}</li>`, `<li class="aspect-video p-2">${Button(clayColorSmall)}</li>`].join(" ")
    }).join(" ")}
  </ul>
`
