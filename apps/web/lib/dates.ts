// Fecha larga en español, por ejemplo "Domingo 25 de octubre".
export function formatLongDate(date: Date): string {
  const text = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getGreeting(date: Date): string {
  const hour = date.getHours();
  if (hour >= 6 && hour < 13) return "Buenos días";
  if (hour >= 13 && hour < 20) return "Buenas tardes";
  return "Buenas noches";
}

// Clave de día con la hora local del dispositivo, formato "AAAA-MM-DD".
// Se puede comparar como texto: "2026-10-24" < "2026-10-25".
export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Título grande de la pantalla: saludo si es hoy, "Ayer" o el nombre del día.
export function getDayTitle(date: Date, offset: number): string {
  if (offset === 0) return getGreeting(date);
  if (offset === -1) return "Ayer";
  const weekday = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
  }).format(date);
  return weekday.charAt(0).toUpperCase() + weekday.slice(1);
}