import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log(process.env.PROXY_API || 'http://localhost:8080/')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/droid-scanner/",
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: process.env.PORT || 3000,
    proxy: {
      '/api': {
        target: process.env.PROXY_API || 'http://localhost:8080/',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
