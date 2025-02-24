import { defineConfig } from 'vite'

export default defineConfig(async () => {
  const tailwindcss = (await import('@tailwindcss/vite')).default
  return {
    root: 'frontend',
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      exclude: ['@tailwindcss/vite']
    }
  }
})