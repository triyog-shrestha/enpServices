import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/enpServices/',
  plugins: [react()],
  server: {
    historyApiFallback: true
  }
})
