import { slate } from '@/index'
import { IBoot } from '@/boot'
import { IEditor } from '@/interface'

export function create(key: string, label?: (props) => JSX.Element): Omit<IBoot.Menu, 'type'> {
  const _label = label || (() => <span>{key.toLocaleUpperCase()}</span>)
  return {
    title: key.toLocaleUpperCase(),
    label: _label,
    active: (editor: IEditor) => {
      return !!editor.getSelectedNodeByType(key)
    },
    disable: (editor: IEditor) => {
      return false
    },
    exec: async function (editor: IEditor) {
      if (key === 'heading') return // 点击下拉框的菜单无效
      slate.Transforms.unwrapNodes(editor, {
        match: (n) => !(slate.Editor.isEditor(n) || slate.Element.isElement(n)),
        split: true,
      })
      slate.Transforms.setNodes(editor, { type: key } as unknown as slate.Element)
    },
  }
}
