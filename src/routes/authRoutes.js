const express = require('express');
const db = require('../db');
const { createToken } = require('../auth');

const router = express.Router();

router.post('/login', (req, res) => {
  const username = req.body.username || '';
  const password = req.body.password || '';

  // LAB-SQLI-101: entrada del usuario concatenada directamente a SQL.
  const sql =
    "SELECT id, username, full_name, role FROM users " +
    "WHERE username='" + username + "' AND password='" + password + "'";

  db.get(sql, (err, user) => {
    if (err) {
      // LAB-INFO-101: devuelve detalles internos del motor.
      return res.status(500).json({
        error: err.message,
        sql
      });
    }

    if (!user) {
      return res.status(401).json({
        error: 'Credenciales incorrectas',
        username
      });
    }

    return res.json({
      message: 'Login correcto',
      token: createToken(user),
      user
    });
  });
});

module.exports = router;
