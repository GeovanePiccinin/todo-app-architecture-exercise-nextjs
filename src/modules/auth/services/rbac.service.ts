import { ForbiddenError } from "@/shared/errors/forbidden-error";
import { AuthUser, Role } from "../types/role.types";

function roleHierarchy(role: Role): number {
  switch (role) {
    case "ADMIN":
      return 2;
    case "USER":
      return 1;
    default:
      return 0;
  }
}

export function requireRole(user: AuthUser, requiredRole: Role): void {
  const userLevel = roleHierarchy(user.role);
  const requiredLevel = roleHierarchy(requiredRole);

  if (userLevel < requiredLevel) {
    throw new ForbiddenError(
      "You do not have permission to perform this action",
    );
  }
}
