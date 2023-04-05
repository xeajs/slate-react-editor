import { Boot } from '@/boot'
import { slate } from '@/index'
import { TbRowInsertBottom, TbRowInsertTop } from 'react-icons/tb'
import { ReactEditor } from 'slate-react'

export default Boot.factory((setup) => {
  setup.menu('insert.top', {
    label: () => (
      <>
        <TbRowInsertTop size={18} />
        在上方添加行
      </>
    ),
    active: () => false,
    disable: () => false,
    exec: async (editor, slateElement) => {
      if (!slateElement) return
      // const firstRange = { anchor: { path: [0, 0], offset: 0 }, focus: { path: [0, 0], offset: 0 } }
      // if (slate.Range.equals(firstRange, editor.selection)) {
      //   const [nodeEntry] = slate.Editor.nodes(editor, { match: (node, path) => path[0] === 0, universal: true })
      //   if (!nodeEntry) return
      //   const [firstElement, firstPath] = nodeEntry
      //   slate.Transforms.removeNodes(editor, { at: firstPath })
      //   slate.Transforms.insertNodes(editor, [editor.genEmptyParagraph(), firstElement])
      //   editor.select(firstRange)
      // } else {
      const line = slate.Editor.start(editor, ReactEditor.findPath(editor, slateElement))
      slate.Transforms.select(editor, { anchor: line, focus: line })
      editor.moveReverse(1)
      slate.Transforms.insertNodes(editor, editor.genEmptyParagraph())
      // }
    },
  })

  setup.menu('insert.bottom', {
    label: () => (
      <>
        <TbRowInsertBottom size={18} />
        在下方添加行
      </>
    ),
    active: () => false,
    disable: () => false,
    exec: async (editor, slateElement) => {
      if (!slateElement) return
      const line = slate.Editor.end(editor, ReactEditor.findPath(editor, slateElement))
      slate.Transforms.select(editor, line)
      slate.Transforms.insertNodes(editor, editor.genEmptyParagraph(), { select: true })
    },
  })
})
