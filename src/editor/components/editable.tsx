import { useEditor } from '@/hooks'
import { IEditorProps } from '@/interface'
import { useRef } from 'react'
import { createRender } from '@/editor/transfer'
import { createTextLeaves } from '@/editor/leaves/render'
import { Editable as SlateEditable } from 'slate-react'
import classNames from 'classnames'

export function Editable(props: IEditorProps) {
  const { className, style, readOnly, placeholder = 'asdf' } = props
  const editor = useEditor()
  const render = useRef(createRender(editor)).current
  const leaves = useRef(createTextLeaves).current

  return (
    <SlateEditable
      className={classNames('slate-react-editor', className)}
      style={style}
      readOnly={readOnly}
      placeholder={placeholder}
      disableDefaultStyles
      renderLeaf={leaves}
      renderElement={render}
      onKeyDown={editor.onKeyDown}
    />
  )
}
