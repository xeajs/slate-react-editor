import { defineConfig } from 'father'

export default defineConfig({
  esm: {
    platform: 'browser',
    transformer: 'swc',
    output: 'dist',
  },
})
