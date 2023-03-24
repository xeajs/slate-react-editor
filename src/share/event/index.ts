import mitt from 'mitt'

type Mitt = {
  change: undefined
}

export const event = mitt<Mitt>()
