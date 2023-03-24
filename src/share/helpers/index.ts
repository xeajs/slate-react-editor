export * from './invoke'

export function getEmptyString() {
  return '<p><br></p>'
}

export function getEmptySlate() {
  return { type: 'paragraph', children: [{ text: '' }] }
}
