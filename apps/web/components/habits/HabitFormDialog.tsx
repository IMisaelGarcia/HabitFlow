"use client";

import { useId, useState } from "react";
import { HABIT_CATEGORIES } from "../../lib/categories";
import type { Habit, HabitInput } from "../../lib/types";
import {
  DESCRIPTION_MAX,
  NAME_MAX,
  validateHabitInput,
  type HabitErrors,
} from "../../lib/validation";
import { Modal } from "../ui/Modal";
import { fieldClass, primaryButton, secondaryButton } from "../ui/styles";

type HabitFormDialogProps = {
  habit: Habit | null; // null = crear uno nuevo
  onSubmit: (input: HabitInput) => void;
  onClose: () => void;
};

export function HabitFormDialog({
  habit,
  onSubmit,
  onClose,
}: HabitFormDialogProps) {
  const [name, setName] = useState(habit?.name ?? "");
  const [description, setDescription] = useState(habit?.description ?? "");
  const [category, setCategory] = useState(
    habit?.category ?? HABIT_CATEGORIES[0],
  );
  const [errors, setErrors] = useState<HabitErrors>({});

  const nameId = useId();
  const descriptionId = useId();
  const categoryId = useId();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input: HabitInput = {
      name: name.trim(),
      description: description.trim(),
      category,
    };
    const found = validateHabitInput(input);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    onSubmit(input);
  }

  return (
    <Modal title={habit ? "Editar hábito" : "Nuevo hábito"} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
        <div>
          <label htmlFor={nameId} className="text-sm font-medium">
            Nombre
          </label>
          <input
            id={nameId}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={NAME_MAX + 20}
            autoFocus
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            placeholder="Por ejemplo: Caminar 30 minutos"
            className={fieldClass}
          />
          {errors.name && (
            <p id={`${nameId}-error`} role="alert" className="mt-1 text-xs text-danger">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={descriptionId} className="text-sm font-medium">
            Descripción <span className="font-normal text-muted">(opcional)</span>
          </label>
          <input
            id={descriptionId}
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={DESCRIPTION_MAX + 20}
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={
              errors.description ? `${descriptionId}-error` : undefined
            }
            className={fieldClass}
          />
          {errors.description && (
            <p
              id={`${descriptionId}-error`}
              role="alert"
              className="mt-1 text-xs text-danger"
            >
              {errors.description}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={categoryId} className="text-sm font-medium">
            Categoría
          </label>
          <select
            id={categoryId}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-invalid={errors.category ? true : undefined}
            aria-describedby={errors.category ? `${categoryId}-error` : undefined}
            className={fieldClass}
          >
            {HABIT_CATEGORIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.category && (
            <p
              id={`${categoryId}-error`}
              role="alert"
              className="mt-1 text-xs text-danger"
            >
              {errors.category}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className={secondaryButton}>
            Cancelar
          </button>
          <button type="submit" className={primaryButton}>
            {habit ? "Guardar cambios" : "Crear hábito"}
          </button>
        </div>
      </form>
    </Modal>
  );
}