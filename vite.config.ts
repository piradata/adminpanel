import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      devOptions: {
        enabled: true,
      },
      workbox: {
        sourcemap: false,
      },
      manifest: {
        name: 'Server Administration Dashboard',
        short_name: 'Server Admin',
        description: 'Central hub for Linux server administration and service management',
        theme_color: '#0f172a',
        orientation: 'portrait-primary',
        start_url: '/?source=pwa',
        scope: '/',
        display: 'standalone',

        background_color: '#0f172a',
        prefer_related_applications: false,
        icons: [
          {
            src: '/favicon.ico',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
        ],
        categories: ['productivity', 'utilities'],
        screenshots: [],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  publicDir: 'public',
});
