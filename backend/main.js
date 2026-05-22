import { startWebServer } from './modules/web-server.js';
import dotenv from 'dotenv';
import { buildFrontend } from './modules/vite.js';

dotenv.config({ quiet: true });

main();

async function main() {
  const devMode = process.argv[2] === '--dev';
  if (!devMode) {
    await buildFrontend();
  }
  await startWebServer({devMode});
}