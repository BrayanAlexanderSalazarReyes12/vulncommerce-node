const crypto = require('crypto');

// LAB-CRYPTO-101: MD5 no es adecuado para contraseñas.
function hashPassword(value) {
  return crypto.createHash('md5').update(String(value)).digest('hex');
}

module.exports = { hashPassword };
