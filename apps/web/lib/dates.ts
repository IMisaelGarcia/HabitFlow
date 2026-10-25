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