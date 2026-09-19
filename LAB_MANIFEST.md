# VulnCommerce Node - Ground Truth Manifest

Este archivo define la verdad de terreno del segundo laboratorio del proyecto Auditor.

## Hallazgos esperados

| ID | CWE orientativo | Archivo | Patrón esperado |
|---|---:|---|---|
| LAB-SQLI-101 | CWE-89 | routes/authRoutes.js | SQL concatenado con username/password |
| LAB-SQLI-102 | CWE-89 | routes/productRoutes.js | SQL concatenado con q |
| LAB-XSS-101 | CWE-79 | routes/productRoutes.js | Entrada q escrita en HTML |
| LAB-TRAV-101 | CWE-22 | routes/fileRoutes.js | Ruta construida con input sin confinamiento |
| LAB-UPLOAD-101 | CWE-434 | routes/fileRoutes.js | Upload sin allowlist de tipo/extensión |
| LAB-IDOR-101 | CWE-639 | routes/userRoutes.js | Acceso a perfil por ID sin autorización |
| LAB-AUTHZ-101 | CWE-862 | routes/adminRoutes.js | Falta validación de rol ADMIN |
| LAB-REDIR-101 | CWE-601 | routes/redirectRoutes.js | redirect con destino no validado |
| LAB-CMD-101 | CWE-78 | routes/systemRoutes.js | Entrada concatenada a comando de shell |
| LAB-SSRF-101 | CWE-918 | routes/networkRoutes.js | fetch hacia URL controlada por usuario |
| LAB-EVAL-101 | CWE-95 | routes/systemRoutes.js | eval sobre contenido del cliente |
| LAB-CRYPTO-101 | CWE-327 | weakCrypto.js | Uso de MD5 |
| LAB-SECRET-101 | CWE-798 | config.js | Secretos hardcodeados |
| LAB-JWT-101 | CWE-321 / CWE-798 | config.js + auth.js | Clave JWT débil y embebida |
| LAB-INFO-101 | CWE-209 | app.js/authRoutes.js | Stack/error interno expuesto |
| LAB-CORS-101 | CWE-942 | app.js | Access-Control-Allow-Origin: * |
| LAB-MASS-101 | CWE-915 | routes/userRoutes.js | Campo role modificable desde el request |

## Prueba de generalización Java → Node

Hay vulnerabilidades equivalentes a las de `vulnport-java`, pero implementadas con APIs, nombres y estructuras diferentes.

Ejemplos:

### SQL Injection

Java:

```java
"WHERE USERNAME='" + username + "'"
```

Node:

```js
"WHERE username='" + username + "'"
```

La receta correcta debe identificar la construcción insegura de consultas y adaptar la remediación al driver/API utilizado, no buscar literalmente una clase o variable.

### XSS

En Java la salida vulnerable se genera con `PrintWriter`.  
En Node se genera con `res.send()`.

La receta debe razonar sobre el flujo:

```
entrada no confiable -> contexto HTML -> salida sin encoding
```

### Command Injection

En Java se usa `Runtime.exec()`.  
En Node se usa `child_process.exec()`.

El patrón conceptual es el mismo aunque cambie completamente la API.

## Criterio para aceptar una receta

Una receta sólo debería almacenarse como reutilizable cuando:

1. el hallazgo original desaparece;
2. la aplicación continúa siendo válida;
3. el parche no es específico del nombre del archivo;
4. conserva la funcionalidad prevista;
5. puede reconocer una variante semánticamente equivalente;
6. adapta la implementación a la tecnología destino.

## Secuencia recomendada

1. Escanear este repositorio sin modificarlo.
2. Comparar los hallazgos contra este manifiesto.
3. Revisar si el Auditor reutiliza alguna receta aprendida en Java.
4. Corregir una vulnerabilidad.
5. Reescanear.
6. Verificar la desaparición real del hallazgo.
7. Registrar si utilizó una receta previa, una receta adaptada o creó una nueva.
