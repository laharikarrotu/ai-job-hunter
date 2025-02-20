import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          // Group MUI components
          mui: [
            '@mui/material',
            '@mui/icons-material',
            '@mui/x-date-pickers',
            '@emotion/react',
            '@emotion/styled'
          ],
          // Group React core
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Group utilities
          utils: ['date-fns', 'axios']
        }
      }
    },
    chunkSizeWarningLimit: 800
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
}) 