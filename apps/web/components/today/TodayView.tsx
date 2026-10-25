"use client";

import Link from "next/link";
import { useState } from "react";
import {
  addDays,
  formatLongDate,
  getDayTitle,
  toDateKey,
} from "../../lib/dates";
import { useHabits } from "../../lib/habits-store";
import { useNow } from "../../lib/use-now";
import { primaryButton } from "../ui/styles";
import { DayComplete } from "./DayComplete";
import { DayNavigator } from "./DayNavigator";
import { DayProgress } from "./DayProgress";
import { EmptyHabits } from "./EmptyHabits";
import { HabitRow } from "./HabitRow";
import { TodaySkeleton } from "./TodaySkeleton";

export function TodayView() {
  const now = useNow();
  const { habits, getCompletedIds, toggleHabit } = useHabits();
  // 0 = hoy, -1 = ayer, -2 = anteayer... (no se puede avanzar más allá de hoy)
  const [offset, setOffset] = useState(0);

  // Mientras no sabemos la hora del dispositivo, mostramos un esqueleto.
  if (!now) return <TodaySkeleton />;

  const selectedDate = addDays(now, offset);
  const dateKey = toDateKey(selectedDate);
  const isToday = offset === 0;

  const activeHabits = habits.filter((habit) => !habit.archived);
  // Un hábito aparece desde el día en que fue creado.
  const visibleHabits = activeHabits.filter(
    (habit) => habit.createdOn <= dateKey,
  );

  const completedIds = getCompletedIds(dateKey);
  const done = visibleHabits.filter((habit) =>
    completedIds.includes(habit.id),
  ).length;
  const allDone = visibleHabits.length > 0 && done === visibleHabits.length;

  return (
    <div>
      <header>
        <p className="text-sm text-muted">{formatLongDate(selectedDate)}</p>
        <h1 className="mt-1 font-handwriting text-5xl text-foreground">
          {getDayTitle(selectedDate, offset)}
        </h1>
      </header>

      <div className="mt-4">
        <DayNavigator
          isToday={isToday}
          onPrevious={() => setOffset((current) => current - 1)}
          onNext={() => setOffset((current) => Math.min(0, current + 1))}
          onToday={() => setOffset(0)}
        />
      </div>

      <p className="mt-4 inline-flex rounded-card bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
        Datos temporales: se pierden al recargar la página
      </p>

      <div className="mt-6">
        <DayProgress done={done} total={visibleHabits.length} />
      </div>

      {/* Región "en vivo": los lectores de pantalla anuncian la felicitación */}
      <div aria-live="polite" className={allDone ? "mt-6" : undefined}>
        {allDone && <DayComplete isToday={isToday} />}
      </div>

      <div className="mt-6">
        {activeHabits.length === 0 ? (
          <EmptyHabits>
            <Link href="/habitos" className={`${primaryButton} mt-6`}>
              Ir a Hábitos
            </Link>
          </EmptyHabits>
        ) : visibleHabits.length === 0 ? (
          <p className="rounded-card border border-dashed border-border bg-surface px-6 py-10 text-center text-sm text-muted">
            Todavía no tenías hábitos creados en este día.
          </p>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {visibleHabits.map((habit) => (
              <HabitRow
                key={habit.id}
                habit={habit}
                completed={completedIds.includes(habit.id)}
                onToggle={(id) => toggleHabit(dateKey, id)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}