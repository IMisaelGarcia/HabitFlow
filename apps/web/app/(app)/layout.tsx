import { AppShell } from "../../components/layout/AppShell";
import { HabitsProvider } from "../../lib/habits-store";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HabitsProvider>
      <AppShell>{children}</AppShell>
    </HabitsProvider>
  );
}