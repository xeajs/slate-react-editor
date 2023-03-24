import { IBoot } from 'src'

declare global {
  export module slateNodes {
    export interface Image extends IBoot.Element<'image'> {
      src: string
      alt?: string
      width?: string
      align?: 'start' | 'center' | 'end'
    }
  }
}
