import "./index.css"

const Card = (): string => `<p class="h-full clay-md-red">
  Hello tailwindcss-claymorphism
</p>`

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="flex flex-wrap">
    <div class="basis-1/4 aspect-video p-2">
      ${Card()}
    </div>
  </div>
`
