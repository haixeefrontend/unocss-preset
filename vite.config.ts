import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  base: '',
  plugins: [
    dts({
      include: 'src',
    }),
  ],
  build: {
    minify: false,
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['unocss', /^@unocss/, 'unocss-preset-marumaru'],
    },
  },
})
