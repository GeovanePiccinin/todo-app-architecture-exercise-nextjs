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
    <li className="flex items-center gap-3">
      <input type="checkbox" checked={completed} onChange={handleToggle} />

      <span className={completed ? "line-through text-gray-400" : ""}>
        {title}
      </span>

      <button onClick={handleDelete}>delete</button>
    </li>
  );
}
