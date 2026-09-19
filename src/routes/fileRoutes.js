const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');
const multer = require('multer');

const router = express.Router();

const filesDir = path.join(os.tmpdir(), 'vulncommerce-files');
const uploadsDir = path.join(os.tmpdir(), 'vulncommerce-uploads');

fs.mkdirSync(filesDir, { recursive: true });
fs.mkdirSync(uploadsDir, { recursive: true });

const sample = path.join(filesDir, 'manual.txt');
if (!fs.existsSync(sample)) {
  fs.writeFileSync(sample, 'Manual de laboratorio VulnCommerce Node\n');
}

// LAB-UPLOAD-101: conserva archivos sin allowlist de extensiones/MIME.
// El destino también queda fuera de una política de almacenamiento segura.
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage });

router.get('/download', (req, res) => {
  const requested = req.query.file || 'manual.txt';

  // LAB-TRAV-101: combina entrada del usuario con la ruta base sin
  // comprobar que la ruta final permanezca dentro del directorio permitido.
  const target = path.join(filesDir, requested);

  fs.readFile(target, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({
        error: err.message,
        attemptedPath: target
      });
    }

    res.type('text/plain').send(data);
  });
});

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Falta archivo' });
  }

  res.json({
    message: 'Archivo cargado',
    originalName: req.file.originalname,
    storedAt: req.file.path,
    mimetype: req.file.mimetype
  });
});

module.exports = router;
