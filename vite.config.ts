import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    outDir: 'build',
    emptyOutDir: true
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
