import { IEditor, slate } from 'src'

export function withSelection(editor: IEditor) {
  editor.select = function (at: slate.Location) {
    slate.Transforms.select(editor, at)
  }

  /** 移动光标 */
  editor.move = (distance: number, reverse = false) => {
    if (!distance) return
    if (distance < 0) return

    slate.Transforms.move(editor, {
      distance,
      unit: 'character',
      reverse,
    })
  }

  /** 反向移动光标 */
  editor.moveReverse = (distance: number) => {
    editor.move(distance, true)
  }

  return editor
}
