import "./index.css"

const Card = (): string => `<li class="basis-1/4 aspect-video p-2">
  <p class="h-full clay-md-red">Hello tailwindcss-claymorphism</p>
</li>`

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <ul class="flex flex-wrap">
      ${Card()}
  </ul>
`
