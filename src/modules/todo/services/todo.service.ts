import { prisma } from "@/infrastructure/prisma/prisma";

import {
  findTodosByUserId,
  createTodo,
  toggleTodo,
  deleteTodo,
} from "../repositories/todo.repository";

import { createAuditLog } from "@/modules/audit/repositories/audit.repository";

import { TodoFilter } from "../types/todo.types";
import { ValidationError } from "@/shared/errors/validation-error";

export async function getTodos(
  userId: string,
  filter: TodoFilter,
  cursor?: string,
) {
  return findTodosByUserId(userId, filter, cursor);
}

export async function createTodoService(userId: string, title: string) {
  if (!title.trim()) {
    throw new ValidationError("Title is required");
  }

  const todo = await createTodo(userId, title);

  await createAuditLog({
    userId,
    action: "TODO_CREATED",
    entity: "todo",
    entityId: todo.id,
  });

  return todo;
}

export async function toggleTodoService(id: string, completed: boolean) {
  const todo = await toggleTodo(id, completed);

  await createAuditLog({
    userId: todo.userId,
    action: "TODO_UPDATED",
    entity: "todo",
    entityId: todo.id,
    metadata: JSON.stringify({
      completed: todo.completed,
    }),
  });

  return todo;
}

export async function deleteTodoService(id: string) {
  const todo = await deleteTodo(id);

  await createAuditLog({
    userId: todo.userId,
    action: "TODO_DELETED",
    entity: "todo",
    entityId: todo.id,
  });

  return todo;
}
