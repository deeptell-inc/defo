import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/css/index.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
      alias: {
        '@': '/resources/js',
      },
    },
    server: {
      watch: {
        usePolling: true, // Dockerでファイルシステムの変更を検知するために必要
      },
      host: '0.0.0.0', // 外部からアクセスできるようにホストを指定
      port: 3000, // フロントエンドのポート (Laravelは8080で動作中)
      hmr: {
        host: 'localhost',
      },
    },
    build: {
        rollupOptions: {
            input: 'resources/js/app.jsx',
        },
    },
});
