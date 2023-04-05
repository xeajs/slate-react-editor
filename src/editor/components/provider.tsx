import { useRef } from 'react'
import { createEditor, createParser } from '@/editor/transfer'
import { IEditor } from '@/interface'
import { ReactEditor, Slate as SlateProvider } from 'slate-react'
import { slate } from '@/index'

export interface ConfigProviderProps {
  defaultValue: string | slate.Descendant[]
  onChange?: ((editor: IEditor, value: slate.Descendant[]) => void) | undefined
  children: React.ReactNode
}
export function ConfigProvider({ defaultValue, onChange, children }: ConfigProviderProps) {
  const editor = useRef(createEditor()).current
  const descendant = useRef(createParser(editor, defaultValue)).current
  return (
    <SlateProvider
      editor={editor as unknown as ReactEditor}
      value={descendant}
      onChange={(value) => (onChange ? onChange(editor, value) : null)}
    >
      {children}
    </SlateProvider>
  )
}
