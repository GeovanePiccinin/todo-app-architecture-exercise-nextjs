"use server";

import { requireAuth } from "@/modules/auth/guards/auth.guard";
import { getTodos } from "../services/todo.service";
import { TodoFilter } from "../types/todo.types";

export async function loadMoreTodosAction(
  filter: TodoFilter,
  cursor?: string | null,
) {
  const session = await requireAuth();

  return getTodos(session.user.id, filter, cursor ?? undefined);
}
