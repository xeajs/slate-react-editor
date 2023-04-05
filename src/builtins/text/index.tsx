import { IEditor } from '@/interface'
import './locale'
import { ReactNode } from 'react'
import {
  MdFormatBold,
  MdFormatUnderlined,
  MdOutlineFormatItalic,
  MdStrikethroughS,
  MdSubscript,
  MdSuperscript,
} from 'react-icons/md'
import { slate } from '@/index'
import { IBoot, Boot } from '@/boot'

export function createMenus(key: string, title: string, label: ReactNode): Omit<IBoot.Menu, 'type'> {
  return {
    title,
    label(opts) {
      return <>{label}</>
    },
    active: (editor: IEditor) => {
      const marks = slate.Editor.marks(editor)
      return marks ? marks[key] === true : false
    },
    disable: (editor: IEditor) => {
      if (!editor.selection) return true
      const [match] = slate.Editor.nodes(editor, {
        match: (n) => {
          const type = editor.getNodeType(n)
          if (type === 'pre') return true // 代码块
          if (slate.Editor.isVoid(editor, n as IBoot.Element)) return true // void node
          return false
        },
        universal: true,
      })
      // 命中，则禁用
      if (match) return true
      return false
    },
    exec: async function (editor: IEditor) {
      const isActive = this.active(editor)

      if (isActive) {
        slate.Editor.removeMark(editor, key)
      } else {
        slate.Editor.addMark(editor, key, true)
      }
    },
  }
}

export default Boot.factory((setup) => {
  setup.menu('bold', createMenus('bold', 'text.bold', <MdFormatBold />))
  setup.menu('italic', createMenus('italic', 'text.italic', <MdOutlineFormatItalic />))
  setup.menu('sub', createMenus('sub', 'text.sub', <MdSubscript />))
  setup.menu('sup', createMenus('sup', 'text.sup', <MdSuperscript />))
  setup.menu('through', createMenus('through', 'text.through', <MdStrikethroughS />))
  setup.menu('underline', createMenus('underline', 'text.underline', <MdFormatUnderlined />))
})
