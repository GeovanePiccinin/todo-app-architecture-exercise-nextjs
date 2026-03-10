import { prisma } from "@/infrastructure/prisma/prisma";
import { Prisma } from "@/generated/prisma/client";
import { AuditLogInput } from "../types/audit.types";

type PrismaExecutor = Prisma.TransactionClient;

function getDb(db?: PrismaExecutor) {
  return db ?? prisma;
}

export async function createAuditLog(data: AuditLogInput, db?: PrismaExecutor) {
  const client = getDb(db);

  await client.auditLog.create({
    data: {
      userId: data.userId,
      action: data.action,
      entity: data.entity,
      entityId: data.entityId,
      metadata: data.metadata ?? {},
    },
  });
}
