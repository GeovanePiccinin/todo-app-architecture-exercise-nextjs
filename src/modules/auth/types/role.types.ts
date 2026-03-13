export type Role = "USER" | "ADMIN";

export interface AuthUser {
  id: string;
  role: Role;
}
