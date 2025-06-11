import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Use an empty string for relative paths
  base: '', 
  plugins: [react(), tailwindcss()],
})
