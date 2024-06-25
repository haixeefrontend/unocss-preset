import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const __dirname = new URL('.', import.meta.url).pathname

const outputFile = resolve(__dirname, '../dist/index.html')

async function render() {
  const html = readFileSync(outputFile, 'utf-8')
  const { render } = await import('./.vite/entry-server.js')
  const [appHtml] = await render()
  
  writeFileSync(outputFile, html.replace(`<!-- app-html -->`, appHtml), 'utf-8')
}

render()
