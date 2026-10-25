"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

type ModalProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

// Ventana modal con el elemento nativo <dialog>:
// cierra con Esc, atrapa el foco y es accesible sin librerías extra.
export function Modal({ title, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => previouslyFocused?.focus();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        // Clic en el fondo oscuro (fuera de la tarjeta) cierra la ventana.
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-card border border-border bg-surface p-0 text-foreground backdrop:bg-black/40"
    >
      <div className="p-6">
        <h2 id={titleId} className="font-handwriting text-3xl text-foreground">
          {title}
        </h2>
        {children}
      </div>
    </dialog>
  );
}