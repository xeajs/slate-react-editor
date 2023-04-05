import { IBoot } from '@/boot'

declare global {
  export module slateNodes {
    export interface Paragraph extends IBoot.Element<'paragraph'> {
      children: slateNodes.Text[]
    }
  }
}
