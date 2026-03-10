import { prisma } from "@/infrastructure/prisma/prisma";

export async function getOrCreateProfile(userId: string) {
  let profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        userId,
      },
    });
  }

  return profile;
}

export async function updateProfile(
  userId: string,
  data: {
    name?: string;
    avatarUrl?: string;
  },
) {
  return prisma.profile.upsert({
    where: { userId },
    update: data,
    create: {
      userId,
      ...data,
    },
  });
}
