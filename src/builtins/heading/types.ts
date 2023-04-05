import { IBoot } from '@/boot'

declare global {
  export module slateNodes {
    export interface H1 extends IBoot.Element<'h1'> {
      children: slateNodes.Text[]
    }
    export interface H2 extends IBoot.Element<'h2'> {
      children: slateNodes.Text[]
    }
    export interface H3 extends IBoot.Element<'h3'> {
      children: slateNodes.Text[]
    }
    export interface H4 extends IBoot.Element<'h4'> {
      children: slateNodes.Text[]
    }
    export interface H5 extends IBoot.Element<'h5'> {
      children: slateNodes.Text[]
    }
  }
}
