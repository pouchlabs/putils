import { defineWorkspace } from 'bunup'

export default defineWorkspace([
  {
    name: 'core',
    root: 'packages/core',
    config: {
      entry: ['index.ts',"src/**/*.ts"],
      format: ['esm'],
      splitting: true,
      minify:true,
      dts: {
        splitting: true,
        minify: true
      }
    }
    
  }
])
