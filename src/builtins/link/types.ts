import { IBoot } from 'src'

declare global {
  export module slateNodes {
    export interface Link extends IBoot.Element<'link'> {
      href: string
      children: slateNodes.Text[]
    }
  }
}
