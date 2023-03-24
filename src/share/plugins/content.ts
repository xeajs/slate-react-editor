import { getEmptySlate, IEditor, slate } from 'src'
import { createSlateHtml } from 'src/share/engine'

export function withContent(editor: IEditor) {
  editor.getHtml = function (): string {
    const { children = [] } = editor
    return children.map((child) => createSlateHtml(child, editor)).join('')
  }

  editor.getText = function () {
    const { children = [] } = editor
    return children.map((child) => slate.Node.string(child)).join('\n')
  }

  editor.getNodeType = function (node: slate.Node) {
    if (slate.Element.isElement(node)) {
      return node['type']
    }
    return ''
  }

  editor.checkNodeType = function (node: slate.Node, type: string) {
    return editor.getNodeType(node) === type
  }

  editor.isSelectionAtLineEnd = function (editor: IEditor, path: slate.Path) {
    const { selection } = editor

    if (!selection) return false

    return slate.Editor.isEnd(editor, selection.anchor, path) || slate.Editor.isEnd(editor, selection.focus, path)
  }

  editor.isEmptyParagraph = function (slateElement) {
    if (!slate.Element.isElement(slateElement)) return false
    const { children } = slateElement
    if (slateElement['type'] !== 'paragraph') return false
    if (children.length > 1) return false
    return !children[0]['text']
  }

  editor.genEmptyParagraph = function () {
    return getEmptySlate()
  }

  editor.getSelectedNodeByType = function (type: string) {
    const [nodeEntry] = slate.Editor.nodes(editor, {
      match: (n) => this.checkNodeType(n, type),
      universal: true,
    })

    if (nodeEntry == null) return null
    return nodeEntry[0]
  }

  editor.insetEmptyParagraph = function () {
    slate.Transforms.insertNodes(editor, editor.genEmptyParagraph(), { mode: 'highest' })
  }

  // 正常光标在最后换行，插入新的空 Paragraph 标签，默认不继承格式和样式
  const { insertBreak } = editor
  editor.insertBreak = function () {
    if (!editor.selection) return insertBreak()
    const isEndLine = editor.isSelectionAtLineEnd(editor, editor.selection.anchor.path)
    if (!isEndLine) return insertBreak()
    editor.insetEmptyParagraph()
  }

  // 删除内容时，检测首行是否可以被删除，如果删除首行可以正常工作，则删除首行
  const { deleteBackward } = editor
  editor.deleteBackward = function (unit) {
    if (!editor.selection) return deleteBackward(unit)
    const [node, path] = slate.Editor.node(editor, editor.selection)
    const firstNodePath = slate.Editor.first(editor, [0, 0])[1]
    if (slate.Path.equals(path, firstNodePath) && !node['text'] && editor.children.length > 1) {
      return slate.Transforms.removeNodes(editor)
    }
    deleteBackward(unit)
  }
  return editor
}
