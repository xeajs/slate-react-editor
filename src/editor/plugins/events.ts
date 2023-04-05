import { IEditor } from '@/interface'
import isHotkey from 'is-hotkey'
import * as slate from 'slate'
import { event } from '../event'

export function withEvents(editor: IEditor) {
  function defuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    // 在下面插入空行
    if (isHotkey('cmd+enter', event) && editor.selection) {
      if (!editor.selection) return
      const line = slate.Editor.end(editor, editor.selection.anchor.path)
      slate.Transforms.select(editor, line)
      slate.Transforms.insertNodes(editor, editor.genEmptyParagraph())
    }

    // 在上面插入空行
    if (isHotkey('mod+shift+enter', event) && editor.selection) {
      if (!editor.selection) return
      // 当void元素占用首行被选中时，无法在之前插入内容，需要单独处理
      const firstRange = { anchor: { path: [0, 0], offset: 0 }, focus: { path: [0, 0], offset: 0 } }
      if (slate.Range.equals(firstRange, editor.selection)) {
        const [nodeEntry] = slate.Editor.nodes(editor, { match: (node, path) => path[0] === 0, universal: true })
        if (!nodeEntry) return
        const [firstElement, firstPath] = nodeEntry
        slate.Transforms.removeNodes(editor, { at: firstPath })
        slate.Transforms.insertNodes(editor, [editor.genEmptyParagraph(), firstElement])
        editor.select(firstRange)
      } else {
        const line = slate.Editor.start(editor, editor.selection.anchor.path)
        slate.Transforms.select(editor, { anchor: line, focus: line })
        editor.moveReverse(1)
        slate.Transforms.insertNodes(editor, editor.genEmptyParagraph())
      }
    }
  }

  const { onKeyDown = defuKeyDown } = editor
  editor.onKeyDown = function (event) {
    onKeyDown(event)
  }

  const { onChange } = editor
  editor.onChange = function () {
    event.emit('change')
    onChange()
  }

  return editor
}
