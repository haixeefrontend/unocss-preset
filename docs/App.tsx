import { Showcase, ShowcaseItem, ShowcaseRow } from './utils'

const App = () => (
  <>
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
  </>
)

export default App
