// Lo que se carga en el formulario de un hábito.
export type HabitInput = {
  name: string;
  description: string;
  category: string;
};

// Un hábito guardado.
// Se amplía en el Paso 5 (color, ícono, frecuencia, meta).
export type Habit = {
  id: string;
  name: string;
  description?: string;
  category: string;
  archived: boolean;
};