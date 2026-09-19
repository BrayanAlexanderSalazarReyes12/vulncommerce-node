const express = require('express');
const config = require('../config');

const router = express.Router();

router.get('/admin', (req, res) => {
  // LAB-AUTHZ-101: sólo comprueba que haya un usuario autenticado.
  // No comprueba que req.user.role sea ADMIN.
  if (!req.user) {
    return res.status(401).json({ error: 'Debes autenticarte' });
  }

  res.json({
    panel: 'Administración',
    currentUser: req.user.username,
    backupKey: config.backupKey
  });
});

module.exports = router;
