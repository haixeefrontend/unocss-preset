import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { render } from './renderer.js'

const __dirname = new URL('.', import.meta.url).pathname

const outputFile = resolve(__dirname, '../dist/index.html')

;(async function () {
  const html = readFileSync(outputFile, 'utf-8')
  writeFileSync(outputFile, await render(html), 'utf-8')
})()
