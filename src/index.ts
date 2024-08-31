import { h } from '@unocss/preset-mini/utils'
import { mergeDeep } from 'unocss'
import { presetMarumaru } from 'unocss-preset-marumaru'

import type { Preset } from 'unocss'

const parseValue = (value: string) => h.bracket.cssvar.global.rem(value)

export interface Config {
  elementPlus?: boolean
  responsive?:
    | boolean
    | {
        enabled?: boolean
        breakpoints?: {
          'sm'?: number | 'full'
          'md'?: number | 'full'
          'lg'?: number | 'full'
          'xl'?: number | 'full'
          '2xl'?: number | 'full'
          '3xl'?: number | 'full'
          '4xl'?: number | 'full'
        }
      }
}

const elementPlusColors = ['primary', 'success', 'warning', 'danger', 'info']
  .map((i) =>
    [3, 5, 7, 8, 9]
      .map((n) => `${i}-light-${n}`)
      .concat([`${i}-dark-2`])
      .concat([i]),
  )
  .flat()

export const presetHaixee = (config?: Config): Preset => {
  let responsive = ''
  if (
    config?.responsive === true ||
    (typeof config?.responsive === 'object' && config?.responsive?.enabled === true && !config?.responsive.breakpoints)
  ) {
    responsive = 'mx-auto w-full sm:max-w-inherit md:max-w-inherit xl:max-w-900px 2xl:max-w-1200px 4xl:max-w-1600px'
  } else if (typeof config?.responsive === 'object' && config.responsive.breakpoints) {
    const { breakpoints } = config.responsive
    responsive =
      'mx-auto w-full' +
      Object.entries(breakpoints)
        .map(([key, value]) => {
          if (value === 'full') {
            return `max-w-inherit ${key}:max-w-inherit`
          }
          return `max-w-${value}px ${key}:max-w-${value}px`
        })
        .join(' ')
  }

  const preset: Preset = {
    name: 'haixee',
    theme: {
      colors: {
        ...(config?.elementPlus ? Object.fromEntries(elementPlusColors.map((i) => [i, `var(--el-color-${i})`])) : {}),
      },
    },
    shortcuts: [
      {
        'inset-center': 'inset-center-x inset-center-y',
        'inset-center-x': 'left-1/2 translate-x--1/2',
        'inset-center-y': 'top-1/2 translate-y--1/2',
        ...(responsive ? { responsive } : {}),
      },
    ],
    rules: [
      [/^col-gap-(.+)$/, ([, value]) => ({ 'column-gap': parseValue(value) })],
      [/^row-gap-(.+)$/, ([, value]) => ({ 'row-gap': parseValue(value) })],
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

export default presetHaixee
