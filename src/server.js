const app = require('./app');
const config = require('./config');

app.listen(config.port, () => {
  console.log('VulnCommerce Node LAB running on http://localhost:' + config.port);
  console.log('WARNING: intentionally vulnerable training application.');
});
