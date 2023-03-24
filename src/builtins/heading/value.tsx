import { Boot } from 'src'
import { create } from './helper'

export default Boot.factory((setup) => {
  setup.menu('h1', create('h1'))
  setup.menu('h2', create('h2'))
  setup.menu('h3', create('h3'))
  setup.menu('h4', create('h4'))
  setup.menu('h5', create('h5'))

  setup.html<slateNodes.H1>('h1', (slateElement, editor) => {
    return `<h1>1</h1>`
  })
  setup.html<slateNodes.H2>('h2', (slateElement, editor) => {
    return `<h2>1</h2>`
  })
  setup.html<slateNodes.H3>('h3', (slateElement, editor) => {
    return `<h3>3</h3>`
  })
  setup.html<slateNodes.H4>('h4', (slateElement, editor) => {
    return `<h4>1</h4>`
  })
  setup.html<slateNodes.H5>('h5', (slateElement, editor) => {
    return `<h5>1</h5>`
  })

  setup.parser<slateNodes.H1>('h1', 'h1', (node) => {
    return { type: 'h1', children: [{ text: '' }] }
  })
  setup.parser<slateNodes.H2>('h2', 'h2', (node) => {
    return { type: 'h2', children: [{ text: '' }] }
  })
  setup.parser<slateNodes.H3>('h3', 'h3', (node) => {
    return { type: 'h3', children: [{ text: '' }] }
  })
  setup.parser<slateNodes.H4>('h4', 'h4', (node) => {
    return { type: 'h4', children: [{ text: '' }] }
  })
  setup.parser<slateNodes.H5>('h5', 'h5', (node) => {
    return { type: 'h5', children: [{ text: '' }] }
  })

  setup.render<slateNodes.H1>('h1', (slateElement, source, editor) => {
    return <h1 {...source.attributes}>{source.children}</h1>
  })
  setup.render<slateNodes.H2>('h2', (slateElement, source, editor) => {
    return <h2 {...source.attributes}>{source.children}</h2>
  })
  setup.render<slateNodes.H3>('h3', (slateElement, source, editor) => {
    return <h3 {...source.attributes}>{source.children}</h3>
  })
  setup.render<slateNodes.H4>('h4', (slateElement, source, editor) => {
    return <h4 {...source.attributes}>{source.children}</h4>
  })
  setup.render<slateNodes.H5>('h5', (slateElement, source, editor) => {
    return <h5 {...source.attributes}>{source.children}</h5>
  })
})
