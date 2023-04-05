import { RiDeleteBin5Line } from 'react-icons/ri'
import { ReactEditor } from 'slate-react'
import { slate } from '@/index'
import Boot from '@/boot'

export default Boot.factory((setup) => {
  setup.menu('delete', {
    label: () => (
      <>
        <RiDeleteBin5Line size={18} />
        删除
      </>
    ),
    active: () => false,
    disable: () => false,
    exec: async (editor, slateElement) => {
      if (!slateElement) return
      slate.Transforms.delete(editor, { at: ReactEditor.findPath(editor, slateElement) })
    },
  })
})
