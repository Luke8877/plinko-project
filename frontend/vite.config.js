/**
 * Vite Configuration
 * --------------------------------------------------
 * Enables React Fast Refresh and defines path aliases
 * for cleaner and more maintainable imports across the app.
 *
 * Example:
 *   import GamePage from '@game/pages/GamePage';
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@auth': path.resolve(__dirname, './src/auth'),
      '@context': path.resolve(__dirname, './src/context'),
      '@dashboard': path.resolve(__dirname, './src/dashboard'),
      '@features': path.resolve(__dirname, './src/features'),
      '@game': path.resolve(__dirname, './src/features/game'),
      '@services': path.resolve(__dirname, './src/services'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@stats': path.resolve(__dirname, './src/stats'),
    },
  },
});
