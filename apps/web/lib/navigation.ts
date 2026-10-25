import { CalendarCheck, ListChecks, type LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

// Solo secciones que existen. Se agregan acá a medida que se construyen.
export const navItems: NavItem[] = [
  { href: "/", label: "Hoy", icon: CalendarCheck },
  { href: "/habitos", label: "Hábitos", icon: ListChecks },
];

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}