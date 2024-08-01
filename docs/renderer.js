import { readFileSync } from 'node:fs'

import { JSDOM } from 'jsdom'
import { marked } from 'marked'
import { createHighlighter } from 'shiki'
import shikiTheme from 'shiki/themes/material-theme-palenight.mjs'

export async function render(/** @type {string} */ html) {
  const readme = await marked.parse(readFileSync('README.md', 'utf-8'))
  const { render: inner } = await import('./entry-server.ts')
  const [appHtml] = await inner()

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

  return parsed.serialize()
}
