import path from 'node:path';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.VITE_APP_VERSION ?? 'dev2'),
  },
  plugins: [
    basicSsl(),
    react(),
    {
      name: 'serve-sw',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/sw.js') {
            const result = await server.transformRequest('/src/sw.ts');
            if (!result) {
              res.statusCode = 500;
              res.end('Error transforming service worker');
              return;
            }
            // Remove import.meta.env injection and replace with actual values
            let code = result.code;
            // Remove the import.meta.env assignment line
            code = code.replace(/^import\.meta\.env\s*=\s*\{[^}]+\};?\s*/m, '');
            // Replace import.meta.env.VITE_APP_VERSION with actual value
            const version = process.env.VITE_APP_VERSION ?? 'dev2';
            code = code.replace(/import\.meta\.env\.VITE_APP_VERSION/g, JSON.stringify(version));

            res.setHeader('Content-Type', 'application/javascript');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(code);
          } else {
            next();
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3000,
    open: true,
    // biome-ignore lint/suspicious/noExplicitAny: true is accepted in runtime though the linter is dumb
    https: true as any,
    host: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        sw: path.resolve(__dirname, 'src/sw.ts'),
      },
      output: {
        format: 'es',
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'sw' ? 'sw.js' : 'assets/[name]-[hash].js';
        },
      },
    },
  },
  preview: {
    // biome-ignore lint/suspicious/noExplicitAny: true is accepted in runtime though the linter is dumb
    https: true as any,
    host: true,
  },
  publicDir: 'public',
});
