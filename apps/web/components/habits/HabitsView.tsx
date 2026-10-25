"use client";

import { Archive, ArchiveRestore, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useHabits } from "../../lib/habits-store";
import type { HabitInput } from "../../lib/types";
import { EmptyHabits } from "../today/EmptyHabits";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { iconButton, primaryButton } from "../ui/styles";
import { Toast, type ToastMessage } from "../ui/Toast";
import { HabitFormDialog } from "./HabitFormDialog";
import { HabitManageRow } from "./HabitManageRow";

type DialogState = { mode: "create" } | { mode: "edit"; habitId: string } | null;

export function HabitsView() {
  const {
    habits,
    addHabit,
    updateHabit,
    archiveHabit,
    restoreHabit,
    removeHabit,
  } = useHabits();

  const [dialog, setDialog] = useState<DialogState>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // El aviso se va solo a los 3 segundos.
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  function notify(text: string) {
    setToast({ id: Date.now(), text });
  }

  const activeHabits = habits.filter((habit) => !habit.archived);
  const archivedHabits = habits.filter((habit) => habit.archived);

  const editingHabit =
    dialog?.mode === "edit"
      ? (habits.find((habit) => habit.id === dialog.habitId) ?? null)
      : null;
  const habitToDelete = deleteId
    ? (habits.find((habit) => habit.id === deleteId) ?? null)
    : null;

  function handleSubmit(input: HabitInput) {
    if (dialog?.mode === "edit") {
      updateHabit(dialog.habitId, input);
      notify("Cambios guardados.");
    } else {
      addHabit(input);
      notify("Hábito creado.");
    }
    setDialog(null);
  }

  const newHabitButton = (
    <button
      type="button"
      onClick={() => setDialog({ mode: "create" })}
      className={primaryButton}
    >
      <Plus size={16} aria-hidden="true" />
      Nuevo hábito
    </button>
  );

  return (
    <div>
      <header className="flex items-end justify-between gap-4">
        <h1 className="font-handwriting text-5xl text-foreground">Hábitos</h1>
        {habits.length > 0 && newHabitButton}
      </header>

      <p className="mt-4 inline-flex rounded-card bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
        Datos temporales: se pierden al recargar la página
      </p>

      <div className="mt-6">
        {habits.length === 0 ? (
          <EmptyHabits>
            <div className="mt-6">{newHabitButton}</div>
          </EmptyHabits>
        ) : (
          <>
            {activeHabits.length === 0 ? (
              <p className="text-sm text-muted">No tenés hábitos activos.</p>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {activeHabits.map((habit) => (
                  <HabitManageRow key={habit.id} habit={habit}>
                    <button
                      type="button"
                      className={iconButton}
                      aria-label={`Editar ${habit.name}`}
                      title="Editar"
                      onClick={() =>
                        setDialog({ mode: "edit", habitId: habit.id })
                      }
                    >
                      <Pencil size={18} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className={iconButton}
                      aria-label={`Archivar ${habit.name}`}
                      title="Archivar"
                      onClick={() => {
                        archiveHabit(habit.id);
                        notify("Hábito archivado.");
                      }}
                    >
                      <Archive size={18} aria-hidden="true" />
                    </button>
                  </HabitManageRow>
                ))}
              </ul>
            )}

            {archivedHabits.length > 0 && (
              <section className="mt-10">
                <h2 className="text-sm font-medium text-muted">Archivados</h2>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {archivedHabits.map((habit) => (
                    <HabitManageRow key={habit.id} habit={habit}>
                      <button
                        type="button"
                        className={iconButton}
                        aria-label={`Restaurar ${habit.name}`}
                        title="Restaurar"
                        onClick={() => {
                          restoreHabit(habit.id);
                          notify("Hábito restaurado.");
                        }}
                      >
                        <ArchiveRestore size={18} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className={iconButton}
                        aria-label={`Eliminar ${habit.name}`}
                        title="Eliminar"
                        onClick={() => setDeleteId(habit.id)}
                      >
                        <Trash2 size={18} aria-hidden="true" />
                      </button>
                    </HabitManageRow>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>

      {dialog && (dialog.mode === "create" || editingHabit) && (
        <HabitFormDialog
          key={dialog.mode === "edit" ? dialog.habitId : "new"}
          habit={editingHabit}
          onSubmit={handleSubmit}
          onClose={() => setDialog(null)}
        />
      )}

      {habitToDelete && (
        <ConfirmDialog
          title="¿Eliminar hábito?"
          message={`Se va a eliminar "${habitToDelete.name}" para siempre. Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          onConfirm={() => {
            removeHabit(habitToDelete.id);
            setDeleteId(null);
            notify("Hábito eliminado.");
          }}
          onClose={() => setDeleteId(null)}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}