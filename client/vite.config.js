import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This is the magic line that exposes Vite to Docker
    port: 5173,
    strictPort: true, // Prevents Vite from quietly switching to port 5174
  }
})