import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages uses /repository-name/ as base path
// Change this to your repository name
const base = process.env.GITHUB_ACTIONS
  ? '/solideo-Day2-01-07-Practice2/'
  : './'

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    port: 3000,
    open: true,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
})
