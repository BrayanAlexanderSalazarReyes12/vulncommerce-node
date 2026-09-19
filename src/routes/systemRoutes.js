const express = require('express');
const { exec } = require('child_process');

const router = express.Router();

router.get('/diagnostic', (req, res) => {
  const host = req.query.host || '127.0.0.1';

  const command = process.platform === 'win32'
    ? 'ping -n 1 ' + host
    : 'ping -c 1 ' + host;

  // LAB-CMD-101: entrada del usuario concatenada a un comando de shell.
  exec(command, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).type('text/plain').send(
        'command=' + command + '\n' +
        'error=' + err.message + '\n' +
        stderr
      );
    }

    res.type('text/plain').send(stdout);
  });
});

router.post('/calculate', (req, res) => {
  const expression = String(req.body.expression || '0');

  try {
    // LAB-EVAL-101: ejecución de código proveniente del cliente.
    const result = eval(expression);
    res.json({ expression, result });
  } catch (err) {
    res.status(400).json({ error: err.stack });
  }
});

module.exports = router;
