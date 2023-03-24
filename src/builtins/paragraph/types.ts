import { IBoot } from 'src'

declare global {
  export module slateNodes {
    export interface Paragraph extends IBoot.Element<'paragraph'> {
      children: slateNodes.Text[]
    }
  }
}
