"use client";

import { TodoDTO } from "../types/todo.types";

type Props = Pick<TodoDTO, "id" | "title" | "completed"> & {
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({ id, title, completed, onToggle, onDelete }: Props) {
  function handleToggle() {
    onToggle(id);
  }

  function handleDelete() {
    onDelete(id);
  }

  return (
    <li className="flex items-center mb-2">
      <div className="w-full">
        <input
          type="checkbox"
          className="mr-1.5"
          checked={completed}
          onChange={handleToggle}
        />

        <span className={completed ? "line-through text-gray-400" : ""}>
          {title}
        </span>
      </div>
      <button
        className="text-white w-5 h-5 rounded-md bg-yellow-500"
        onClick={handleDelete}
      >
        X
      </button>
    </li>
  );
}
