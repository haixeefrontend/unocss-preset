// Here is a list of all the unocss classes that are used in the current documentation,
// since we are copying the markdown file content directly into the documentation, unocss
// cannot detect the classes used in the markdown file, so we have to manually import them.
//
// hidden
import { marked } from 'marked'

import type { FunctionalComponent } from 'vue'

export const Marked = ({ value }: { value: string }) => (
  <p innerHTML={marked.parse(value, { async: false }) as string} />
)

export const Showcase: FunctionalComponent<{ title: string; description: string }> = (
  { title, description },
  { slots },
) => {
  return (
    <>
      <h4>{title}</h4>
      <Marked value={description} />
      {slots.default?.()}
    </>
  )
}

export const ShowcaseRow: FunctionalComponent = (_, { slots }) => (
  <div class='border-4 border-gray-200 rounded-lg px-8 py-4 flex gap-4'>{slots.default?.()}</div>
)

export const ShowcaseItem: FunctionalComponent<{ title: string | string[] }> = ({ title }, { slots }) => (
  <div class='flex flex-col items-center'>
    {(Array.isArray(title) ? title : [title]).map((title) => (
      <code class='!ws-normal before:-ml-1ch'>{title}</code>
    ))}
    {slots.default?.()}
  </div>
)
