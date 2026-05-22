import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react-icons') || id.includes('@iconify')) {
                            return 'vendor-icons';
                        }
                        if (id.includes('leaflet')) {
                            return 'vendor-maps';
                        }
                        if (id.includes('i18next')) {
                            return 'vendor-i18n';
                        }
                        return 'vendor'; 
                    }
                },
            },
        },
        chunkSizeWarningLimit: 1000, 
    },
});