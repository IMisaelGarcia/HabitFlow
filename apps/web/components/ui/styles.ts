// Clases reutilizables para botones y campos, así todo se ve igual.

const base =
  "inline-flex items-center justify-center gap-2 rounded-card px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50";

export const primaryButton = `${base} bg-accent text-accent-foreground hover:opacity-90`;

export const secondaryButton = `${base} border border-border bg-surface text-foreground hover:bg-accent-soft/60`;

export const dangerButton = `${base} border border-danger text-danger hover:bg-danger/10`;

export const iconButton =
  "inline-flex size-9 items-center justify-center rounded-card text-muted transition-colors hover:bg-accent-soft/60 hover:text-foreground";

export const fieldClass =
  "mt-1.5 w-full rounded-card border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/70";