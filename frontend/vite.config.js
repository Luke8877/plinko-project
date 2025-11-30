import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@auth': path.resolve(__dirname, './src/auth'),
      '@dashboard': path.resolve(__dirname, './src/dashboard'),
      '@features': path.resolve(__dirname, './src/features'),
      '@game': path.resolve(__dirname, './src/features/game'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@services': path.resolve(__dirname, './src/services'),
      '@stats': path.resolve(__dirname, './src/stats'),
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
});
