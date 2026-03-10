"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTodoAction } from "../actions/toggle-todo.action";
import { todoKeys } from "../queries/todo.keys";
import { TodoFilter } from "../types/todo.types";

type ToggleInput = {
  id: string;
  completed: boolean;
};

export function useToggleTodo(filter: TodoFilter) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ToggleInput) =>
      toggleTodoAction(input.id, input.completed),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.list(filter),
      });
    },
  });
}
