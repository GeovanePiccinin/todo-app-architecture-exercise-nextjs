"use server";
import { redirect } from "next/navigation";
import { withRequestContext } from "@/infrastructure/observability/with-request-context";
import { registerUserService } from "../services/auth.service";

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  await withRequestContext(() =>
    registerUserService(name, email, password),
  );

  redirect("/login");
}
