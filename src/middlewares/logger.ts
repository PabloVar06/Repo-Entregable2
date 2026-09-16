/**
 * middlewares/logger.ts
 * ------------------------
 * Registra método, ruta, id de petición y duración de cada request.
 * Se apoya en el evento "finish" de la respuesta para calcular cuánto
 * tardó — programación orientada a eventos aplicada dentro de Express.
 */

import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction): void {
  const inicio = Date.now();

  // El evento "finish" ocurre cuando la respuesta terminó de enviarse.
  // No bloqueamos nada esperando: solo nos suscribimos al evento.
  res.on("finish", () => {
    const duracionMs = Date.now() - inicio;
    console.log(
      `[${new Date().toISOString()}] id=${req.id} ${req.method} ${req.originalUrl} ` +
        `-> ${res.statusCode} (${duracionMs}ms)`
    );
  });

  next();
}