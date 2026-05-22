import { createServer, build } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function startDevFrontendServer() { 
  const server = await createServer({
    root: path.resolve(__dirname, '../../frontend'),
    esbuild: {
      jsx: 'automatic',
    },
    server: {
      port: 3001,
      cors: true,
    },
  });

  await server.listen();
}

export async function buildFrontend() {
  await build({
    root: path.resolve(__dirname, '../../frontend'),
    build: {
      outDir: path.resolve(__dirname, '../../build'),
      emptyOutDir: true,
    },
    esbuild: {
      jsx: 'automatic',
    },
  });
}