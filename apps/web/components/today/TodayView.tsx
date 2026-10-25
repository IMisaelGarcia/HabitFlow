"use client";

import Link from "next/link";
import { formatLongDate, getGreeting } from "../../lib/dates";
import { useHabits } from "../../lib/habits-store";
import { useNow } from "../../lib/use-now";
import { primaryButton } from "../ui/styles";
import { DayComplete } from "./DayComplete";
import { DayProgress } from "./DayProgress";
import { EmptyHabits } from "./EmptyHabits";
import { HabitRow } from "./HabitRow";

export function TodayView() {
  const now = useNow();
  const { habits, completedIds, toggleHabit } = useHabits();

  const activeHabits = habits.filter((habit) => !habit.archived);
  const done = activeHabits.filter((habit) =>
    completedIds.includes(habit.id),
  ).length;
  const allDone = activeHabits.length > 0 && done === activeHabits.length;

  return (
    <div>
      <header>
        <p className="min-h-5 text-sm text-muted">
          {now ? formatLongDate(now) : "\u00A0"}
        </p>
        <h1 className="mt-1 min-h-14 font-handwriting text-5xl text-foreground">
          {now ? getGreeting(now) : "\u00A0"}
        </h1>
      </header>

      <p className="mt-4 inline-flex rounded-card bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
        Datos temporales: se pierden al recargar la página
      </p>

      <div className="mt-6">
        <DayProgress done={done} total={activeHabits.length} />
      </div>

      {/* Región "en vivo": los lectores de pantalla anuncian la felicitación */}
      <div aria-live="polite" className={allDone ? "mt-6" : undefined}>
        {allDone && <DayComplete />}
      </div>

      <div className="mt-6">
        {activeHabits.length === 0 ? (
          <EmptyHabits>
            <Link href="/habitos" className={`${primaryButton} mt-6`}>
              Ir a Hábitos
            </Link>
          </EmptyHabits>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {activeHabits.map((habit) => (
              <HabitRow
                key={habit.id}
                habit={habit}
                completed={completedIds.includes(habit.id)}
                onToggle={toggleHabit}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}