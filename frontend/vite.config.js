import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";

export default defineConfig(async () => {
  const tailwindcss = (await import('@tailwindcss/vite')).default
  return {
    root: 'frontend',
    plugins: [
      tailwindcss(),
      react()
    ],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        }
      }
    },
    optimizeDeps: {
      exclude: ['@tailwindcss/vite']
    }
  }
})