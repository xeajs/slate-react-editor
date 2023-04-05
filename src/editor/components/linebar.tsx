import classNames from 'classnames'
import { ReactNode, useRef } from 'react'
import { createToolbar } from '../transfer'
import { Popover } from 'antd'
import { useEditor, useReadOnly } from '@/hooks'
import { Bucket, IBoot } from '@/boot'
import { RenderElementProps } from 'slate-react'
import { MdMoreVert } from 'react-icons/md'
import { getLinebars } from '@/define'

interface LinebarProps {
  children?: ReactNode
  renderElementProps: RenderElementProps
}
export function Linebar({ children, renderElementProps }: LinebarProps) {
  const editor = useEditor()
  const readOnly = useReadOnly()

  const leftbars = getLinebars(renderElementProps.element['type'])
    .map((k) => Bucket.Menu.get(k) as IBoot.Menu)
    .filter(Boolean)

  const LeftbarModal = () => {
    return (
      <div style={{ color: '#333', display: 'flex', flexDirection: 'column' }} onMouseDown={(e) => e.preventDefault()}>
        {leftbars.map((menu) => {
          return (
            <span
              key={menu.type}
              className='editor-menu-leftbar-modal-item'
              onMouseDown={(e) => {
                e.preventDefault()
                menu.exec(editor, renderElementProps.element)
              }}
            >
              {menu.label(menu)}
            </span>
          )
        })}
      </div>
    )
  }

  const Leftbar = () => {
    if (readOnly) return null
    return (
      <Popover arrow={false} destroyTooltipOnHide content={<LeftbarModal />} placement="leftTop" trigger={['click']}>
        <span className='slate-editor-tipsbar-fixed-icon' onMouseDown={(e) => e.preventDefault()}>
          <MdMoreVert size={18} />
          <MdMoreVert size={18} style={{ marginLeft: '-12px' }} />
        </span>
      </Popover>
    )
  }

  return (
    <Popover
      arrow={false}
      destroyTooltipOnHide
      align={{ offset: [-3, 3] }}
      content={<Leftbar />}
      overlayInnerStyle={{ boxShadow: 'none', padding: 0 }}
      placement="leftTop"
    >
      {children}
    </Popover>
  )
}
