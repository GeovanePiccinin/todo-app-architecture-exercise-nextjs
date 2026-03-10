"use server";

import { prisma } from "@/infrastructure/prisma/prisma";
import bcrypt from "bcrypt";

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

  return user;
}
