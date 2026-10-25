"use client";

import { useSyncExternalStore } from "react";

// Devuelve la fecha y hora actual, actualizada cada minuto.
// En el servidor devuelve null: así evitamos el error de hidratación
// (el servidor y tu navegador pueden tener horas distintas).

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

function getSnapshot(): number | null {
  return Math.floor(Date.now() / 60_000) * 60_000;
}

function getServerSnapshot(): number | null {
  return null;
}

export function useNow(): Date | null {
  const timestamp = useSyncExternalStore<number | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return timestamp === null ? null : new Date(timestamp);
}