"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { PaginatedTodos, TodoFilter } from "../types/todo.types";
import { todoKeys } from "../queries/todo.keys";
import { fetchTodos } from "../queries/fetch-todos";

export function useTodos(filter: TodoFilter) {
  return useInfiniteQuery<PaginatedTodos>({
    queryKey: todoKeys.list(filter),

    queryFn: ({ pageParam }) => fetchTodos(filter, pageParam as string | null),

    initialPageParam: null,

    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
