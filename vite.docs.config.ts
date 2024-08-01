import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { presetTypography, presetUno } from 'unocss'
import unocss from 'unocss/vite'
import { Plugin, defineConfig } from 'vite'

import { presetHaixee } from './src'

export default defineConfig({
  base: '',
  plugins: [
    vue(),
    vueJsx(),
    unocss({
      presets: [
        presetUno(),
        presetTypography({
          cssExtend: {
            'code': {
              color: '#8b5cf6',
            },
            'a:hover': {
              'color': '#f43f5e',
              'text-decoration': 'none',
            },
            'a:visited': {
              color: '#14b8a6',
            },
          },
        }),
        presetHaixee({ responsive: { enabled: true, breakpoints: {
          xl: 900,
        } } }),
      ],
    }),
    (function (): Plugin {
      return {
        name: 'transform-index-html',
        async transformIndexHtml(html, ctx) {
          return (await ctx.server?.ssrLoadModule('./docs/renderer.js'))?.render(html) || html
        },
      }
    })(),
  ],
  build: {
    rollupOptions: {
      external: ['vue', 'marked'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    }
  }
})
