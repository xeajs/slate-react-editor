import classNames from 'classnames'
import { ReactNode } from 'react'
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from 'react-icons/ai'
import { BiImageAdd } from 'react-icons/bi'
import { ReactEditor } from 'slate-react'
import { Boot, IBoot, IEditor, slate, useFocused, useSelected } from 'src'

function createImageMenu(
  title: string,
  label: ReactNode,
  exec: (editor: IEditor, opts) => void
): Omit<IBoot.Menu, 'type'> {
  return {
    title,
    label: () => <>{label}</>,
    disable: () => false,
    active: () => false,
    exec: async (editor, slateElement) => exec(editor, slateElement),
  }
}

export default Boot.factory((setup) => {
  setup.menu(
    'image.upload',
    createImageMenu('上传文件', <BiImageAdd />, (editor) => {
      const imageElement: slateNodes.Image = { type: 'image', src: '', alt: '', children: [{ text: '' }] }
      slate.Transforms.insertNodes(editor, imageElement)
    })
  )

  setup.menu('image.w25', {
    label(menu) {
      return <>25%</>
    },
    disable(editor, slateElement) {
      return false
    },
    active(editor, slateElement?: slateNodes.Image) {
      return slateElement?.width === '20%'
    },
    async exec(editor, slateElement) {
      if (!slateElement) return
      const path = ReactEditor.findPath(editor, slateElement)
      const newAttr = { width: '20%' } as unknown as IBoot.Element
      slate.Transforms.setNodes(editor, newAttr, { at: path })
    },
  })

  setup.menu(
    'image.w50',
    createImageMenu('', '50%', (editor, element) => {
      const path = ReactEditor.findPath(editor, element)
      const newAttr = { width: '50%' } as unknown as IBoot.Element
      slate.Transforms.setNodes(editor, newAttr, { at: path })
    })
  )
  setup.menu(
    'image.w75',
    createImageMenu('', '75%', (editor, element) => {
      const path = ReactEditor.findPath(editor, element)
      const newAttr = { width: '75%' } as unknown as IBoot.Element
      slate.Transforms.setNodes(editor, newAttr, { at: path })
    })
  )
  setup.menu(
    'image.w100',
    createImageMenu('', '100%', (editor, element) => {
      const path = ReactEditor.findPath(editor, element)
      const newAttr = { width: '100%' } as unknown as IBoot.Element
      slate.Transforms.setNodes(editor, newAttr, { at: path })
    })
  )

  setup.menu(
    'image.align.start',
    createImageMenu('左对齐', <AiOutlineAlignLeft />, (editor, element) => {
      const path = ReactEditor.findPath(editor, element)
      const newAttr = { align: 'start' } as unknown as IBoot.Element
      slate.Transforms.setNodes(editor, newAttr, { at: path })
    })
  )
  setup.menu(
    'image.align.center',
    createImageMenu('居中对齐', <AiOutlineAlignCenter />, (editor, element) => {
      const path = ReactEditor.findPath(editor, element)
      const newAttr = { align: 'center' } as unknown as IBoot.Element
      slate.Transforms.setNodes(editor, newAttr, { at: path })
    })
  )
  setup.menu(
    'image.align.end',
    createImageMenu('右对齐', <AiOutlineAlignRight />, (editor, element) => {
      const path = ReactEditor.findPath(editor, element)
      const newAttr = { align: 'end' } as unknown as IBoot.Element
      slate.Transforms.setNodes(editor, newAttr, { at: path })
    })
  )

  setup.hook<slateNodes.Image>('image', (editor) => {
    const { isVoid } = editor

    editor.isVoid = function (element) {
      return element['type'] === 'image' ? true : isVoid(element)
    }

    return editor
  })

  setup.parser<slateNodes.Image>('image', 'img', (node) => {
    const src = node.getAttribute('src') || ''
    const alt = node.getAttribute('alt') || ''
    const width = node.getAttribute('width') || '100%'
    const align = (node.getAttribute('align') as 'center') || 'center'
    return { type: 'image', src, alt, width, align, children: [{ text: '' }] }
  })

  setup.html<slateNodes.Image>('image', ({ src, alt, width, align }, editor) => {
    return `<img src="${src}" alt="${alt}" width="${width}" align="${align}" />`
  })

  setup.render<slateNodes.Image>('image', (slateElement, source, editor) => {
    const selected = useSelected()
    const focused = useFocused()
    const { src, alt, width, align } = slateElement
    const imgAttr = { src, alt, width, align }
    const active = selected && focused
    return (
      <div {...source.attributes}>
        {source.children}
        <div className={classNames('slate-image', active && 'active')} style={{ justifyContent: align }}>
          {/* rome-ignore lint/a11y/useAltText: <explanation> */}
          <img {...imgAttr} onMouseDown={() => editor.select(ReactEditor.findPath(editor, slateElement))} />
        </div>
      </div>
    )
  })
})
