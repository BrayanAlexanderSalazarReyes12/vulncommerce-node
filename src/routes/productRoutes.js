const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/search', (req, res) => {
  const q = req.query.q || '';

  // LAB-SQLI-102: búsqueda concatenada a la sentencia SQL.
  const sql =
    "SELECT id, name, owner, price FROM products " +
    "WHERE name LIKE '%" + q + "%' OR owner LIKE '%" + q + "%'";

  db.all(sql, (err, rows) => {
    if (err) {
      return res.status(500).send('<pre>' + err.stack + '</pre>');
    }

    let html = '<h1>Resultados para: ' + q + '</h1><ul>';

    for (const row of rows) {
      html += '<li>' + row.id + ' - ' + row.name +
        ' / ' + row.owner + ' / $' + row.price + '</li>';
    }

    html += '</ul><p><a href="/">Volver</a></p>';

    // LAB-XSS-101: q se inserta directamente en HTML sin escape.
    res.send(html);
  });
});

module.exports = router;
