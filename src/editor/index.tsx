import classNames from 'classnames'
import { useRef } from 'react'
import { Editable, Slate } from 'slate-react'
import { createTextLeaves, IEditor, IEditorProps, invoke, slate, useEditor } from 'src'
import { createEditor, createParser, createRender } from 'src/share/engine'

export { Toolbar } from './toolbar'
export interface ConfigProviderProps {
  defaultValue: string | slate.Descendant[]
  onChange?: ((editor: IEditor, value: slate.Descendant[]) => void) | undefined
  children: React.ReactNode
}
export function ConfigProvider({ defaultValue, onChange, children }: ConfigProviderProps) {
  const editor = useRef(createEditor()).current
  const descendant = useRef(createParser(editor, defaultValue)).current
  return (
    <Slate editor={editor as any} value={descendant} onChange={(value) => invoke(onChange, editor, value)}>
      {children}
    </Slate>
  )
}

export function Editor(props: IEditorProps) {
  const { className, style, readOnly, placeholder = 'asdf' } = props
  const editor = useEditor()
  const render = useRef(createRender(editor)).current
  const leaves = useRef(createTextLeaves).current

  return (
    <Editable
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
