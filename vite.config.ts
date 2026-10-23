import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    host: true,
    port: 5173
  },
  preview: {
    host: true,
    port: 4173
  },
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'html-rewrite-plugin',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url) {
            const clean = req.url.split('?')[0].replace(/\/+$/, '');
            const routes = ['/app', '/deep', '/futarchy', '/opportunity', '/risk', '/rationale'];
            if (routes.includes(clean)) {
              req.url = `${clean}.html`;
            }
          }
          next();
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        app: resolve(import.meta.dirname, 'app.html'),
        deep: resolve(import.meta.dirname, 'deep.html'),
        futarchy: resolve(import.meta.dirname, 'futarchy.html'),
        opportunity: resolve(import.meta.dirname, 'opportunity.html'),
        risk: resolve(import.meta.dirname, 'risk.html'),
        rationale: resolve(import.meta.dirname, 'rationale.html'),
      }
    }
  }
});
