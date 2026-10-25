type DayProgressProps = {
  done: number;
  total: number;
};

function getMessage(done: number, total: number): string {
  if (total === 0) return "Sin hábitos por ahora.";
  if (done === 0) return "Un día tranquilo por delante.";
  if (done === total) return "Día completo. Bien hecho.";
  return "Vas avanzando, a tu ritmo.";
}

export function DayProgress({ done, total }: DayProgressProps) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section className="rounded-card border border-border bg-surface p-5">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm text-muted">{getMessage(done, total)}</p>
        <p className="text-sm font-medium text-foreground">
          {done} de {total}
        </p>
      </div>
      <div
        role="progressbar"
        aria-label="Progreso del día"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="mt-3 h-2 overflow-hidden rounded-full bg-accent-soft"
      >
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </section>
  );
}