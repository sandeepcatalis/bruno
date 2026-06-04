const { ipcMain } = require('electron');
const { fork } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

class MockServerManager {
  constructor() {
    this.servers = new Map(); // collectionUid -> { process, port, pid }
    this.setupIpcHandlers();
  }

  setupIpcHandlers() {
    ipcMain.handle('mock-server:start', async (event, { collectionUid, port, routes }) => {
      try {
        if (this.servers.has(collectionUid)) {
          return { success: false, error: 'Mock server already running for this collection' };
        }

        const serverScript = this.generateServerScript(routes, port);
        const tmpDir = os.tmpdir();
        const scriptPath = path.join(tmpDir, `bruno-mock-${collectionUid}.js`);

        fs.writeFileSync(scriptPath, serverScript, 'utf-8');

        const child = fork(scriptPath, [], {
          stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
          env: { ...process.env, MOCK_PORT: String(port) }
        });

        return new Promise((resolve) => {
          let started = false;

          child.on('message', (msg) => {
            if (msg.type === 'started') {
              started = true;
              this.servers.set(collectionUid, { process: child, port: msg.port, pid: child.pid, scriptPath });
              resolve({ success: true, port: msg.port, pid: child.pid });
            }
            if (msg.type === 'error') {
              resolve({ success: false, error: msg.error });
            }
          });

          child.on('error', (err) => {
            if (!started) {
              resolve({ success: false, error: err.message });
            }
          });

          child.on('exit', (code) => {
            this.servers.delete(collectionUid);
            if (!started) {
              resolve({ success: false, error: `Server exited with code ${code}` });
            }
            try {
              if (event.sender && !event.sender.isDestroyed()) {
                event.sender.send('mock-server:stopped', { collectionUid });
              }
            } catch (e) { /* ignore */ }
          });

          // Timeout after 5s
          setTimeout(() => {
            if (!started) {
              child.kill();
              resolve({ success: false, error: 'Server start timed out' });
            }
          }, 5000);
        });
      } catch (err) {
        return { success: false, error: err.message };
      }
    });

    ipcMain.handle('mock-server:stop', async (event, { collectionUid }) => {
      const server = this.servers.get(collectionUid);
      if (!server) {
        return { success: false, error: 'No mock server running for this collection' };
      }

      server.process.kill();
      this.servers.delete(collectionUid);

      // Clean up temp file
      try { fs.unlinkSync(server.scriptPath); } catch (e) { /* ignore */ }

      return { success: true };
    });

    ipcMain.handle('mock-server:status', async (event, { collectionUid }) => {
      const server = this.servers.get(collectionUid);
      if (!server) {
        return { running: false };
      }
      return { running: true, port: server.port, pid: server.pid };
    });

    ipcMain.handle('mock-server:export', async (event, { routes, port, outputPath }) => {
      try {
        const serverScript = this.generateStandaloneScript(routes, port);
        const packageJson = this.generatePackageJson();

        fs.mkdirSync(outputPath, { recursive: true });
        fs.writeFileSync(path.join(outputPath, 'server.js'), serverScript, 'utf-8');
        fs.writeFileSync(path.join(outputPath, 'package.json'), packageJson, 'utf-8');

        return { success: true, outputPath };
      } catch (err) {
        return { success: false, error: err.message };
      }
    });
  }

  generateServerScript(routes, port) {
    const routeHandlers = routes.map((route) => {
      const method = (route.method || 'get').toLowerCase();
      const path = this.normalizePath(route.url);
      const status = route.status || 200;
      const headers = route.headers || {};
      const body = route.body || '';

      return `
app.${method}('${path}', (req, res) => {
  ${Object.entries(headers).map(([k, v]) => `res.setHeader(${JSON.stringify(k)}, ${JSON.stringify(v)});`).join('\n  ')}
  res.status(${status});
  try {
    const parsed = JSON.parse(${JSON.stringify(body)});
    res.json(parsed);
  } catch(e) {
    res.send(${JSON.stringify(body)});
  }
});`;
    }).join('\n');

    return `
const http = require('http');
const url = require('url');

class MiniExpress {
  constructor() {
    this.routes = [];
    this.middlewares = [];
  }

  use(fn) { this.middlewares.push(fn); }

  _addRoute(method, path, handler) {
    // Convert Express-style :param to regex
    const paramNames = [];
    const regexStr = path.replace(/:([^/]+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });
    this.routes.push({ method: method.toUpperCase(), regex: new RegExp('^' + regexStr + '(\\\\?.*)?$'), handler, paramNames });
  }

  get(path, handler) { this._addRoute('GET', path, handler); }
  post(path, handler) { this._addRoute('POST', path, handler); }
  put(path, handler) { this._addRoute('PUT', path, handler); }
  patch(path, handler) { this._addRoute('PATCH', path, handler); }
  delete(path, handler) { this._addRoute('DELETE', path, handler); }
  options(path, handler) { this._addRoute('OPTIONS', path, handler); }
  head(path, handler) { this._addRoute('HEAD', path, handler); }

  handle(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    req.query = parsedUrl.query;

    // Enhanced response object
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (data) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)); };
    res.send = (data) => { res.end(data); };
    res.setHeader = res.setHeader.bind(res);

    for (const route of this.routes) {
      if (route.method !== req.method && route.method !== 'ALL') continue;
      const match = pathname.match(route.regex);
      if (match) {
        req.params = {};
        route.paramNames.forEach((name, i) => { req.params[name] = match[i + 1]; });
        return route.handler(req, res);
      }
    }
    
    // Not found
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Not Found', availableRoutes: this.routes.map(r => r.method + ' ' + r.regex.source) }));
  }

  listen(port, cb) {
    const server = http.createServer((req, res) => {
      // CORS
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end(); }
      this.handle(req, res);
    });
    server.listen(port, cb);
    return server;
  }
}

const app = new MiniExpress();

${routeHandlers}

const PORT = process.env.MOCK_PORT || ${port};
const server = app.listen(PORT, () => {
  if (process.send) {
    process.send({ type: 'started', port: PORT });
  }
});

process.on('SIGTERM', () => { server.close(); process.exit(0); });
process.on('SIGINT', () => { server.close(); process.exit(0); });
`;
  }

  generateStandaloneScript(routes, port) {
    return this.generateServerScript(routes, port).replace(
      `if (process.send) {\n    process.send({ type: 'started', port: PORT });\n  }`,
      `console.log('Mock server running on http://localhost:' + PORT);`
    );
  }

  generatePackageJson() {
    return JSON.stringify({
      name: 'bruno-mock-server',
      version: '1.0.0',
      description: 'Mock server generated by Bruno',
      main: 'server.js',
      scripts: {
        start: 'node server.js'
      }
    }, null, 2);
  }

  normalizePath(urlStr) {
    try {
      const parsed = new URL(urlStr);
      return parsed.pathname || '/';
    } catch {
      // If it's already a path
      if (urlStr.startsWith('/')) return urlStr;
      // Try to extract path from partial URL
      const match = urlStr.match(/(?:https?:\/\/[^/]+)?(\/[^?#]*)/);
      return match ? match[1] : '/';
    }
  }

  cleanup() {
    for (const [uid, server] of this.servers) {
      server.process.kill();
      try { fs.unlinkSync(server.scriptPath); } catch (e) { /* ignore */ }
    }
    this.servers.clear();
  }
}

module.exports = MockServerManager;
