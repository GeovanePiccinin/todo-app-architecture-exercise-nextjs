-- DropIndex
DROP INDEX "todos_createdAt_idx";

-- DropIndex
DROP INDEX "todos_userId_idx";

-- CreateIndex
CREATE INDEX "todos_userId_createdAt_id_idx" ON "todos"("userId", "createdAt" DESC, "id" DESC);
