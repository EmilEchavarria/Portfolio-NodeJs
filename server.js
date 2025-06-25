import http from 'http';
import fs from 'fs';
import path from 'path';
import { router } from './routes/pages.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

// 👉 Middleware para servir archivos estáticos desde la carpeta "public"
const serveStatic = (req, res) => {
  const filePath = path.join(process.cwd(), 'public', req.url);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();

    const contentType = {
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.ico': 'image/x-icon',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
    }[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
    return true;
  }

  return false;
};

// 🚀 Crear servidor
const server = http.createServer((req, res) => {
  if (!serveStatic(req, res)) {
    router(req, res); // Si no es archivo estático, delega a las páginas HTML
  }
});

// 🟢 Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
