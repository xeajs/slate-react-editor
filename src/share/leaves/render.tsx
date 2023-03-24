import { RenderLeafProps } from 'slate-react'

export function createTextLeaves({ attributes, children, leaf }: RenderLeafProps) {
  if (leaf['bold']) {
    children = <strong>{children}</strong>
  }

  if (leaf['code']) {
    children = <code>{children}</code>
  }

  if (leaf['italic']) {
    children = <em>{children}</em>
  }

  if (leaf['underline']) {
    children = <u>{children}</u>
  }

  if (leaf['through']) {
    children = <s>{children}</s>
  }

  if (leaf['sub']) {
    children = <sub>{children}</sub>
  }

  if (leaf['sup']) {
    children = <sup>{children}</sup>
  }

  return <span {...attributes}>{children}</span>
}
