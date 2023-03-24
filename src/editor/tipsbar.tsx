import { Popover } from 'antd'
import { ReactNode } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { RenderElementProps, useReadOnly } from 'slate-react'
import { Bucket } from 'src'
import { Itembar } from 'src/share/components/itembar'
import { getDefineTipsbar } from 'src/share/define'

interface TipsbarProps {
  children?: ReactNode
  renderElementProps: RenderElementProps
}

export function Iconbar() {
  return (
    <Popover
      arrow={false}
      destroyTooltipOnHide
      title={<div style={{ color: '#333', width: '180px', height: '260px' }}>弹框菜单内容</div>}
      placement="bottomLeft"
      trigger={['click']}
    >
      <span style={{ color: '#333' }}>
        <MdMoreVert size={18} />
        <MdMoreVert size={18} style={{ marginLeft: '-12px' }} />
      </span>
    </Popover>
  )
}

export function Tipsbar({ children, renderElementProps }: TipsbarProps) {
  const readOnly = useReadOnly()
  const defineTipsbars = getDefineTipsbar(renderElementProps.element['type'])
  const tipsbars = defineTipsbars.map((k) => Bucket.Menu.get(k)!).filter(Boolean)

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

  return (
    <Popover arrow={false} destroyTooltipOnHide overlayInnerStyle={{ padding: 0 }} content={<Topbar />}>
      <Popover
        arrow={false}
        destroyTooltipOnHide
        align={{ offset: [-3, 3] }}
        content={<Iconbar />}
        overlayInnerStyle={{ boxShadow: 'none', padding: 0 }}
        placement="leftTop"
      >
        {children}
      </Popover>
    </Popover>
  )
}
