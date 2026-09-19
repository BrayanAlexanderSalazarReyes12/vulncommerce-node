module.exports = {
  port: process.env.PORT || 3000,

  // LAB-SECRET-101: secretos ficticios hardcodeados para el laboratorio.
  internalApiUser: 'lab_service',
  internalApiPassword: 'LAB_ONLY_PASSWORD_456',
  backupKey: 'vulncommerce-backup-key-lab',

  // LAB-JWT-101: secreto JWT débil y hardcodeado.
  jwtSecret: 'secret123'
};
