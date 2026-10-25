import { HABIT_CATEGORIES } from "./categories";
import type { HabitInput } from "./types";

export const NAME_MAX = 60;
export const DESCRIPTION_MAX = 120;

export type HabitErrors = {
  name?: string;
  description?: string;
  category?: string;
};

export function validateHabitInput(input: HabitInput): HabitErrors {
  const errors: HabitErrors = {};

  if (input.name.length === 0) {
    errors.name = "Escribí un nombre para el hábito.";
  } else if (input.name.length > NAME_MAX) {
    errors.name = `El nombre puede tener hasta ${NAME_MAX} caracteres.`;
  }

  if (input.description.length > DESCRIPTION_MAX) {
    errors.description = `La descripción puede tener hasta ${DESCRIPTION_MAX} caracteres.`;
  }

  if (!HABIT_CATEGORIES.includes(input.category)) {
    errors.category = "Elegí una categoría de la lista.";
  }

  return errors;
}