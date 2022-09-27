import "./index.css"

const COLUMN_AMOUNT = 4

const CLAY_CLASS_NAMES: [string, string][] = [["clay-sm-red", "clay-md-red"]]

const Card = (clayClassName: string): string => `<li class="aspect-video p-2">
  <div class="h-full flex flex-col justify-center items-center ${clayClassName} rounded-xl">
    <p class="text-lg text-white text-center">Hello tailwindcss-claymorphism</p>
  </div>
</li>`

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <ul class="grid" style="grid-template-columns: repeat(${COLUMN_AMOUNT}, 1fr)">
    ${CLAY_CLASS_NAMES.map((color) => color.map((clayClassName) => Card(clayClassName))).reduce(
      (previousValue, currentValue) => `${previousValue} ${currentValue.join(" ")}`,
      ""
    )}
  </ul>
`
