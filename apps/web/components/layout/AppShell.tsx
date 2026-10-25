import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
return (
    <>
    <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-card focus:border focus:border-border focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
    >
        Saltar al contenido
    </a>

    <Sidebar />
    <BottomNav />

    <div className="flex flex-1 flex-col md:pl-64">
        <main
        id="contenido"
        className="flex-1 px-5 pb-28 pt-8 md:px-10 md:pb-12 md:pt-12"
        >
        <div className="mx-auto w-full max-w-2xl">{children}</div>
        </main>
    </div>
    </>
    );
}