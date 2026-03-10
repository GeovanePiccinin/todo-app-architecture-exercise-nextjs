import { requireAuth } from "@/modules/auth/guards/auth.guard";
import { LogoutButton } from "@/modules/auth/components/logout-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();

  return (
    <div>
      <nav className="flex gap-4 p-4 border-b">
        <span>{session.user.email}</span>

        <a href="/todos">Todos</a>

        <a href="/profile">Profile</a>

        <LogoutButton />
      </nav>

      <main className="p-6">{children}</main>
    </div>
  );
}
