import type { Habit } from "./types";

// DATOS DE DEMOSTRACIÓN TEMPORALES.
// No son datos reales: se eliminan cuando conectemos Supabase.
export const DEMO_HABITS: Habit[] = [
  {
    id: "demo-1",
    name: "Tomar dos litros de agua",
    description: "Una botella a la mañana y otra a la tarde",
    category: "Salud",
    archived: false,
  },
  {
    id: "demo-2",
    name: "Caminar 30 minutos",
    category: "Movimiento",
    archived: false,
  },
  {
    id: "demo-3",
    name: "Leer 15 páginas",
    description: "Lo que tengas en la mesa de luz",
    category: "Mente",
    archived: false,
  },
  {
    id: "demo-4",
    name: "Meditar 10 minutos",
    category: "Bienestar",
    archived: false,
  },
  {
    id: "demo-5",
    name: "Escribir en el diario",
    description: "Tres líneas alcanzan",
    category: "Bienestar",
    archived: false,
  },
];