"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { DEMO_HABITS } from "./demo-habits";
import type { Habit, HabitInput } from "./types";

// ALMACÉN TEMPORAL EN MEMORIA.
// Guarda los hábitos mientras la página está abierta. Al recargar se pierde.
// Cuando conectemos Supabase, este archivo se reemplaza por la lectura
// y escritura reales en la base de datos.

type State = {
  habits: Habit[];
  completedIds: string[];
};

type Action =
  | { type: "add"; id: string; input: HabitInput }
  | { type: "update"; id: string; input: HabitInput }
  | { type: "archive"; id: string }
  | { type: "restore"; id: string }
  | { type: "remove"; id: string }
  | { type: "toggle"; id: string };

const initialState: State = {
  habits: DEMO_HABITS,
  completedIds: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
      return {
        ...state,
        habits: [
          ...state.habits,
          { id: action.id, archived: false, ...action.input },
        ],
      };
    case "update":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.id ? { ...habit, ...action.input } : habit,
        ),
      };
    case "archive":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.id ? { ...habit, archived: true } : habit,
        ),
      };
    case "restore":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.id ? { ...habit, archived: false } : habit,
        ),
      };
    case "remove":
      return {
        habits: state.habits.filter((habit) => habit.id !== action.id),
        completedIds: state.completedIds.filter((id) => id !== action.id),
      };
    case "toggle":
      return {
        ...state,
        completedIds: state.completedIds.includes(action.id)
          ? state.completedIds.filter((id) => id !== action.id)
          : [...state.completedIds, action.id],
      };
  }
}

// ID temporal. No usamos crypto.randomUUID() porque no está disponible
// cuando abrís la app desde el celular por http (sin https).
function newTempId(): string {
  return `temp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

type HabitsContextValue = {
  habits: Habit[];
  completedIds: string[];
  addHabit: (input: HabitInput) => void;
  updateHabit: (id: string, input: HabitInput) => void;
  archiveHabit: (id: string) => void;
  restoreHabit: (id: string) => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string) => void;
};

const HabitsContext = createContext<HabitsContextValue | null>(null);

export function HabitsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<HabitsContextValue>(
    () => ({
      habits: state.habits,
      completedIds: state.completedIds,
      addHabit: (input) => dispatch({ type: "add", id: newTempId(), input }),
      updateHabit: (id, input) => dispatch({ type: "update", id, input }),
      archiveHabit: (id) => dispatch({ type: "archive", id }),
      restoreHabit: (id) => dispatch({ type: "restore", id }),
      removeHabit: (id) => dispatch({ type: "remove", id }),
      toggleHabit: (id) => dispatch({ type: "toggle", id }),
    }),
    [state],
  );

  return (
    <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
  );
}

export function useHabits(): HabitsContextValue {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits debe usarse dentro de <HabitsProvider>.");
  }
  return context;
}