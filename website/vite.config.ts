import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: process.env.WEBSITE_BASE_PATH || '/',
  build: { outDir: 'dist', target: 'es2022' },
});
