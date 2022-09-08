import "./index.css"

const Card = (): string => `<li class="basis-1/4 aspect-video p-2">
  <div class="h-full flex flex-col justify-center items-center clay-md-red rounded-xl">
    <p class="text-lg text-white">Hello tailwindcss-claymorphism</p>
  </div>
</li>`

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <ul class="flex flex-wrap">
    ${Card().repeat(6)}
  </ul>
`
