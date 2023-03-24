import { HTMLAttributes, TextareaHTMLAttributes } from 'react'
import { ReactEditor } from 'slate-react'
import { slate } from 'src'

declare global {
  export module slateNodes {
    export interface Text {
      text: string
      bold?: boolean
      code?: boolean
      italic?: boolean
      through?: boolean
      underline?: boolean
      sup?: boolean
      sub?: boolean
    }
  }
}

export interface IEditor extends ReactEditor {
  getHtml: () => string
  setHtml: (html: string) => void
  getText: () => string
  getSelectionText: () => string
  getParentNode: (node: slate.Node) => slate.Ancestor | null
  isEmpty: () => boolean
  clear: () => void
  focus: (isEnd?: boolean) => void
  blur: () => void
  destroy: () => void
  enable: () => void
  disable: () => void
  isDisabled: () => boolean
  toDOMNode: (node: slate.Node) => HTMLElement
  getNodeType(node: slate.Node): string
  checkNodeType(node: slate.Node, type: string): boolean
  getSelectedElems(editor: IEditor): slate.Element[]
  getSelectedNodeByType(type: string): slate.Node | null
  getEditableContainer: () => globalThis.Element
  isSelectionAtLineEnd(editor: IEditor, path: slate.Path): boolean
  isEmptyParagraph: (slateElement: slate.Element) => boolean
  insetEmptyParagraph: () => void
  genEmptyParagraph: () => slate.Element
  move: (distance: number, reverse?: boolean) => void
  moveReverse: (distance: number) => void
  select: (at: slate.Location) => void
  deselect: () => void
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
  undo?: () => void
  redo?: () => void
}

// export interface IEditorProps {
//   value: string | slate.Descendant[]
//   readOnly?: boolean
//   autoFocus?: boolean
//   style?: React.CSSProperties
//   className?: string
//   maxLength?: number
//   onCreated?: (editor: IEditor) => void
//   onChange?: (editor: IEditor, descendant: slate.Descendant[]) => void
//   onDestroyed?: (editor: IEditor) => void
//   onMaxLength?: (editor: IEditor) => void
//   onFocus?: (editor: IEditor) => void
//   onBlur?: (editor: IEditor) => void
//   placeholder?: (props: RenderPlaceholderProps) => JSX.Element
//   decorate?: (entry: slate.NodeEntry) => Range[]
//   onDOMBeforeInput?: (event: InputEvent) => void
//   onPaste?: (editor: IEditor, e: ClipboardEvent) => boolean
//   feature?: (plugins: string[]) => string[] // Module.type[]
//   tipsbar?: Record<string, string[]> // { [Module.type]: Module.menus.key[] }
//   define?: Record<string, any>
// }

export interface IEditorProps extends TextareaHTMLAttributes<HTMLDivElement> {
  placeholder?: string
  readOnly?: boolean
  maxLength?: number
  define?: IDefine
}

export interface IToolbarProps extends HTMLAttributes<HTMLDivElement> {
  ignore?: string[]
  features?: string[]
}

export interface IDefine {
  tipsbar: Record<string, string[]>
  tipopen: Record<string, string[]>
}
