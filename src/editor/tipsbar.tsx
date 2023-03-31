import { Popover } from 'antd'
import { ReactNode } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { TbRowInsertBottom, TbRowInsertTop } from 'react-icons/tb'
import { RenderElementProps, useFocused, useReadOnly } from 'slate-react'
import { Bucket, IBoot, useEditor } from 'src'
import { Itembar } from 'src/share/components/itembar'
import { getDefineTipsbar } from 'src/share/define'
import define from 'src/define'

interface TipsbarProps {
  children?: ReactNode
  renderElementProps: RenderElementProps
}

export function Tipsbar({ children, renderElementProps }: TipsbarProps) {
  const editor = useEditor()
  const readOnly = useReadOnly()
  const defineTipsbars = getDefineTipsbar(renderElementProps.element['type'])
  const tipsbars = defineTipsbars.map((k) => Bucket.Menu.get(k) as IBoot.Menu).filter(Boolean)

  const defineLeftbars = [...define.leftbar.all, ...(define.leftbar[renderElementProps.element['type']] || [])]
  const leftbars = defineLeftbars.map((k) => Bucket.Menu.get(k) as IBoot.Menu).filter(Boolean)

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

  const Topbar = () => {
    if (readOnly || !tipsbars.length) return null
    return (
      <div className="slate-menu slate-menu-tipsbar">
        {tipsbars.map((value) => (
          <Itembar key={value.type} slateElement={renderElementProps.element} placement="top" dataSource={value} />
        ))}
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
    <Popover arrow={false} destroyTooltipOnHide overlayInnerStyle={{ padding: 0 }} content={<Topbar />}>
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
    </Popover>
  )
}
