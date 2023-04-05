import { htmlParser } from '@/index'
import { jsx } from 'slate-hyperscript'

export function createTextParser(node: htmlParser.Node, attributes = {}) {
  const nodeAttributes: Record<string, boolean> = { ...attributes }
  const tagName: string = (node['rawTagName'] || '').toLocaleLowerCase()

  if (node.nodeType === htmlParser.NodeType.TEXT_NODE) {
    return jsx('text', nodeAttributes, node.textContent)
  } else if (node.nodeType !== htmlParser.NodeType.ELEMENT_NODE) {
    return null
  }

  switch (tagName) {
    case 'strong':
      nodeAttributes.bold = true
      break
    case 'code':
      nodeAttributes.code = true
      break
    case 'em':
      nodeAttributes.italic = true
      break
    case 'u':
      nodeAttributes.underline = true
      break
    case 's':
      nodeAttributes.through = true
      break
    case 'sub':
      nodeAttributes.sub = true
      break
    case 'sup':
      nodeAttributes.sup = true
      break
  }
  const children = Array.from(node.childNodes).map((node) => createTextParser(node, nodeAttributes))
  if (children.length === 0) children.push(jsx('text', nodeAttributes, ''))

  return children.flat()
}
