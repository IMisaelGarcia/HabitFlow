"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { toDateKey } from "./dates";
import { DEMO_HABITS } from "./demo-habits";
import type { Habit, HabitInput } from "./types";

// ALMACÉN TEMPORAL EN MEMORIA.
// Guarda los hábitos mientras la página está abierta. Al recargar se pierde.
// Cuando conectemos Supabase, este archivo se reemplaza por la lectura
// y escritura reales en la base de datos.

type State = {
  habits: Habit[];
  // Marcas por día: { "2026-10-25": ["id-del-habito", ...] }
  completions: Record<string, string[]>;
};

type Action =
  | { type: "add"; id: string; createdOn: string; input: HabitInput }
  | { type: "update"; id: string; input: HabitInput }
  | { type: "archive"; id: string }
  | { type: "restore"; id: string }
  | { type: "remove"; id: string }
  | { type: "toggle"; dateKey: string; id: string };

const initialState: State = {
  habits: DEMO_HABITS,
  completions: {},
};

const NO_IDS: string[] = [];

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
      return {
        ...state,
        habits: [
          ...state.habits,
          {
            id: action.id,
            archived: false,
            createdOn: action.createdOn,
            ...action.input,
          },
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
    case "remove": {
      const completions: Record<string, string[]> = {};
      for (const [dateKey, ids] of Object.entries(state.completions)) {
        completions[dateKey] = ids.filter((id) => id !== action.id);
      }
      return {
        habits: state.habits.filter((habit) => habit.id !== action.id),
        completions,
      };
    }
    case "toggle": {
      const current = state.completions[action.dateKey] ?? NO_IDS;
      const next = current.includes(action.id)
        ? current.filter((id) => id !== action.id)
        : [...current, action.id];
      return {
        ...state,
        completions: { ...state.completions, [action.dateKey]: next },
      };
    }
  }
}

// ID temporal. No usamos crypto.randomUUID() porque no está disponible
// cuando abrís la app desde el celular por http (sin https).
function newTempId(): string {
  return `temp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

type HabitsContextValue = {
  habits: Habit[];
  getCompletedIds: (dateKey: string) => string[];
  addHabit: (input: HabitInput) => void;
  updateHabit: (id: string, input: HabitInput) => void;
  archiveHabit: (id: string) => void;
  restoreHabit: (id: string) => void;
  removeHabit: (id: string) => void;
  toggleHabit: (dateKey: string, id: string) => void;
};

const HabitsContext = createContext<HabitsContextValue | null>(null);

export function HabitsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<HabitsContextValue>(
    () => ({
      habits: state.habits,
      getCompletedIds: (dateKey) => state.completions[dateKey] ?? NO_IDS,
      addHabit: (input) =>
        dispatch({
          type: "add",
          id: newTempId(),
          createdOn: toDateKey(new Date()),
          input,
        }),
      updateHabit: (id, input) => dispatch({ type: "update", id, input }),
      archiveHabit: (id) => dispatch({ type: "archive", id }),
      restoreHabit: (id) => dispatch({ type: "restore", id }),
      removeHabit: (id) => dispatch({ type: "remove", id }),
      toggleHabit: (dateKey, id) => dispatch({ type: "toggle", dateKey, id }),
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