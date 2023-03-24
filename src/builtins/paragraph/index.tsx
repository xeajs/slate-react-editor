import { Boot, createTextHtml, createTextParser } from 'src'

export default Boot.factory((setup) => {
  setup.html<slateNodes.Paragraph>('paragraph', (node, editor) => {
    const textHtml = createTextHtml(node)
    return `<p>${textHtml}</p>`
  })

  setup.parser<slateNodes.Paragraph>('paragraph', 'p', (node) => {
    return { type: 'paragraph', children: createTextParser(node) }
  })
})
