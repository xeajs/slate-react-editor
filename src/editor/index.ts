export * from './event'
export * from './i18n'
export * from './leaves/html'
export * from './leaves/parser'
export * from './leaves/render'
export * from './components'

export function genEmptyParagraphHtml() {
  return '<p><br></p>'
}

export function genEmptyParagraphNode() {
  return { type: 'paragraph', children: [{ text: '' }] }
}
