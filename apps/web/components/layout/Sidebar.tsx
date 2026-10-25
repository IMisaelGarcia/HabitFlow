"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, navItems } from "../../lib/navigation";

export function Sidebar() {
const pathname = usePathname();

return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-surface px-4 py-8 md:flex">
    <Link
        href="/"
        className="px-3 font-handwriting text-4xl leading-none text-foreground"
    >
        HabitFlow
    </Link>

    <nav aria-label="Navegación principal" className="mt-10 flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
        const active = isActivePath(pathname, href);
        return (
            <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                ? "bg-accent-soft text-accent"
                : "text-muted hover:bg-accent-soft/60 hover:text-foreground"
            }`}
            >
            <Icon size={18} aria-hidden="true" />
            {label}
            </Link>
        );
        })}
    </nav>
    </aside>
);
}