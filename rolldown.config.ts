import { defineConfig } from 'rolldown'

export default defineConfig({
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.mjs', format: 'esm' },
    { file: 'dist/index.cjs', format: 'cjs' },
  ]
})