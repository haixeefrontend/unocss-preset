import { Marked, Showcase, ShowcaseItem, ShowcaseRow } from './utils'

const App = () => (
  <>
    <div>
      <Marked
        value={`> This preset includes an other preset called [marumaru](https://www.npmjs.com/package/unocss-preset-marumaru), you can refer to its [document](https://maikotan.github.io/unocss-preset-marumaru/#app) for more classes that can be used.`}
      />
    </div>
    <Showcase
      title='Responsive'
      description={`Responsive classes can be enabled by setting the \`responsive\` option to true.
You can simply set \`responsive: true\` to use the default breakpoints.

\`\`\`ts
const config: Config = {
  responsive: true,  // Enable responsive classes
}


The breakpoints can also be customized by setting the \`breakpoints\` option.
For example, to enable responsive classes with custom breakpoints:
\`\`\`ts
const config: Config = {
  responsive: {
    enabled: true,  // Enable responsive classes
    breakpoints: {
      'sm': 640,     // Enable responsive classes from 640px
      'md': 768,     // Enable responsive classes from 768px
      'lg': 1024,    // Enable responsive classes from 1024px
      'xl': 1280,    // Enable responsive classes from 1280px
    },
  },
}
\`\`\`
`}
    >
      <div></div>
    </Showcase>
    <Showcase
      title='Size'
      description={`Define size of an element using the \`size-{value}\` class.
For example, \`size-4\` or \`size-10%\` can be used to set the width and height
of an element to 1rem and 10% respectively.`}
    >
      {() => {
        const Item = ({ acl }: { acl: string }) => <div class={'mb-4 b-1 b-black b-solid br-1 ' + acl} />
        return (
          <ShowcaseRow>
            {['size-10', 'size-2rem', 'size-5vh', 'size-20%'].map((cl) => (
              <ShowcaseItem title={cl}>{() => <Item acl={cl} />}</ShowcaseItem>
            ))}
          </ShowcaseRow>
        )
      }}
    </Showcase>

    <Showcase
      title='Inset Center'
      description={`Center an element horizontally, vertically, or both using the
\`inset-center-x\`, \`inset-center-y\`, and \`inset-center\` classes.`}
    >
      {() => {
        const Item = ({ acl }: { acl: string }) => (
          <div class='relative mb-4 b-1 b-black b-solid br-1 size-10'>
            <div class={'absolute inline-block size-2 bg-red ' + acl} />
          </div>
        )
        return (
          <ShowcaseRow>
            {['inset-center', 'inset-center-x', 'inset-center-y'].map((cl) => (
              <ShowcaseItem title={cl}>{() => <Item acl={cl} />}</ShowcaseItem>
            ))}
          </ShowcaseRow>
        )
      }}
    </Showcase>

    <Showcase
      title='Gap'
      description={`Set the gap between columns or rows using the \`col-gap-{value}\` and
\`row-gap-{value}\` classes. And the built-in \`gap-{value}\` class can be used
to set both column and row gap.`}
    >
      {() => {
        const Item = ({ acl }: { acl: string }) => (
          <div class={'b b-solid grid grid-cols-2 ' + acl}>
            <div class='inline-block size-6 bg-red' />
            <div class='inline-block size-6 bg-green' />
            <div class='inline-block size-6 bg-blue' />
            <div class='inline-block size-6 bg-fuchsia' />
          </div>
        )
        return (
          <ShowcaseRow>
            {['col-gap-4', 'row-gap-4', 'gap-4', 'col-gap-20px'].map((cl) => (
              <ShowcaseItem title={cl}>{() => <Item acl={cl} />}</ShowcaseItem>
            ))}
          </ShowcaseRow>
        )
      }}
    </Showcase>
  </>
)

export default App
