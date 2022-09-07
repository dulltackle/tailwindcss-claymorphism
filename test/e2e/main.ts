import { Card } from "./card"
import "./index.css"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="flex flex-wrap">
    <div class="basis-1/4 aspect-video p-2">
      ${Card()}
    </div>
  </div>
`
