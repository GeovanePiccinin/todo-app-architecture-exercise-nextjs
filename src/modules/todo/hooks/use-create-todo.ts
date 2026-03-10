"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodoAction } from "../actions/create-todo.action";
import { todoKeys } from "../queries/todo.keys";
import { PaginatedTodos, TodoDTO, TodoFilter } from "../types/todo.types";

type InfiniteTodos = {
  pages: PaginatedTodos[];
  pageParams: Array<string | null>;
};

export function useCreateTodo(filter: TodoFilter) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => createTodoAction(title),

    onMutate: async (title: string) => {
      await queryClient.cancelQueries({
        queryKey: todoKeys.list(filter),
      });

      const previous = queryClient.getQueryData<InfiniteTodos>(
        todoKeys.list(filter),
      );

      const optimisticTodo: TodoDTO = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        createdAt: new Date(),
      };

      queryClient.setQueryData<InfiniteTodos>(todoKeys.list(filter), (old) => {
        if (!old) return old;

        const firstPage = old.pages[0];

        const updatedFirstPage: PaginatedTodos = {
          ...firstPage,
          todos: [optimisticTodo, ...firstPage.todos],
        };

        return {
          ...old,
          pages: [updatedFirstPage, ...old.pages.slice(1)],
        };
      });

      return { previous };
    },

    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(todoKeys.list(filter), context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.list(filter),
      });
    },
  });
}
