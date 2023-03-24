import { Tooltip } from 'antd'
import { TooltipPlacement } from 'antd/es/tooltip'
import classNames from 'classnames'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { BaseElement } from 'slate'
import { event, IBoot, useEditor, useFocused, useLocale, useReadOnly } from 'src'

interface ItembarProps {
  attributes?: HTMLAttributes<HTMLDivElement>
  dataSource: IBoot.Menu
  placement: TooltipPlacement
  slateElement?: BaseElement
}
export function Itembar({ attributes, slateElement, placement, dataSource }: ItembarProps) {
  const editor = useEditor()
  const locale = useLocale()
  const focused = useFocused()
  const readOnly = useReadOnly()
  const { label, type, title = '' } = dataSource
  const _exec = useRef(dataSource.exec.bind(dataSource, editor, slateElement)).current
  const _disable = useRef(dataSource.disable.bind(dataSource, editor, slateElement)).current
  const _active = useRef(dataSource.active.bind(dataSource, editor, slateElement)).current
  const [disable, setDisable] = useState(_disable())
  const [active, setActive] = useState(_active())

  const onMouseDown = (e) => {
    e.preventDefault()
    if (!readOnly && !disable) _exec()
  }

  const onEditorChange = () => {
    setDisable(_disable())
    setActive(_active())
  }

  useEffect(() => {
    event.on('change', onEditorChange)
    return () => {
      event.off('change', onEditorChange)
    }
  }, [])

  return (
    <Tooltip
      key={type}
      color="#49536c"
      arrow={false}
      destroyTooltipOnHide
      title={locale(title) || title}
      placement={placement}
    >
      <div
        {...attributes}
        className={classNames(
          'slate-menu-item',
          { ['active']: active, ['disable']: readOnly || !focused || disable },
          attributes?.className
        )}
        onMouseDown={onMouseDown}
      >
        {label({ type, disable: _disable, active: _active, exec: _exec })}
      </div>
    </Tooltip>
  )
}
