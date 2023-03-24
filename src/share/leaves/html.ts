import { slate } from 'src'

export function createTextHtml(slateElement: slate.Element) {
  const children = slateElement.children.map((child) => {
    let html = child['text']
    if (child['bold']) {
      html = `<strong>${html}</strong>`
    }

    if (child['code']) {
      html = `<code>${html}</code>`
    }

    if (child['italic']) {
      html = `<em>${html}</em>`
    }

    if (child['underline']) {
      html = `<u>${html}</u>`
    }

    if (child['through']) {
      html = `<s>${html}</s>`
    }

    if (child['sub']) {
      html = `<sub>${html}</sub>`
    }

    if (child['sup']) {
      html = `<sup>${html}</sup>`
    }

    return html
  })

  return children.join('')
}
