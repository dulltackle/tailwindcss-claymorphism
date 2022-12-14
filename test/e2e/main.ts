import "./index.css"

const COLUMN_AMOUNT = 4

const CLAY_CLASS_NAMES: [string, string][] = [
  ["clay-sm-red", "clay-md-red"],
  ["clay-sm-orange", "clay-md-orange"],
  ["clay-sm-yellow", "clay-md-yellow"],
  ["clay-sm-green", "clay-md-green"],
  ["clay-sm-emerald", "clay-md-emerald"],
  ["clay-sm-teal", "clay-md-teal"],
  ["clay-sm-cyan", "clay-md-cyan"],
  ["clay-sm-sky", "clay-md-sky"],
  ["clay-sm-blue", "clay-md-blue"],
  ["clay-sm-indigo", "clay-md-indigo"],
  ["clay-sm-violet", "clay-md-violet"],
  ["clay-sm-purple", "clay-md-purple"],
  ["clay-sm-fuchsia", "clay-md-fuchsia"],
  ["clay-sm-pink", "clay-md-pink"],
  ["clay-sm-rose", "clay-md-rose"],
  ["clay-sm-lime", "clay-md-lime"],
  ["clay-sm-amber", "clay-md-amber"],
  ["clay-sm-slate", "clay-md-slate"],
  ["clay-sm-gray", "clay-md-gray"],
  ["clay-sm-zinc", "clay-md-zinc"],
  ["clay-sm-neutral", "clay-md-neutral"],
  ["clay-sm-stone", "clay-md-stone"],
]

const Card = (clayClassName: string): string => `
  <div class="aspect-video flex items-center ${clayClassName} rounded-2xl">
    <p class="w-full text-2xl font-bold text-white text-center">Hello tailwindcss-claymorphism</p>
  </div>
`

const Button = (clayClassName: string): string => `
  <div class="flex justify-center">
    <button type="button" class="px-6 py-2 rounded-3xl text-white transition hover:scale-105 ${clayClassName}">Hi 👋🏻</button>
  </div>
`

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <ul class="grid p-6" style="grid-template-columns: repeat(${COLUMN_AMOUNT}, 1fr)">
    ${CLAY_CLASS_NAMES.map((clayColor) => {
      const [clayColorSmall, clayColorMiddle] = clayColor
      return `
        <li class="p-2 space-y-4">
          ${Card(clayColorMiddle)} ${Button(clayColorSmall)}
        </li>
      `
    }).join(" ")}
  </ul>
`
