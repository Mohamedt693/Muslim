import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
    proxy: {
        '/api/quran': {
        target: 'https://api.alquran.cloud/v1/surah',
        changeOrigin: true,
        rewrite: () => '',
        },
    },
    },
})
