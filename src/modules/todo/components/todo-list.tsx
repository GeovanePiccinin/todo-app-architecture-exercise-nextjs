"use client";

import { useTodos } from "../hooks/use-todos";
import { useToggleTodo } from "../hooks/use-toggle-todo";
import { useDeleteTodo } from "../hooks/use-delete-todo";

import { TodoItem } from "./todo-item";

import { TodoDTO, TodoFilter } from "../types/todo.types";

type Props = {
  filter: TodoFilter;
};

export function TodoList({ filter }: Props) {
  const query = useTodos(filter);

  const toggleMutation = useToggleTodo(filter);
  const deleteMutation = useDeleteTodo(filter);

  const todos: TodoDTO[] =
    query.data?.pages.flatMap((page) => page.todos) ?? [];

  return (
    <div className="w-full mt-4">
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onToggle={() =>
              toggleMutation.mutate({
                id: todo.id,
                completed: !todo.completed,
              })
            }
            onDelete={() => deleteMutation.mutate(todo.id)}
          />
        ))}
      </ul>

      {query.hasNextPage && (
        <button onClick={() => query.fetchNextPage()}>Load more</button>
      )}
    </div>
  );
}
