import { Sparkles } from "lucide-react";

// Felicitación que aparece al completar todos los hábitos del día.
export function DayComplete() {
  return (
    <section className="animate-fade-up rounded-card border border-accent/30 bg-accent-soft p-6 text-center">
      <Sparkles size={24} className="mx-auto text-accent" aria-hidden="true" />
      <h2 className="mt-3 font-handwriting text-4xl text-foreground">
        ¡Día completo!
      </h2>
      <p className="mt-2 text-sm text-muted">
        Cumpliste todos tus hábitos de hoy. Disfrutá el resto del día con la
        cabeza tranquila.
      </p>
    </section>
  );
}