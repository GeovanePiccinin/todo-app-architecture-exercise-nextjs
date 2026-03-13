"use client";

import { FormEvent } from "react";
import { useCreateTodo } from "../hooks/use-create-todo";
import { TodoFilter } from "../types/todo.types";

type Props = {
  filter: TodoFilter;
};

export function TodoForm({ filter }: Props) {
  const mutation = useCreateTodo(filter);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get("title");

    if (typeof title !== "string") return;

    mutation.mutate(title);

    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="border rounded-md p-2"
        name="title"
        placeholder="add a new todo"
      />

      <button className="text-white p-2 rounded-md bg-green-600" type="submit">
        Add
      </button>
    </form>
  );
}
