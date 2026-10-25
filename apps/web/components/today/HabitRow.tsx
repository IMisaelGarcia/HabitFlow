"use client";

import { Check } from "lucide-react";
import type { Habit } from "../../lib/types";

type HabitRowProps = {
  habit: Habit;
  completed: boolean;
  onToggle: (id: string) => void;
};

export function HabitRow({ habit, completed, onToggle }: HabitRowProps) {
  return (
    <li>
      <button
        type="button"
        role="checkbox"
        aria-checked={completed}
        onClick={() => onToggle(habit.id)}
        className="group flex w-full items-center gap-4 rounded-card border border-border bg-surface px-4 py-3.5 text-left transition-colors hover:border-accent/50"
      >
        <span
          aria-hidden="true"
          className={`flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
            completed
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border text-transparent group-hover:border-accent"
          }`}
        >
          <Check
            size={16}
            strokeWidth={3}
            className={`transition-transform duration-200 ${
              completed ? "scale-100" : "scale-0"
            }`}
          />
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={`block text-sm font-medium transition-colors ${
              completed ? "text-muted line-through" : "text-foreground"
            }`}
          >
            {habit.name}
          </span>
          {habit.description && (
            <span className="mt-0.5 block text-xs text-muted">
              {habit.description}
            </span>
          )}
        </span>

        <span className="hidden text-xs text-muted sm:block">
          {habit.category}
        </span>
      </button>
    </li>
  );
}