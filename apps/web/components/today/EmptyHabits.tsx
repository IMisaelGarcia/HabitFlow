import { Sprout } from "lucide-react";

type EmptyHabitsProps = {
  children?: React.ReactNode;
};

export function EmptyHabits({ children }: EmptyHabitsProps) {
  return (
    <div className="rounded-card border border-dashed border-border bg-surface px-6 py-12 text-center">
      <Sprout size={28} className="mx-auto text-accent" aria-hidden="true" />
      <h2 className="mt-4 text-base font-medium text-foreground">
        No hay hábitos activos
      </h2>
      <p className="mt-1 text-sm text-muted">
        Cuando tengas hábitos activos, van a aparecer acá para que los marques
        cada día.
      </p>
      {children}
    </div>
  );
}