const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      username TEXT,
      password TEXT,
      full_name TEXT,
      email TEXT,
      role TEXT
    )
  `);

  db.run(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      owner TEXT,
      price REAL
    )
  `);

  db.run(`
    INSERT INTO users (id, username, password, full_name, email, role) VALUES
    (1, 'admin', 'admin123', 'Administrador VulnCommerce', 'admin@lab.local', 'ADMIN'),
    (2, 'analyst', 'analyst123', 'Analista Auditor', 'analyst@lab.local', 'ANALYST'),
    (3, 'user', 'user123', 'Usuario Demo', 'user@lab.local', 'USER')
  `);

  db.run(`
    INSERT INTO products (id, name, owner, price) VALUES
    (1, 'Diesel Demo', 'ACME', 1250.00),
    (2, 'Gasolina Demo', 'PORTLAB', 980.00),
    (3, 'Lubricante Demo', 'ACME', 330.00)
  `);
});

module.exports = db;
