import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      include: 'src/assets/**/*.svg',
    }),
  ],
  server: {
    port: 3000,
    // auto refresh
    watch: {
      usePolling: true,
      interval: 100,
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
    },
    // end auto refresh
  },
  resolve: {
    alias: {
      '@':  path.resolve(__dirname, './src'),
    },
  },
});
