import { MdInsertLink } from 'react-icons/md'
import { Boot, createTextHtml, createTextParser, IEditor, slate } from 'src'
import './locale'

export default Boot.factory((setup) => {
  setup.menu('link', {
    title: 'link.insertLink',
    label(opts) {
      return <MdInsertLink />
    },
    active: (editor: IEditor) => {
      return false
    },
    disable: (editor: IEditor) => {
      return !!editor.getSelectedNodeByType('link')
    },
    exec: async function (editor: IEditor) {
      editor.insertNode({
        type: 'link',
        href: 'https://www.yuque.com/ff0000-2686w/iulnm5/wz88m2vmw1037c3f/edit',
        children: [{ text: 'https://www.yuque.com/ff0000-2686w/iulnm5/wz88m2vmw1037c3f/edit' }],
      } as slate.Node)
    },
  })

  setup.html<slateNodes.Link>('link', (node, editor) => {
    const textHtml = createTextHtml(node)
    return `<a href="${node.href}">${textHtml}</a>`
  })

  setup.parser<slateNodes.Link>('link', 'a', (node) => {
    const _node = node as unknown as HTMLLinkElement
    return { type: 'link', href: _node.getAttribute('href') as string, text: '', children: createTextParser(node) }
  })

  setup.render<slateNodes.Link>('link', (se, { attributes, children }, editor) => {
    return (
      <a style={{ display: 'block' }} href={se.href} {...attributes}>
        {children}
      </a>
    )
  })
})
