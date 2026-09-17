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

juegosRouter.get("/", juegosController.listar);           
juegosRouter.get("/:id", juegosController.obtenerPorId);  
juegosRouter.post("/", juegosController.crear);           
juegosRouter.put("/:id", juegosController.actualizar);    
juegosRouter.delete("/:id", juegosController.eliminar);   