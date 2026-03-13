import { prisma } from "@/infrastructure/prisma/prisma";
import { TooManyRequestsError } from "@/shared/errors/too-many-requests-error";
import { RateLimitConfig } from "../types/rate-limit.types";

export async function enforceRateLimit(
  userId: string,
  config: RateLimitConfig,
) {
  const now = new Date();

  const windowStart = new Date(now.getTime() - config.windowSeconds * 1000);

  const existing = await prisma.rateLimit.findFirst({
    where: {
      userId,
      action: config.action,
      windowStart: {
        gte: windowStart,
      },
    },
  });

  if (!existing) {
    await prisma.rateLimit.create({
      data: {
        userId,
        action: config.action,
        count: 1,
        windowStart: now,
      },
    });

    return;
  }

  if (existing.count >= config.limit) {
    throw new TooManyRequestsError(
      `Rate limit exceeded for action ${config.action}`,
    );
  }

  await prisma.rateLimit.update({
    where: {
      id: existing.id,
    },
    data: {
      count: {
        increment: 1,
      },
    },
  });
}
