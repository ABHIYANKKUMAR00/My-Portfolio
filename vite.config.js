import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/three/')) return 'three-core'
          if (id.includes('node_modules/@react-three/')) return 'r3f'
          if (id.includes('node_modules/framer-motion/')) return 'framer'
          if (id.includes('node_modules/react-dom/') || id.includes('node_modules/react/')) return 'react-core'
        },
      },
    },
  },
})
