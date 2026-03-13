"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/infrastructure/prisma/prisma";
import bcrypt from "bcrypt";
import { AppError } from "@/shared/errors/app-error";

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profile: {
        create: {
          name,
        },
      },
    },
  });

  if (user) {
    // Redirect to the login page on success
    redirect("/login");
  } else {
    // Handle error or return an error state
    if (!user) {
      throw new AppError({
        message: "Registration failed",
        code: "400",
        statusCode: 400,
      });
    }
  }
}
