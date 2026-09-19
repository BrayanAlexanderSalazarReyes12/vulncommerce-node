const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/profile/:id', (req, res) => {
  // LAB-IDOR-101: consulta un perfil únicamente por el ID solicitado.
  db.get(
    'SELECT id, username, full_name, email, role FROM users WHERE id = ?',
    [req.params.id],
    (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(404).json({ error: 'No encontrado' });

      res.json(user);
    }
  );
});

router.put('/profile/:id', (req, res) => {
  const email = req.body.email || '';
  const role = req.body.role || 'USER';

  // LAB-MASS-101: permite modificar un campo sensible (role) recibido del cliente.
  db.run(
    'UPDATE users SET email = ?, role = ? WHERE id = ?',
    [email, role, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes, id: req.params.id, email, role });
    }
  );
});

module.exports = router;
