import type { ReactNode } from "react";
import type { Habit } from "../../lib/types";

type HabitManageRowProps = {
  habit: Habit;
  children: ReactNode; // los botones de acción
};

export function HabitManageRow({ habit, children }: HabitManageRowProps) {
  return (
    <li className="flex items-center gap-3 rounded-card border border-border bg-surface px-4 py-3.5">
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium ${
            habit.archived ? "text-muted" : "text-foreground"
          }`}
        >
          {habit.name}
        </p>
        {habit.description && (
          <p className="mt-0.5 text-xs text-muted">{habit.description}</p>
        )}
        <p className="mt-1 text-xs text-muted">{habit.category}</p>
      </div>
      <div className="flex shrink-0 gap-1">{children}</div>
    </li>
  );
}