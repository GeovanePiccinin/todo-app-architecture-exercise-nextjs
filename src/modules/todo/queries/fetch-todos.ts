import { TodoFilter, PaginatedTodos } from "../types/todo.types";

export async function fetchTodos(
  filter: TodoFilter,
  cursor: string | null,
): Promise<PaginatedTodos> {
  const params = new URLSearchParams();

  params.set("filter", filter);

  if (cursor) {
    params.set("cursor", cursor);
  }

  const response = await fetch(`/api/todos?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json() as Promise<PaginatedTodos>;
}
