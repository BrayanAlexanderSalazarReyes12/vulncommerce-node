const express = require('express');

const router = express.Router();

router.get('/fetch', async (req, res) => {
  const target = req.query.url;

  if (!target) {
    return res.status(400).json({ error: 'Falta el parámetro url' });
  }

  try {
    // LAB-SSRF-101: solicitud HTTP a una URL completamente controlada
    // por el usuario, sin allowlist ni bloqueo de redes internas.
    const response = await fetch(target);
    const body = await response.text();

    res.status(response.status).type('text/plain').send(body.slice(0, 20000));
  } catch (err) {
    res.status(500).json({
      target,
      error: err.message,
      stack: err.stack
    });
  }
});

module.exports = router;
