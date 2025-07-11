import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
    proxy: {
      '/api/quran': {
        target: 'http://api.alquran.cloud/v1/quran/en.asad',
        changeOrigin: true,
        rewrite: () => '',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})