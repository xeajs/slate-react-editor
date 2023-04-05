import classNames from 'classnames'
import { ReactNode, useRef } from 'react'
import { useEditor, useReadOnly } from '@/hooks'
import { getTipsbars } from '@/define'
import { RenderElementProps } from 'slate-react'
import { Popover } from 'antd'
import { Bucket, IBoot } from '@/boot'
import { Itembar } from './itembar'

interface TipsbarProps {
  children?: ReactNode
  renderElementProps: RenderElementProps
}
export function Tipsbar({ children, renderElementProps }: TipsbarProps) {
  const editor = useEditor()
  const readOnly = useReadOnly()
  const defineTipsbars = useRef(getTipsbars(renderElementProps.element['type'])).current
  const tipsbars = defineTipsbars.map((k) => Bucket.Menu.get(k) as IBoot.Menu).filter(Boolean)

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
      {children}
    </Popover>
  )
}
