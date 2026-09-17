/**
 * middlewares/requestId.ts
 * ---------------------------
 * Asigna un identificador único a cada petición ANTES de que llegue a
 * cualquier ruta. Otros middlewares y controladores pueden leerlo con
 * `req.id`, y lo devolvemos también en el header de la respuesta.
 *
 * Nota de tipado: extendemos la interface `Request` de Express para que
 * TypeScript reconozca `req.id` en el resto del proyecto sin usar `any`.
 */

import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export function requestId(req: Request, res: Response, next: NextFunction): void {
  req.id = crypto.randomUUID();
  res.setHeader("X-Request-Id", req.id);
  next(); 
}