"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTodoAction } from "../actions/toggle-todo.action";
import { todoKeys } from "../queries/todo.keys";
import { PaginatedTodos, TodoDTO, TodoFilter } from "../types/todo.types";

type ToggleInput = {
  id: string;
  completed: boolean;
};

type InfiniteTodos = {
  pages: PaginatedTodos[];
  pageParams: Array<string | null>;
};

export function useToggleTodo(filter: TodoFilter) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ToggleInput) =>
      toggleTodoAction(input.id, input.completed),

    onMutate: async (input: ToggleInput) => {
      await queryClient.cancelQueries({
        queryKey: todoKeys.list(filter),
      });

      const previous = queryClient.getQueryData<InfiniteTodos>(
        todoKeys.list(filter),
      );

      queryClient.setQueryData<InfiniteTodos>(todoKeys.list(filter), (old) => {
        if (!old) return old;

        const updatedPages = old.pages.map((page) => {
          const updatedTodos: TodoDTO[] = page.todos.map((todo) =>
            todo.id === input.id
              ? { ...todo, completed: input.completed }
              : todo,
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
