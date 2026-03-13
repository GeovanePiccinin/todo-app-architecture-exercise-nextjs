import { describe, it, expect } from "vitest";
import { requireRole } from "@/modules/auth/services/rbac.service";
import { ForbiddenError } from "@/shared/errors/forbidden-error";

type AuthUser = {
  id: string;
  role: "USER" | "ADMIN";
};

describe("rbac.service", () => {
  it("should allow user with correct role", () => {
    const user: AuthUser = {
      id: "1",
      role: "ADMIN",
    };

    expect(() => requireRole(user, "ADMIN")).not.toThrow();
  });

  it("should throw error if role is insufficient", () => {
    const user: AuthUser = {
      id: "1",
      role: "USER",
    };

    expect(() => requireRole(user, "ADMIN")).toThrow(ForbiddenError);
  });
});
