# Bitácora Entregable 2 — API de Videojuegos

## Tema

API REST que expone el catálogo de videojuegos del Entregable 1 (mismo dominio: nombre,
género, plataforma, fecha de lanzamiento y puntaje de crítica), ahora construida con
**Node.js + Express + TypeScript**, siguiendo una arquitectura por capas y sin base de datos
(los datos viven en un arreglo en memoria).

## Estructura del proyecto

```
bitacora-entregable2/
├── src/
│   ├── tipos.ts                      # Modelos de dominio (Juego, Genero, Plataforma, Veredicto)
│   ├── apiError.ts                   # Clase de error personalizada (status + mensaje)
│   ├── app.ts                        # Ensambla Express: middlewares, rutas, manejo de errores
│   ├── index.ts                      # Punto de entrada: arranca el servidor
│   ├── data/
│   │   └── juegos.ts                 # Catálogo de videojuegos en memoria
│   ├── middlewares/
│   │   ├── requestId.ts              # Asigna un id único a cada petición
│   │   ├── logger.ts                 # Registra metodo, ruta, status y duración
│   │   └── errorHandler.ts           # Middleware centralizado de errores
│   ├── services/
│   │   └── juegos.service.ts         # Lógica de negocio y validaciones (CRUD)
│   ├── controllers/
│   │   └── juegos.controller.ts      # Traduce HTTP <-> servicio
│   └── routes/
│       └── juegos.route.ts           # Define las 5 rutas REST
├── tsconfig.json
├── package.json
├── README.md
└── requests.md                       # Pruebas manuales (GET, POST, PUT, DELETE)
```

## Instalación

```bash
git clone https://github.com/PabloVar06/Repo-Entregable2.git
cd bitacora-entregable2
npm install
```

## Comandos

```bash
npm run build   # compila TypeScript a JavaScript (carpeta dist/), revisa errores de tipos
npm run dev     # corre el servidor en modo desarrollo con recarga automática (tsx watch)
npm start       # corre la version ya compilada (requiere haber hecho npm run build antes)
```

El servidor arranca por defecto en `http://localhost:3000`. Puede configurarse un puerto
distinto con una variable de entorno `PORT` en un archivo `.env`.

## Endpoints

| Método | Ruta | Descripción | Códigos de estado |
|---|---|---|---|
| GET | `/api/salud` | Verifica que la API está corriendo | 200 |
| GET | `/api/juegos` | Lista todos los juegos (admite `?genero=` para filtrar) | 200 |
| GET | `/api/juegos/:id` | Obtiene un juego por su id | 200, 400, 404 |
| POST | `/api/juegos` | Crea un juego nuevo | 201, 400 |
| PUT | `/api/juegos/:id` | Actualiza un juego existente (campos parciales) | 200, 400, 404 |
| DELETE | `/api/juegos/:id` | Elimina un juego | 204, 404 |

Cualquier ruta no definida responde con `404` y un mensaje consistente, gracias al
middleware catch-all. Cualquier error inesperado responde con `500`.

## Middlewares

- **`requestId`** — asigna un `id` único (UUID) a cada petición, disponible como `req.id` y
  devuelto en la respuesta.
- **`logger`** — registra en consola método, ruta, id de petición, código de estado y
  duración de cada request, usando el evento `"finish"` de la respuesta.
- **`errorHandler`** — middleware centralizado (4 parámetros) que atrapa cualquier error
  lanzado con `next(error)` en rutas o servicios, y responde con el status y mensaje
  correctos.

## Aprendizajes

La parte mas sencilla fue adaptar el catálogo y los tipos de dominio. La parte que más me costó comprender
y organizar fueron las rutas en si, por que ahora comprendo lo importante que es el asegurarse que se siga
una ruta concreta para el programa corra adecuadamente. De la misma forma fue satisfactorio ver como las 
pruebas salían correctamente, dando a entender que el API estaba fucnionando.