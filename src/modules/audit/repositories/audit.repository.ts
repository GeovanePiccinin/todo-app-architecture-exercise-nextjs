import { prisma } from "@/infrastructure/prisma/prisma";
import { DbClient, DbTransaction } from "@/infrastructure/prisma/db.types";
import { AuditLogInput } from "../types/audit.types";

type DbExecutor = DbClient | DbTransaction;

function getDb(db?: DbExecutor): DbExecutor {
  return db ?? prisma;
}

export async function createAuditLog(data: AuditLogInput, db?: DbExecutor) {
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
