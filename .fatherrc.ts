import { defineConfig } from 'father'
import { resolve } from 'path'

export default defineConfig({
  esm: {
    platform: 'browser',
    transformer: 'swc',
    output: 'dist',
    alias: { src: resolve(__dirname, 'src') },
  },
})
