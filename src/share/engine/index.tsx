import * as htmlParser from 'node-html-parser'
import { withHistory } from 'slate-history'
import { jsx } from 'slate-hyperscript'
import { RenderElementProps, withReact } from 'slate-react'
import { Bucket, IBoot, IEditor, getEmptySlate, slate } from 'src'
import { Tipsbar } from 'src/editor/tipsbar'
import { withContent } from 'src/share/plugins/content'
import { withDefine } from 'src/share/plugins/define'
import { withEvents } from 'src/share/plugins/events'
import { withSelection } from 'src/share/plugins/selection'

export function createEditor() {
  const builtins = [withReact, withHistory, withContent, withDefine, withSelection, withEvents]
  let editor = slate.createEditor() as unknown as IEditor
  const useDefines = Array.from(Bucket.Hook.values())
  for (const builtin of [...builtins, ...useDefines]) editor = builtin(editor) as unknown as IEditor
  return editor
}

export function createSlateHtml(descendant: slate.Descendant, editor: IEditor) {
  const slate2html = Bucket.Html.get(descendant['type'])
  return slate2html ? slate2html(descendant as any, editor) : ''
}

export function createParser(editor: IEditor, html: string | slate.Descendant[]) {
  if (html === '') return [getEmptySlate()]

  if (Array.isArray(html)) {
    if (!html.length) return [getEmptySlate()]
    return html
  }

  const descendant: slate.Descendant[] = []

  // 非 HTML 格式，文本格式，用 <p> 包裹
  if (html.indexOf('<') !== 0) {
    // prettier-ignore
    html = html
      .split(/\n/)
      .map((text) => `<p>${text}</p>`)
      .join('')
  }

  const rootNodes = htmlParser.parse(html).childNodes
  const childNodes = Array.from(rootNodes)
  for (const childNode of childNodes) {
    if (childNode.nodeType !== htmlParser.NodeType.ELEMENT_NODE) continue
    let parse: IBoot.Parser<IBoot.Element> | undefined
    for (const parser of Bucket.Parser.values()) {
      if (childNode['closest'](parser.selector)) {
        parse = parser.parse
        // continue // 一直找到最后的那个，后面的覆盖前面的
      }
    }
    if (parse) {
      const value = parse(childNode as htmlParser.HTMLElement, editor)
      descendant.push(jsx('element', value, value.children))
      continue
    }
  }

  return descendant
}

export function createRender(editor: IEditor) {
  return function (renderProps: RenderElementProps) {
    const { attributes, children, element } = renderProps
    const type = element['type']
    const withRender = Bucket.Render.get(type)
    return (
      <Tipsbar renderElementProps={renderProps}>
        {withRender ? withRender(element as IBoot.Element, renderProps, editor) : <p {...attributes}>{children}</p>}
      </Tipsbar>
    )
  }
}

export function createToolbar(ignore: string[] = []) {
  let menuTypes = Array.from(Bucket.Menu.keys())
  menuTypes = menuTypes.filter((type) => !ignore.includes(type))
  return menuTypes.reduce<IBoot.Menu[]>((toolbars, type) => [...toolbars, Bucket.Menu.get(type)!].filter(Boolean), [])
}

export function createTipsbar<T = any>(editor: IEditor, type: string): T | null {
  return null
}
