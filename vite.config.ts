import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/auto-mini-app-v2/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
