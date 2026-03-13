import bcrypt from "bcrypt";
import { AppError } from "@/shared/errors/app-error";
import { createUserWithProfile } from "../repositories/user.repository";

export async function registerUserService(
  name: string,
  email: string,
  password: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUserWithProfile(name, email, hashedPassword);

  if (!user) {
    throw new AppError({
      message: "Registration failed",
      code: "REGISTRATION_FAILED",
      statusCode: 400,
    });
  }

  return user;
}

