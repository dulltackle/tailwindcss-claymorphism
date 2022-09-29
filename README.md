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
| `clay-sm-red`/`clay-md-red` | <div style="background-color: #f87171; color: white" >#f87171</div> |

## License

[MIT](./LICENSE) License © 2022-Present [dulltackle](https://github.com/dulltackle)
