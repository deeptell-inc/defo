import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'path';

export default defineConfig({
  server: {
    host: '0.0.0.0', // コンテナ内でリッスンするホスト
    port: 5173,      // コンテナ内でリッスンするポート
    hmr: {
      host: 'localhost', // ★ブラウザが接続するホスト (localhost)
      port: 5173,      // ★ブラウザが接続するポート
    },
  },
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
