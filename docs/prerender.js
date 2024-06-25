import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { JSDOM } from 'jsdom'
import { marked } from 'marked'
import { createHighlighter } from 'shiki'
import shikiTheme from 'shiki/themes/material-theme-palenight.mjs'

const __dirname = new URL('.', import.meta.url).pathname

const outputFile = resolve(__dirname, '../dist/index.html')

async function render() {
  const readme = await marked.parse(readFileSync('README.md', 'utf-8'))
  const html = readFileSync(outputFile, 'utf-8')
  const { render } = await import('./.vite/entry-server.js')
  const [appHtml] = await render()

  const replaced = html
    .replace(`<!-- app-readme -->`, readme)
    .replace(`<!-- app-html -->`, appHtml)

  const parsed = new JSDOM(replaced)
  const preBlocks = parsed.window.document.querySelectorAll('pre') || []

  const hl = await createHighlighter({
    themes: [shikiTheme],
    langs: ['html', 'sh', 'js', 'ts'],
  })

  for (const block of preBlocks) {
    block.outerHTML = hl.codeToHtml(block.textContent ?? '', {
      lang: block.firstElementChild?.className.replace('language-', '') ?? 'text',
      theme: shikiTheme.name ?? 'material-theme-palenight',
    })
  }
  
  writeFileSync(outputFile, parsed.serialize(), 'utf-8')
}

render()
