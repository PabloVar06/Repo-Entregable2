/**
 * middlewares/errorHandler.ts
 * ------------------------------
 * Middleware centralizado de errores. Express lo reconoce como "manejador
 * de errores" porque tiene 4 parámetros: (err, req, res, next).
 *
 * Debe registrarse SIEMPRE al final, después de todas las rutas, para
 * poder capturar cualquier error lanzado con next(error) en el camino.
 */

import { Request, Response, NextFunction } from "express";
import { ApiError } from "../apiError";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = err instanceof ApiError ? err.status : 500;
  const mensaje = err instanceof Error ? err.message : "Error interno del servidor";

  if (status === 500) {
    // Los errores inesperados sí se registran completos en el servidor.
    console.error(`[${new Date().toISOString()}] id=${req.id} ERROR:`, err);
  }

  res.status(status).json({
    error: mensaje,
    requestId: req.id,
  });
}