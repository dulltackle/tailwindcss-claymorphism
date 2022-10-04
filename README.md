# tailwindcss-claymorphism

Add claymorphism style classes to your [Tailwind CSS](https://tailwindcss.com/docs/what-is-tailwind/) project.

> This plugin is inspired by [clay.css](https://github.com/codeAdrian/clay.css).

## Background

> Claymorphism is a fresh new concept. The name was coined by [Michał Malewicz](https://hype4.academy/articles/design/claymorphism-in-user-interfaces) and the designers are excited to explore the possibilities of this approach to UI design.
>
> It features inflated fluffy 3D elements which look charming and introduce a much more vibrant look compared to the usual flat designs.
>
> What sets claymorphism apart from neumorphism is that it floats above the background instead of being connected to it, eliminating accessibility issues and design restrictions of the latter.

## Install

With PNPM:

```SH
pnpm add -D tailwindcss-claymorphism
```

Then load the plugin:

```JS
// tailwind.config.cjs
module.exports = {
  content: [/* ... */],
  plugins: [require("tailwindcss-claymorphism")],
};
```

## Usage

To achieve claymorphism, you need to craft the following properties:

- `background-color`
- `box-shadow`
- `border-radius`

The plugin provides utilities classes `clay-<boxShadowSize>-<backgroundColor>` setting `box-shadow` and `background-color` for you:

```HTML
<div class="bg-amber-300 py-10 font-sans">
  <div
    class="p-10 text-5xl leading-tight text-white w-max mx-auto clay-md-red"
  >
    <p>
      Say hello to <br />
      <span class="font-semibold">Claymorphism</span>
    </p>
    <a
      href="https://github.com/dulltackle/tailwindcss-claymorphism"
      target="_blank"
      rel="noreferrer"
      class="block w-max mx-auto mt-4 px-4 py-2 text-3xl clay-sm-orange"
      >Hi 👋🏻</a
    >
  </div>
</div>
```

![Basic](https://s3.bmp.ovh/imgs/2022/08/05/6a0d0b7de624c48a.png)

Then all you need to do is crafting the round corner with build-in utilities class `rounded`(to make the element look like [Squircle](https://en.wikipedia.org/wiki/Squircle)):

```HTML
<div class="bg-amber-300 py-10 font-sans">
  <div
    class="p-10 text-5xl leading-tight text-white w-max mx-auto clay-md-red rounded-3xl"
  >
    <p>
      Say hello to <br />
      <span class="font-semibold">Claymorphism</span>
    </p>
    <a
      href="https://github.com/dulltackle/tailwindcss-claymorphism"
      target="_blank"
      rel="noreferrer"
      class="block w-max mx-auto mt-4 px-4 py-2 text-3xl clay-sm-orange rounded-xl"
      >Hi 👋🏻</a
    >
  </div>
</div>
```

![Rounded](https://s3.bmp.ovh/imgs/2022/08/05/6670a10fa0a9e383.png)

## Color Palettes

|        utility class        |                          background-color                           |
| :-------------------------: | :-----------------------------------------------------------------: |
| `clay-sm-red`/`clay-md-red` | ![#f87171](https://user-images.githubusercontent.com/45963660/193528975-acc97d29-f3d2-4927-aae4-f599a0d95424.svg) `#f87171` |
| `clay-sm-orange`/`clay-md-orange` | ![#fb923c](https://user-images.githubusercontent.com/45963660/193531101-3424e770-f2c7-4729-bec4-32dc3a70882b.svg) `#fb923c` |
| `clay-sm-amber`/`clay-md-amber` | ![#fbbf24](https://user-images.githubusercontent.com/45963660/193533141-0fb8bdb6-d597-48d3-bad7-0f537ab57749.svg) `#fbbf24` |
| `clay-sm-yellow`/`clay-md-yellow` | ![#facc15](https://user-images.githubusercontent.com/45963660/193536758-2a4571ae-2f5f-46a2-8e74-80134103df5d.svg) `#facc15` |
| `clay-sm-lime`/`clay-md-lime` | ![#a3e635](https://user-images.githubusercontent.com/45963660/193538028-a1ab7743-10b6-4515-8341-ee57d5c251d5.svg) `#a3e635` |
| `clay-sm-green`/`clay-md-green` | ![#4ade80](https://user-images.githubusercontent.com/45963660/193541267-b9f8db4b-5310-46fa-8cad-c18e63f11216.svg) `#4ade80` |
| `clay-sm-emerald`/`clay-md-emerald` | ![#34d399](https://user-images.githubusercontent.com/45963660/193543102-00c37f77-82b5-4c95-b608-e4381baea2b2.svg) `#34d399` |
| `clay-sm-teal`/`clay-md-teal` | ![#2dd4bf](https://user-images.githubusercontent.com/45963660/193544174-c7bcf873-869a-4c99-89a4-2476d8950386.svg) `#2dd4bf` |
| `clay-sm-cyan`/`clay-md-cyan` | ![color](https://user-images.githubusercontent.com/45963660/193755192-cd19c5fa-7105-4806-a0ac-a80f6e23d69d.svg) `#22d3ee` |

## License

[MIT](./LICENSE) License © 2022-Present [dulltackle](https://github.com/dulltackle)

