const express = require('express');

const router = express.Router();

router.get('/go', (req, res) => {
  const next = req.query.next || '/';

  // LAB-REDIR-101: redirección a un destino controlado por el usuario.
  res.redirect(next);
});

module.exports = router;
