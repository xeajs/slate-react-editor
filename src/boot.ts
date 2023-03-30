import * as htmlParser from 'node-html-parser'
import { RenderElementProps } from 'slate-react'
import { slate } from 'src'
import { IEditor } from 'src'

export const Bucket = {
  Hook: new Map<string, IBoot.Hook>(),
  Html: new Map<string, IBoot.Html<IBoot.Element>>(),
  Parser: new Map<string, { selector: string; parse: IBoot.Parser<IBoot.Element> }>(),
  Render: new Map<string, IBoot.Render<IBoot.Element>>(),
  Menu: new Map<string, IBoot.Menu>(),
  Toolbar: new Set<string>(),
  Tipsbar: new Map<string, string[]>(),
  Leftbar: new Map<string, string[]>(),
}

export declare module IBoot {
  type Element<T = string> = slate.BaseElement & { type: T }
  type Hook = (editor: IEditor) => IEditor
  type Html<E extends IBoot.Element> = (slateElement: E, editor: IEditor) => string
  type Parser<E extends IBoot.Element> = (node: htmlParser.HTMLElement, editor: IEditor) => E
  type Render<E extends IBoot.Element> = (slateElement: E, source: RenderElementProps, editor: IEditor) => JSX.Element
  type Menu = {
    type: string
    title?: string
    label: (menu: Omit<IBoot.Menu, 'label'>) => JSX.Element
    active: (editor: IEditor, slateElement?: slate.BaseElement) => boolean
    disable: (editor: IEditor, slateElement?: slate.BaseElement) => boolean
    exec: (editor: IEditor, slateElement?: slate.BaseElement) => Promise<void>
  }
}

class Setup {
  hook<E extends IBoot.Element>(type: E['type'], hook: IBoot.Hook) {
    Bucket.Hook.set(type, hook)
  }
  html<E extends IBoot.Element>(type: E['type'], html: IBoot.Html<E>) {
    Bucket.Html.set(type, html as IBoot.Html<IBoot.Element>)
  }
  parser<E extends IBoot.Element>(type: E['type'], selector: string, parse: IBoot.Parser<E>) {
    Bucket.Parser.set(type, { selector, parse })
  }
  render<E extends IBoot.Element>(type: E['type'], render: IBoot.Render<E>) {
    Bucket.Render.set(type, render as IBoot.Render<IBoot.Element>)
  }
  menu(type: string, menu: Omit<IBoot.Menu, 'type'>) {
    Bucket.Menu.set(type, { type, ...menu })
  }
}

export class Boot {
  constructor() {
    throw new Error('Can not construct a instance\n不能实例化')
  }

  private static setup = new Setup()

  static factory(factory: (setup: Setup) => void) {
    return () => factory(this.setup)
  }

  static registryModules(...thisArguments: ReturnType<typeof Boot['factory']>[]) {
    thisArguments.forEach((thisArgument) => thisArgument())
  }
}

export default Boot
