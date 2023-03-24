import { Dropdown } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { Boot, Bucket, event, slate, useEditor } from 'src'
import { create } from './helper'

function HeadingSelect() {
  const editor = useEditor()

  const [heading, setHeading] = useState('正文')
  const dataSource = useRef([
    { key: 'h1', label: 'H1' },
    { key: 'h2', label: 'H2' },
    { key: 'h3', label: 'H3' },
    { key: 'h4', label: 'H4' },
    { key: 'h5', label: 'H5' },
    { key: 'paragraph', label: '正文' },
  ]).current

  const onClick = (key: string, value: string) => {
    const keyMenu = Bucket.Menu.get(key)
    if (keyMenu) {
      keyMenu.exec(editor)
    } else {
      slate.Transforms.unwrapNodes(editor, {
        match: (n) => !(slate.Editor.isEditor(n) || slate.Element.isElement(n)),
        split: true,
      })
      slate.Transforms.setNodes(editor, { type: 'paragraph' } as any)
    }
  }

  const onEditorChange = useCallback(() => {
    let selectType = '正文'
    for (const iterator of dataSource) {
      const _selectType = editor.getSelectedNodeByType(iterator.key)
      if (_selectType) selectType = iterator.label
    }
    setHeading(selectType)
  }, [])

  useEffect(() => {
    event.on('change', onEditorChange)
    return () => {
      event.off('change', onEditorChange)
    }
  }, [editor])

  return (
    <Dropdown
      menu={{
        items: dataSource.map((d) => ({
          key: d.key,
          disabled: heading === d.label,
          label: <span data-editor-heading={d.key}>{d.label}</span>,
          onClick: () => onClick(d.key, d.label),
        })),
      }}
      overlayStyle={{ zIndex: 2048 }}
      align={{ offset: [0, 9] }}
      placement="bottom"
      arrow
    >
      <span style={{ fontSize: '14px', width: '50px', textAlign: 'center' }}>
        {heading} <AiFillCaretDown size={10} />
      </span>
    </Dropdown>
  )
}

export default Boot.factory((setup) => {
  const headingMneu = create('heading', HeadingSelect)
  Reflect.deleteProperty(headingMneu, 'title')
  setup.menu('heading', headingMneu)
})
