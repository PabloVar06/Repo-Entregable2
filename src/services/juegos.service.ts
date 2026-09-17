/**
 * services/juegos.service.ts
 * ---------------------------
 * Lógica de negocio pura: no conoce Express, ni req/res. Solo trabaja con
 * el arreglo de datos y lanza `ApiError` cuando algo no es válido.
 */

import { juegos } from "../data/juegos";
import { ActualizacionJuego, Genero, Juego, NuevoJuego } from "../tipos";
import { ApiError } from "../apiError";

let siguienteId = juegos.length + 1;

export function listarJuegos(genero?: Genero): Juego[] {
  if (!genero) return juegos;
  return juegos.filter((juego) => juego.genero === genero);
}

export function buscarJuegoPorId(id: number): Juego {
  const juego = juegos.find((j) => j.id === id);
  if (!juego) {
    throw new ApiError(404, `Juego con id ${id} no encontrado`);
  }
  return juego;
}

export function crearJuego(datos: NuevoJuego): Juego {
  if (!datos.nombre || !datos.genero || !datos.plataforma) {
    throw new ApiError(400, "nombre, genero y plataforma son obligatorios");
  }
  if (typeof datos.puntaje !== "number" || datos.puntaje < 0 || datos.puntaje > 100) {
    throw new ApiError(400, "puntaje debe ser un numero entre 0 y 100");
  }

  const nuevoJuego: Juego = {
    id: siguienteId,
    ...datos,
  };

  siguienteId += 1;
  juegos.push(nuevoJuego);
  return nuevoJuego;
}

export function actualizarJuego(id: number, cambios: ActualizacionJuego): Juego {
  const juego = buscarJuegoPorId(id); 

  if (
    cambios.puntaje !== undefined &&
    (typeof cambios.puntaje !== "number" || cambios.puntaje < 0 || cambios.puntaje > 100)
  ) {
    throw new ApiError(400, "puntaje debe ser un numero entre 0 y 100");
  }

  const actualizado: Juego = { ...juego, ...cambios, id: juego.id };

  const indice = juegos.findIndex((j) => j.id === id);
  juegos[indice] = actualizado;
  return actualizado;
}

export function eliminarJuego(id: number): void {
  const indice = juegos.findIndex((j) => j.id === id);
  if (indice === -1) {
    throw new ApiError(404, `Juego con id ${id} no encontrado`);
  }
  juegos.splice(indice, 1);
}