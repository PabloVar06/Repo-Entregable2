/**
 * app.ts
 * ------
 * Ensambla la aplicación Express: middlewares globales, rutas y el
 * middleware centralizado de errores. El ORDEN de app.use() es la parte
 * más importante de este archivo (ver pista.md).
 */

import express, { Express, Request, Response } from "express";
import { requestId } from "./middlewares/requestId";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { juegosRouter } from "./routes/juegos.route";
import { ApiError } from "./apiError";

export function crearApp(): Express {
  const app = express();

  app.use(express.json());

  app.use(requestId);

  app.use(logger);

  app.get("/api/salud", (req: Request, res: Response) => {
    res.json({ estado: "ok", requestId: req.id });
  });

  app.use("/api/juegos", juegosRouter);

  app.use((req: Request, res: Response, next) => {
    next(new ApiError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`));
  });

  app.use(errorHandler);

  return app;
}
