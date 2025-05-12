import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from 'dotenv';
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: { transformMixedEsModules: true },
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
      }
    }
  },
  base: process.env.VITE_BASE_URL || '/',
})
