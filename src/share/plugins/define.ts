import { IEditor } from 'src'

export function withDefine(editor: IEditor) {
  // editor.getDefine = function () {
  //   const define: Record<string, any> = {}
  //   for (const [key, value] of Bucket.Define.entries()) define[key] = value
  //   return define
  // }

  return editor
}
