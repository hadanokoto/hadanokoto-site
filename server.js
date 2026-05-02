const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = __dirname;

const MIME = {
  '.html' : 'text/html; charset=utf-8',
  '.css'  : 'text/css; charset=utf-8',
  '.js'   : 'text/javascript; charset=utf-8',
  '.jpg'  : 'image/jpeg',
  '.jpeg' : 'image/jpeg',
  '.png'  : 'image/png',
  '.gif'  : 'image/gif',
  '.svg'  : 'image/svg+xml',
  '.ico'  : 'image/x-icon',
  '.webp' : 'image/webp',
  '.woff' : 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + urlPath);
      console.log('  404  ' + urlPath);
      return;
    }
    const ext  = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
    console.log('  200  ' + urlPath);
  });
});

// '0.0.0.0' でバインドすることでホスト名検証をスキップ
server.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('  HADANOKOTO SALON - Node.js Server');
  console.log('  http://localhost:' + PORT + '/');
  console.log('  (ngrok / any hostname: OK)');
  console.log('');
  console.log('  Ctrl+C to stop');
  console.log('');
});
