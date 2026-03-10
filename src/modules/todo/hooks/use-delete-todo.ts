"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoAction } from "../actions/delete-todo.action";
import { todoKeys } from "../queries/todo.keys";
import { TodoFilter } from "../types/todo.types";

export function useDeleteTodo(filter: TodoFilter) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodoAction(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.list(filter),
      });
    },
  });
}
