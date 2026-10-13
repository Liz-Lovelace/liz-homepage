import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site lives in site/. `vite build` makes the browser bundle (dist/client); the
// second build in `npm run build` makes the server renderer (dist/server).
export default defineConfig({
  root: 'site',
  plugins: [react()],
  build: {
    outDir: '../dist/client',
    emptyOutDir: true,
  },
});
