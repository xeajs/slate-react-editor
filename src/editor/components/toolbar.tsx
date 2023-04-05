import classNames from 'classnames'
import { useRef } from 'react'
import { IToolbarProps } from 'src'
import { createToolbar } from '@/editor/transfer'
import { Itembar } from './itembar'

export function Toolbar({ ignore, define, className, ...props }: IToolbarProps) {
  const toolbars = useRef(Array.from(createToolbar(ignore))).current

  return (
    <div {...props} className={classNames('slate-menu', 'slate-menu-toolbar', className)}>
      {toolbars.map((toolbar) => (
        <Itembar key={toolbar.type} dataSource={toolbar} placement="bottom" />
      ))}
    </div>
  )
}
