import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

const FALLBACK_PORT = 5173;
const FALLBACK_PROXY_API = 'http://localhost:8080/';

const config = {
  host: true,
  strictPort: true,
  port: parseInt(process.env.PORT) || FALLBACK_PORT,
  proxy: {
    '/api': {
      target: process.env.PROXY_API || FALLBACK_PROXY_API,
      changeOrigin: true,
      secure: false,
      ws: true,
    },
  },
  https: true,
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  base: '',
  server: {
    ...config,
  },
  preview: {
    ...config,
  },
});
