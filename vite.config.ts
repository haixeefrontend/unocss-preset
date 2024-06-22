import { defineConfig } from 'vite'
import { dts } from 'rollup-plugin-dts'
import { presetUno } from 'unocss'
import { presetTypography } from 'unocss'
import unocss from 'unocss/vite'

import { presetHaixee } from './src'

export default defineConfig(({ mode }) => ({
  base: '',
  plugins: [
    dts(),
    unocss({
      presets: [
        presetUno(),
        presetTypography({
          cssExtend: {
            code: {
              color: '#8b5cf6',
            },
            'a:hover': {
              color: '#f43f5e',
              'text-decoration': 'none',
            },
            'a:visited': {
              color: '#14b8a6',
            },
          },
        }),
        presetHaixee(),
      ],
    }),
  ],
  build: {
    minify: mode === 'demo',
    lib:
      mode === 'demo'
        ? false
        : {
            entry: './src/index.ts',
            formats: ['es'],
            fileName: () => 'index.js',
          },
    rollupOptions: {
      external: ['unocss', /^@unocss/],
    },
  },
}))
