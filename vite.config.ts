import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy semua request /api ke ngrok endpoint-mu
      '/api': {
        target: 'http://10.34.100.121:8024',
        changeOrigin: true,   // Ubah Origin header menjadi sama dengan target
        secure: true,        // Terima sertifikat self-signed dari ngrok
        rewrite: path => path.replace(/^\/api/, '/api')
      },
    },
  },
})