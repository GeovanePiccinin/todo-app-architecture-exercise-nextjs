import "next-auth";
import { DefaultSession } from "next-auth";
import { Role } from "@/modules/auth/types/role.types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }
  interface User {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
