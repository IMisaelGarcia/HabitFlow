// Esqueleto de carga: se ve un instante mientras se calcula la fecha.
export function TodaySkeleton() {
  return (
    <div role="status" aria-label="Cargando" className="animate-pulse">
      <div className="h-5 w-40 rounded bg-accent-soft" />
      <div className="mt-3 h-12 w-56 rounded bg-accent-soft" />
      <div className="mt-10 h-24 rounded-card bg-accent-soft" />
      <div className="mt-6 space-y-2.5">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-16 rounded-card bg-accent-soft" />
        ))}
      </div>
    </div>
  );
}