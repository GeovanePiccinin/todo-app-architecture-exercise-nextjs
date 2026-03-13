import {
  findTodosByUserId,
  createTodo,
  toggleTodo,
  deleteTodo,
} from "../repositories/todo.repository";
import { logger } from "@/infrastructure/logger/logger";
import { createAuditLog } from "@/modules/audit/repositories/audit.repository";
import { requireRole } from "@/modules/auth/services/rbac.service";
import { AuthUser } from "@/modules/auth/types/role.types";
import { TodoFilter } from "../types/todo.types";
import { ValidationError } from "@/shared/errors/validation-error";
import { enforceRateLimit } from "@/modules/rate-limit/services/rate-limit.service";
import { prisma } from "@/infrastructure/prisma/prisma";

export async function getTodos(
  userId: string,
  filter: TodoFilter,
  cursor?: string,
) {
  return findTodosByUserId(userId, filter, cursor);
}

export async function createTodoService(user: AuthUser, title: string) {
  requireRole(user, "USER");

  if (!title.trim()) {
    throw new ValidationError("Title is required");
  }

  logger.info({
    event: "todo.create",
    userId: user.id,
    title,
  });

  await enforceRateLimit(user.id, {
    action: "CREATE_TODO",
    limit: 20,
    windowSeconds: 60,
  });

  return prisma.$transaction(async (tx) => {
    const todo = await createTodo(user.id, title, tx);

    await createAuditLog(
      {
        userId: user.id,
        action: "TODO_CREATED",
        entity: "todo",
        entityId: todo.id,
      },
      tx,
    );

    return todo;
  });
}

export async function toggleTodoService(
  user: AuthUser,
  id: string,
  completed: boolean,
) {
  logger.info({
    event: "todo.toggle",
    userId: user.id,
    todoId: id,
  });
  return prisma.$transaction(async (tx) => {
    const todo = await toggleTodo(id, completed, tx);

    await createAuditLog(
      {
        userId: user.id,
        action: "TODO_UPDATED",
        entity: "todo",
        entityId: todo.id,
        metadata: JSON.stringify({
          completed: todo.completed,
        }),
      },
      tx,
    );

    return todo;
  });
}

export async function deleteTodoService(user: AuthUser, id: string) {
  logger.info({
    event: "todo.delete",
    userId: user.id,
    todoId: id,
  });
  return prisma.$transaction(async (tx) => {
    const todo = await deleteTodo(id, tx);

    await createAuditLog(
      {
        userId: user.id,
        action: "TODO_DELETED",
        entity: "todo",
        entityId: todo.id,
      },
      tx,
    );

    return todo;
  });
}
