import express from 'express';
import httpProxy from 'http-proxy-3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function startWebServer({devMode}) {
  const app = express();
  app.use(express.json());

  app.use('/static', express.static(path.join(__dirname, '../../static')));

  if (devMode) {
    console.log('Proxying to frontend dev server');
    proxyDevHttpRequests(app);
  } else {
    serveFrontendRoutes(app);
  }

  const server = app.listen(3000, () => {
    console.log(`Web server running at http://localhost:3000`);
  });

  if (devMode) {
    proxyDevWebsocketRequests(server);
  }
}

function serveFrontendRoutes(app) {
  app.use('/', express.static(path.join(__dirname, '../../build')));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/index.html')); 
  });
}

function proxyDevHttpRequests(app) {
  const proxy = httpProxy.createProxyServer({
    target: 'http://localhost:3001',
    changeOrigin: true,
  });
  app.use('/', (req, res) => {
    proxy.web(req, res, (err) => {
      if (err) {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error');
      }
    });
  });
}

function proxyDevWebsocketRequests(server) {
  const proxy = httpProxy.createProxyServer({
    target: 'http://localhost:3001',
    changeOrigin: true,
  });
  server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head, (err) => {
      if (err) {
        console.error('WebSocket proxy error:', err);
        socket.destroy();
      }
    });
  });
}