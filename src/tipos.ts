 /*Formas de datos de la API, adaptadas de categorias.ts del Entregable 1.
 */

// Los géneros permitidos en el catálogo.
export type Genero =
  | "Accion" | "Aventura" | "Deportes" | "Estrategia" | "Simulacion"
  | "Rol" | "Terror" | "Carreras" | "Musicales" | "Otros";
 
// Las plataformas/consolas permitidas.
export type Plataforma =
  | "PC" | "PlayStation" | "Xbox" | "Nintendo Switch" | "Mobile" | "VR" | "Otros";
 
// El veredicto de crítica derivado del puntaje.
export type Veredicto = "Bueno" | "Regular" | "Malo";
 
// Interface principal.
export interface Juego {
  id: number;
  nombre: string;
  genero: Genero;
  plataforma: Plataforma;
  fechaLanzamiento: Date;
  puntaje: number;
}
 
// Tipo utilitario (Omit): forma de los datos para CREAR un juego,
// sin id (el id lo asigna el servicio).
export type NuevoJuego = Omit<Juego, "id">;
 
// Tipo utilitario (Partial): forma de los datos para ACTUALIZAR un juego,
// con todos los campos opcionales (el cliente solo manda lo que cambia).
export type ActualizacionJuego = Partial<NuevoJuego>;
 