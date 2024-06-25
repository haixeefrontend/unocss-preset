# unocss-preset-haixee

A preset for UnoCSS, tailored for our company's needs.

## Installation

```bash
yarn add -D unocss @haixee/unocss-preset
```

```bash
npm install --save-dev unocss @haixee/unocss-preset
```

## Usage

Import the preset in your `uno.config.*` files (e.g. `uno.config.ts`):

```ts
import { presetHaixee } from '@haixee/unocss-preset'
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),  // Or other official presets
    presetHaixee(),
  ],
})
```

## CSS Classes

<div class="hidden">

Please refer to the [official documentation](https://haixeefrontend.github.io/unocss-preset-haixee) for the list of available CSS classes.

</div>
