"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, navItems } from "../../lib/navigation";

export function BottomNav() {
const pathname = usePathname();

return (
    <nav
    aria-label="Navegación principal"
    className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
    <ul className="flex">
        {navItems.map(({ href, label, icon: Icon }) => {
        const active = isActivePath(pathname, href);
        return (
            <li key={href} className="flex-1">
                <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors ${
                    active ? "text-accent" : "text-muted hover:text-foreground"
                }`}
                >
                <Icon size={22} aria-hidden="true" />
                {label}
                </Link>
            </li>
        );
        })}
    </ul>
    </nav>
);
}