import { requireAuth } from "./auth.guard";

export async function requireRole(role: string) {
  const session = await requireAuth();

  if (session.user.role !== role) {
    throw new Error("Unauthorized");
  }

  return session;
}
