# Manual de Uso de APIs y Endpoints

Documentación técnica de los endpoints disponibles en el backend de **Challenge Arena**.

---

## 1. Información General y Servidores

| Entorno | URL Base |
| :--- | :--- |
| **Local (Desarrollo)** | `http://localhost:3000` |
| **Producción (Render)** | `https://backend-challengearena.onrender.com` |

- **Formato de datos**: JSON (`application/json`) para endpoints de datos.
- **Formato de imágenes**: Binario (`image/png`, `image/jpeg`, etc.) según el archivo solicitado.
- **Estándar de respuesta**: REST directo (el código HTTP indica el resultado; las colecciones devuelven arrays directamente).

---

## 2. Resumen de Endpoints

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/` | Comprobación de salud / Hola Mundo |
| `GET` | `/challenges` | Obtener todos los desafíos |
| `GET` | `/challenges/:id/by-category` | Obtener desafíos filtrados por ID de categoría |
| `GET` | `/images` | Listar imágenes disponibles con metadatos y enlaces |
| `GET` | `/images/:filename` | Visualizar / descargar una imagen específica |
| `GET` | `/subscriptions` | Listar suscripciones (en desarrollo) |
| `GET` | `/users` | Listar usuarios (en desarrollo) |

---

## 3. Detalle de Endpoints

### 3.1. Estado del Servidor

#### `GET /`
Verifica que el servidor esté activo.

- **Parámetros**: Ninguno
- **Códigos de respuesta**:
  - `200 OK`
- **Ejemplo de respuesta**:
  ```json
  {
    "message": "¡Hola Mundo!"
  }
  ```

---

### 3.2. Módulo de Desafíos (`/challenges`)

#### `GET /challenges`
Retorna el catálogo completo de desafíos activos.

- **Parámetros**: Ninguno
- **Códigos de respuesta**: `200 OK`
- **Ejemplo de petición (cURL)**:
  ```bash
  curl -X GET http://localhost:3000/challenges
  ```
- **Ejemplo de respuesta**:
  ```json
  [
    {
      "id": 1,
      "categoryId": 1,
      "name": "Beso a ciegas",
      "description": "Cierra los ojos y da un beso a otra persona, sin mirar. Abrir los ojos anula el intento.",
      "isActive": true,
      "femApplied": true,
      "maleApplied": true,
      "placeOne": true,
      "placeThree": true,
      "placeFive": true,
      "femImage": "ella_besoaciega.png",
      "maleImage": "el_besoaciega.png"
    }
  ]
  ```

---

#### `GET /challenges/:id/by-category`
Filtra y retorna los desafíos que pertenezcan a la categoría indicada en `:id`.

- **Parámetros de ruta**:
  - `id` *(número, requerido)*: Identificador de la categoría (por ejemplo, `1`).
- **Códigos de respuesta**: `200 OK`
- **Ejemplo de petición (cURL)**:
  ```bash
  curl -X GET http://localhost:3000/challenges/1/by-category
  ```
- **Ejemplo de respuesta**:
  ```json
  [
    {
      "id": 1,
      "categoryId": 1,
      "name": "Beso a ciegas",
      "description": "Cierra los ojos y da un beso a otra persona...",
      "isActive": true,
      "femApplied": true,
      "maleApplied": true,
      "femImage": "ella_besoaciega.png",
      "maleImage": "el_besoaciega.png"
    },
    {
      "id": 2,
      "categoryId": 1,
      "name": "Susurro picante",
      "description": "Acércate al oído de otra persona...",
      "isActive": true,
      "femApplied": true,
      "maleApplied": true,
      "femImage": "ella_susurropicante.png",
      "maleImage": "el_susurropicante.png"
    }
  ]
  ```

---

### 3.3. Módulo de Imágenes (`/images`)

Las imágenes se almacenan físicamente en la carpeta `src/modules/challenges/data/images/`.

#### `GET /images`
Consulta el inventario de todas las imágenes disponibles en el servidor.

- **Parámetros**: Ninguno
- **Códigos de respuesta**: `200 OK`
- **Ejemplo de petición**:
  ```bash
  curl -X GET http://localhost:3000/images
  ```
- **Ejemplo de respuesta**:
  ```json
  [
    {
      "name": "jessica.png",
      "size": 206360,
      "url": "http://localhost:3000/images/jessica.png",
      "downloadUrl": "http://localhost:3000/images/jessica.png?download=true"
    },
    {
      "name": "max.jpg",
      "size": 11355,
      "url": "http://localhost:3000/images/max.jpg",
      "downloadUrl": "http://localhost:3000/images/max.jpg?download=true"
    }
  ]
  ```

---

#### `GET /images/:filename`
Sirve o descarga el archivo de imagen solicitado.

- **Parámetros de ruta**:
  - `filename` *(texto, requerido)*: Nombre del archivo con su extensión (ej. `jessica.png`, `max.jpg`).
- **Parámetros de consulta (Query params)**:
  - `download` *(opcional, booleano)*:
    - Si se omite o es `false`: Se entrega para visualización en línea en el navegador (`Content-Type: image/png` o `image/jpeg`).
    - Si es `true` o `1`: Fuerza la descarga en el cliente mediante cabecera `Content-Disposition: attachment; filename="<filename>"`.
- **Códigos de respuesta**:
  - `200 OK`: Imagen encontrada y entregada.
  - `404 Not Found`: Si la imagen no existe en la carpeta.
- **Ejemplos de uso**:
  - Visualizar en navegador:
    ```text
    http://localhost:3000/images/jessica.png
    ```
  - Forzar descarga:
    ```text
    http://localhost:3000/images/jessica.png?download=true
    ```

---

### 3.4. Módulos en Desarrollo

#### `GET /subscriptions`
- **Descripción**: Módulo de suscripciones de usuarios.
- **Respuesta actual**: `[]` (`HTTP 200 OK`)

#### `GET /users`
- **Descripción**: Módulo de gestión de usuarios.
- **Respuesta actual**: `[]` (`HTTP 200 OK`)

---

## 4. Ejemplos de Integración Frontend (JavaScript / Fetch)

### Obtener desafíos por categoría:
```javascript
async function fetchChallengesByCategory(categoryId) {
  const response = await fetch(`http://localhost:3000/challenges/${categoryId}/by-category`);
  if (!response.ok) throw new Error('Error al consultar desafíos');
  const challenges = await response.json();
  return challenges;
}
```

### Obtener lista de imágenes y renderizarlas:
```javascript
async function fetchAvailableImages() {
  const response = await fetch('http://localhost:3000/images');
  const images = await response.json();

  images.forEach(img => {
    console.log(`Imagen: ${img.name} (${(img.size / 1024).toFixed(1)} KB)`);
    console.log(`Enlace: ${img.url}`);
  });
}
```
