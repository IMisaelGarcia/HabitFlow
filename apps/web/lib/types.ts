// Lo que se carga en el formulario de un hábito.
export type HabitInput = {
  name: string;
  description: string;
  category: string;
};

// Un hábito guardado.
// Se amplía en el Paso 5b (color, ícono, frecuencia, meta).
export type Habit = {
  id: string;
  name: string;
  description?: string;
  category: string;
  archived: boolean;
  createdOn: string; // día de creación, formato "AAAA-MM-DD"
};