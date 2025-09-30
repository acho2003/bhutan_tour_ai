import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',                     // Make the server accessible externally
    port: process.env.PORT || 5173,      // Use Render's assigned port
    allowedHosts: ['bhutan-tour-ai.onrender.com'] // Allow requests from your Render domain
  }
})
