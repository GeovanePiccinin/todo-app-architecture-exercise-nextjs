import { prisma } from "@/infrastructure/prisma/prisma";

export async function createUserWithProfile(
  name: string,
  email: string,
  hashedPassword: string,
) {
  return prisma.user.create({
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
}

