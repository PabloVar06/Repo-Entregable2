/**
 * controllers/juegos.controller.ts
 * -----------------------------------
 * Traduce entre HTTP (req/res) y el servicio. No contiene lógica de
 * negocio: solo lee la petición, llama al servicio y decide la respuesta.
 * Cualquier error se delega a `next(error)` para que lo capture el
 * middleware centralizado (errorHandler.ts).
 */

import { Request, Response, NextFunction } from "express";
import * as juegosService from "../services/juegos.service";
import { Genero } from "../tipos/juego";
import { ApiError } from "../apiError";

export function listar(req: Request, res: Response, next: NextFunction): void {
  try {
    const genero = req.query.genero as Genero | undefined;
    const resultado = juegosService.listarJuegos(genero);
    res.json({ total: resultado.length, juegos: resultado, requestId: req.id });
  } catch (error) {
    next(error);
  }
}

export function obtenerPorId(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new ApiError(400, `"${req.params.id}" no es un id válido`);
    }
    const juego = juegosService.buscarJuegoPorId(id);
    res.json({ juego, requestId: req.id });
  } catch (error) {
    next(error); // El middleware de errores decide status y formato de la respuesta.
  }
}

export function crear(req: Request, res: Response, next: NextFunction): void {
  try {
    const nuevoJuego = juegosService.crearJuego(req.body);
    res.status(201).json({ juego: nuevoJuego, requestId: req.id });
  } catch (error) {
    next(error);
  }
}

export function actualizar(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = Number(req.params.id);
    const actualizado = juegosService.actualizarJuego(id, req.body);
    res.json({ juego: actualizado, requestId: req.id });
  } catch (error) {
    next(error);
  }
}

export function eliminar(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = Number(req.params.id);
    juegosService.eliminarJuego(id);
    res.status(204).send(); // 204 No Content: eliminado, sin cuerpo de respuesta.
  } catch (error) {
    next(error);
  }
}