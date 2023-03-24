import { Popover } from 'antd'
import { ReactNode } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { TbRowInsertBottom, TbRowInsertTop } from 'react-icons/tb'
import { RenderElementProps, useFocused, useReadOnly } from 'slate-react'
import { Bucket } from 'src'
import { Itembar } from 'src/share/components/itembar'
import { getDefineTipsbar } from 'src/share/define'

interface TipsbarProps {
  children?: ReactNode
  renderElementProps: RenderElementProps
}

export function LeftbarModal() {
  return (
    <div style={{ color: '#333', display: 'flex', flexDirection: 'column' }} onMouseDown={(e) => e.preventDefault()}>
      <span className='editor-menu-leftbar-modal-item'>
        <TbRowInsertTop size={18} />
        在上方添加行
      </span>
      <span className='editor-menu-leftbar-modal-item'>
        <TbRowInsertBottom size={18} />
        在下方添加行
      </span>
      <span className='editor-menu-leftbar-modal-item'>
        <RiDeleteBin5Line size={18} />
        删除
      </span>
    </div>
  )
}

export function Tipsbar({ children, renderElementProps }: TipsbarProps) {
  const readOnly = useReadOnly()
  const focused = useFocused()
  const defineTipsbars = getDefineTipsbar(renderElementProps.element['type'])
  const tipsbars = defineTipsbars.map((k) => Bucket.Menu.get(k)!).filter(Boolean)

  const Topbar = () => {
    if (readOnly || !tipsbars.length || !focused) return null
    return (
      <div className="slate-menu slate-menu-tipsbar">
        {tipsbars.map((value) => (
          <Itembar key={value.type} slateElement={renderElementProps.element} placement="top" dataSource={value} />
        ))}
      </div>
    )
  }

  const Leftbar = () => {
    if (readOnly || !focused) return null
    return (
      <Popover arrow={false} destroyTooltipOnHide content={<LeftbarModal />} placement="bottomLeft" trigger={['click']}>
        <span style={{ color: '#333' }} onMouseDown={(e) => e.preventDefault()}>
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
