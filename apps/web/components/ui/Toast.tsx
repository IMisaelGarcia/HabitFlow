import { Check } from "lucide-react";

export type ToastMessage = {
  id: number;
  text: string;
};

type ToastProps = {
  toast: ToastMessage | null;
};

// Aviso breve que aparece abajo y se va solo.
// Va por encima de la barra inferior en el celular.
export function Toast({ toast }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-30 flex justify-center px-4 md:bottom-8 md:left-64"
    >
      {toast && (
        <p
          key={toast.id}
          className="animate-fade-up inline-flex items-center gap-2 rounded-card border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
        >
          <Check size={16} className="text-accent" aria-hidden="true" />
          {toast.text}
        </p>
      )}
    </div>
  );
}