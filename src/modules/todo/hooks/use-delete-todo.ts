"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoAction } from "../actions/delete-todo.action";
import { todoKeys } from "../queries/todo.keys";
import { PaginatedTodos, TodoDTO, TodoFilter } from "../types/todo.types";

type InfiniteTodos = {
  pages: PaginatedTodos[];
  pageParams: Array<string | null>;
};

export function useDeleteTodo(filter: TodoFilter) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodoAction(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: todoKeys.list(filter),
      });

      const previous = queryClient.getQueryData<InfiniteTodos>(
        todoKeys.list(filter),
      );

      queryClient.setQueryData<InfiniteTodos>(todoKeys.list(filter), (old) => {
        if (!old) return old;

        const updatedPages = old.pages.map((page) => {
          const updatedTodos: TodoDTO[] = page.todos.filter(
            (todo) => todo.id !== id,
          );

          return {
            ...page,
            todos: updatedTodos,
          };
        });

        return {
          ...old,
          pages: updatedPages,
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
