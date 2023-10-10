import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const FALLBACK_PORT = 3000
const FALLBACK_PROXY_API = 'http://localhost:8080/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: parseInt(process.env.PORT) || FALLBACK_PORT,
    proxy: {
      '/api': {
        target: process.env.PROXY_API || FALLBACK_PROXY_API,
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
