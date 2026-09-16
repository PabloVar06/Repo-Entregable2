/**
 * routes/juegos.routes.ts
 * --------------------------
 * Define las 5 rutas CRUD y las conecta con el controlador. Este archivo
 * NO sabe qué hace cada controlador por dentro — solo asocia verbo+ruta
 * con la función que debe manejarla.
 */

import { Router } from "express";
import * as juegosController from "../controllers/juegos.controller";

export const juegosRouter = Router();

juegosRouter.get("/", juegosController.listar);           // GET    /juegos            -> listar (con ?genero= opcional)
juegosRouter.get("/:id", juegosController.obtenerPorId);  // GET    /juegos/:id         -> obtener uno
juegosRouter.post("/", juegosController.crear);           // POST   /juegos            -> crear
juegosRouter.put("/:id", juegosController.actualizar);    // PUT    /juegos/:id         -> actualizar
juegosRouter.delete("/:id", juegosController.eliminar);   // DELETE /juegos/:id         -> eliminar