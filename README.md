# Challenge Arena - Backend

Backend desarrollado con **Node.js** y **Fastify** utilizando una arquitectura modular por dominios.

## 🚀 Inicio Rápido

### Requisitos
- Node.js v20+ (recomendado Node v24)
- npm

### Instalación
```bash
npm install
```

### Ejecutar en Desarrollo
Inicia el servidor con recarga automática (`--watch` nativo):
```bash
npm run dev
```

### Ejecutar en Producción
```bash
npm start
```

El servidor estará escuchando en `http://localhost:3000`.

---

## 📖 Documentación de la API

El manual completo de endpoints, parámetros, formatos de respuesta y ejemplos de uso se encuentra en:

👉 **[Manual de APIs y Endpoints (docs/api.md)](./docs/api.md)**

### Resumen de Endpoints:
- `GET /`: Healthcheck / Hola Mundo.
- `GET /challenges`: Listar todos los desafíos.
- `GET /challenges/:id/by-category`: Listar desafíos filtrados por categoría.
- `GET /images`: Listar todas las imágenes disponibles.
- `GET /images/:filename`: Ver / descargar una imagen.
- `GET /subscriptions`: Módulo de suscripciones.
- `GET /users`: Módulo de usuarios.
