# Pruebas manuales — API de Videojuegos

Antes de correr estas pruebas, levanta el servidor en una terminal:

```bash
npm run dev
```

Y ejecuta los siguientes comandos en **otra** terminal. Cada bloque muestra la petición y un
ejemplo real de respuesta obtenida al probarlo.

---

## GET — Listar todos los juegos

```bash
curl http://localhost:3000/api/juegos
```

**Respuesta (200 OK):**
```json
{
  "total": 10,
  "juegos": [
    { "id": 1, "nombre": "Marvel's Spider-Man", "genero": "Accion", "plataforma": "PlayStation", "fechaLanzamiento": "2018-09-07T00:00:00.000Z", "puntaje": 87 }
  ],
  "requestId": "1c2bf633-51e0-49b9-8610-5c0b88b4c40c"
}
```

### GET — Filtrar por género (query param opcional)

```bash
curl "http://localhost:3000/api/juegos?genero=Terror"
```

## GET — Obtener un juego por id

```bash
curl http://localhost:3000/api/juegos/3
```

**Respuesta (200 OK):**
```json
{
  "juego": { "id": 3, "nombre": "FIFA 21", "genero": "Deportes", "plataforma": "PC", "fechaLanzamiento": "2020-10-09T00:00:00.000Z", "puntaje": 85 },
  "requestId": "27080708-d869-4549-9bec-a072a57ece15"
}
```

### GET — id que no existe

```bash
curl -i http://localhost:3000/api/juegos/999
```

**Respuesta (404 Not Found):**
```json
{ "error": "Juego con id 999 no encontrado", "requestId": "92f1a700-3f62-407f-884f-ece8029a61ff" }
```

---

## POST — Crear un juego nuevo

```bash
curl -X POST http://localhost:3000/api/juegos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Hades","genero":"Rol","plataforma":"PC","fechaLanzamiento":"2020-09-17","puntaje":93}'
```

**Respuesta (201 Created):**
```json
{
  "juego": { "id": 11, "nombre": "Hades", "genero": "Rol", "plataforma": "PC", "fechaLanzamiento": "2020-09-17", "puntaje": 93 },
  "requestId": "212b87fe-10c8-4fe0-bfde-ef2b7e3e3bb8"
}
```

### POST — Datos inválidos (validación)

```bash
curl -i -X POST http://localhost:3000/api/juegos \
  -H "Content-Type: application/json" \
  -d '{"nombre":""}'
```

**Respuesta (400 Bad Request):**
```json
{ "error": "nombre, genero y plataforma son obligatorios", "requestId": "b72f7de0-8465-44b0-859e-374bd407acbf" }
```

---

## PUT — Actualizar un juego existente

```bash
curl -X PUT http://localhost:3000/api/juegos/1 \
  -H "Content-Type: application/json" \
  -d '{"puntaje":91}'
```

**Respuesta (200 OK):**
```json
{
  "juego": { "id": 1, "nombre": "Marvel's Spider-Man", "genero": "Accion", "plataforma": "PlayStation", "fechaLanzamiento": "2018-09-07T00:00:00.000Z", "puntaje": 91 },
  "requestId": "cecca007-5e51-47db-b63a-26f534f0b8e9"
}
```

Nota: `PUT` acepta actualizaciones parciales (no es obligatorio enviar todos los campos),
gracias al tipo `ActualizacionJuego` (`Partial<NuevoJuego>`).

---

## DELETE — Eliminar un juego

```bash
curl -i -X DELETE http://localhost:3000/api/juegos/10
```

**Respuesta (204 No Content, sin cuerpo)**

### DELETE — id que no existe

```bash
curl -i -X DELETE http://localhost:3000/api/juegos/999
```

**Respuesta (404 Not Found):**
```json
{ "error": "Juego con id 999 no encontrado", "requestId": "..." }
```

---

## Ruta no definida (middleware catch-all)

```bash
curl http://localhost:3000/api/no-existe
```

**Respuesta (404 Not Found):**
```json
{ "error": "Ruta no encontrada: GET /api/no-existe", "requestId": "698acb89-ff5e-4efc-8f3f-0988ad0b5237" }
```

---

## Evidencia del logger (consola del servidor)

Mientras se ejecutan las pruebas de arriba, la terminal donde corre `npm run dev` muestra
una línea por cada petición:

```
[2026-09-16T23:56:33.269Z] id=27080708-d869-4549-9bec-a072a57ece15 GET /api/juegos/3 -> 200 (5ms)
[2026-09-16T23:56:33.271Z] id=92f1a700-3f62-407f-884f-ece8029a61ff GET /api/juegos/999 -> 404 (1ms)
[2026-09-16T23:56:33.285Z] id=212b87fe-10c8-4fe0-bfde-ef2b7e3e3bb8 POST /api/juegos -> 201 (4ms)
```

Esto es evidencia directa de que `requestId` y `logger` funcionan correctamente juntos: el
mismo id que ves en la respuesta JSON es el que aparece en el log del servidor.