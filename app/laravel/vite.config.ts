import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/ts/main.tsx',
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
        '@': resolve(__dirname, 'resources/ts')
    }
  }
});
