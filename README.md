# VulnCommerce Node

Aplicación **Node.js + Express** intencionalmente vulnerable para pruebas controladas del proyecto Auditor.

> ⚠️ LABORATORIO. No desplegar en Internet ni utilizar datos reales.

## Objetivo

Este repositorio sirve como segundo banco de pruebas del Evaluador/Auditor para comprobar:

- detección de vulnerabilidades;
- corrección automática;
- reescaneo;
- generación de recetas;
- reutilización de recetas en otro lenguaje/framework;
- generalización del patrón sin depender del nombre del archivo o variable.

## Stack

- Node.js 20
- Express
- SQLite en memoria
- JSON Web Tokens
- Multer

## Ejecución

```bash
npm install
npm start
```

Abrir:

```
http://localhost:3000
```

Usuarios del laboratorio:

- admin / admin123
- analyst / analyst123
- user / user123

## Vulnerabilidades sembradas

| ID | Vulnerabilidad |
|---|---|
| LAB-SQLI-101 | SQL Injection en login |
| LAB-SQLI-102 | SQL Injection en búsqueda |
| LAB-XSS-101 | Reflected XSS |
| LAB-TRAV-101 | Path Traversal |
| LAB-UPLOAD-101 | Unrestricted File Upload |
| LAB-IDOR-101 | IDOR |
| LAB-AUTHZ-101 | Broken Access Control |
| LAB-REDIR-101 | Open Redirect |
| LAB-CMD-101 | OS Command Injection |
| LAB-SSRF-101 | SSRF |
| LAB-EVAL-101 | Code Injection mediante eval |
| LAB-CRYPTO-101 | Hash MD5 |
| LAB-SECRET-101 | Secretos hardcodeados |
| LAB-JWT-101 | JWT con secreto débil/hardcodeado |
| LAB-INFO-101 | Exposición de errores |
| LAB-CORS-101 | CORS permisivo |
| LAB-MASS-101 | Mass Assignment |

Los comentarios `LAB-*` son únicamente la verdad de terreno del laboratorio. El Auditor debe detectar el patrón vulnerable y no depender de esos comentarios.
