import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { BROWSER_PROCESS_POLYFILL, JS_SCRIPT_NAME } from './src/constants'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(fileURLToPath(import.meta.url), '../src/main.ts'),
      formats: ['umd'],
      fileName: JS_SCRIPT_NAME,
      name: JS_SCRIPT_NAME
    },
  },
  define: {
    'process': JSON.stringify(BROWSER_PROCESS_POLYFILL)
  }
})
