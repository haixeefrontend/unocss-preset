import { h } from '@unocss/preset-mini/utils'
import { mergeDeep } from 'unocss'
import { presetMarumaru } from 'unocss-preset-marumaru'

import type { Preset } from 'unocss'

const parseValue = (value: string) => h.bracket.cssvar.global.rem(value)

export const presetHaixee = (): Preset => {
  const preset: Preset = {
    name: 'haixee',
    shortcuts: [
      {
        'inset-center': 'inset-center-x inset-center-y',
        'inset-center-x': 'left-1/2 translate-x--1/2',
        'inset-center-y': 'top-1/2 translate-y--1/2',
      },
    ],
    rules: [
      [/^col-gap-(.+)$/, ([, value]) => ({ 'column-gap': `${parseValue(value)}px` })],
      [/^row-gap-(.+)$/, ([, value]) => ({ 'row-gap': `${parseValue(value)}px` })],
      // square size
      [/^size-(.+)$/, ([, value]) => ({ width: parseValue(value), height: parseValue(value) })],
    ],
    variants: [
      // child:
      (matcher) => {
        const prefix = 'child:'
        if (!matcher.startsWith(prefix)) return

        return {
          matcher: matcher.slice(prefix.length),
          selector: (selector) => `${selector} > *`,
        }
      },
    ],
  }

  return mergeDeep(presetMarumaru(), preset, true)
}
