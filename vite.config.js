import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/blog/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                research: resolve(__dirname, 'research.html'),
                writeups: resolve(__dirname, 'writeups.html'),
                osint: resolve(__dirname, 'osint-ia.html'),
                c2: resolve(__dirname, 'c2-framework.html'),
                zeroday: resolve(__dirname, '0day-shellexplorer.html'),
                osintfull: resolve(__dirname, 'osint-fullspectrum.html'),
            },
        },
    },
})
