import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const router = (req, res) => {
  const render = (filename) => {
    const filepath = path.join(__dirname, '../views', filename);
    fs.readFile(filepath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error interno');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  };

switch (req.url) {
  case '/':
    render('home.html');
    break;
  case '/values':
    render('values.html');  // ✅ correcto
    break;
  case '/skills':
    render('skills.html');  // ✅ si está en carpeta
    break;
  case '/projects':
    render('projects.html');  // ✅ si está en carpeta
    break;
  case '/contact':
    render('contact.html');  // ✅ si está en carpeta
    break;case '/test':
  render('projects.html');  // 👈 prueba directa
  break;

  default:
    res.writeHead(404);
    res.end('Página no encontrada');
}

};
