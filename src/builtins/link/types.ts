import { IBoot } from '@/boot'

declare global {
  export module slateNodes {
    export interface Link extends IBoot.Element<'link'> {
      href: string
      children: slateNodes.Text[]
    }
  }
}
