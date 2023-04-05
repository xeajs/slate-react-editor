import { useTranslation } from 'react-i18next'
import { useSlate } from 'slate-react'
import { IEditor } from 'src'

export function useEditor() {
  const editor = useSlate()
  return editor as IEditor
}

export function useLocale() {
  return useTranslation('translation').t
}

export { useFocused, useReadOnly, useSelected, useSlateSelection, useSlateSelector, useSlateStatic } from 'slate-react'
