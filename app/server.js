const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const START_TIME = Date.now();

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
};

function serveStatic(req, res) {
  const { pathname } = new URL(req.url, 'http://localhost');
  const relative = pathname === '/' ? 'index.html' : decodeURIComponent(pathname).slice(1);
  const filePath = path.resolve(PUBLIC_DIR, relative);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME_TYPES[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptimeSeconds: Math.floor((Date.now() - START_TIME) / 1000) }));
    return;
  }
  serveStatic(req, res);
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}

module.exports = server;
