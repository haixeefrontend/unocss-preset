import { cpSync } from 'node:fs'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  base: '',
  plugins: [
    dts({
      include: 'src',
    }),
    {
      name: 'fix-cts-export',
      closeBundle() {
        cpSync('./dist/index.d.ts', './dist/index.d.cts')
      },
    },
  ],
  build: {
    minify: false,
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => format === 'es' ? 'index.js' : 'index.cjs',
    },
    rollupOptions: {
      external: ['unocss', /^@unocss/, 'unocss-preset-marumaru'],
    },
  },
})
