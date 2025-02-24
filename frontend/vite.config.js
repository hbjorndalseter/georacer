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
    optimizeDeps: {
      exclude: ['@tailwindcss/vite']
    }
  }
})