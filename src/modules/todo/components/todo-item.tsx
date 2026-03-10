"use client";

import { toggleTodoAction } from "../actions/toggle-todo.action";
import { deleteTodoAction } from "../actions/delete-todo.action";

import { TodoDTO } from "../types/todo.types";

type Props = Pick<TodoDTO, "id" | "title" | "completed"> & {
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({ id, title, completed, onToggle, onDelete }: Props) {
  async function handleToggle() {
    onToggle(id);
    await toggleTodoAction(id, !completed);
  }

  async function handleDelete() {
    onDelete(id);
    await deleteTodoAction(id);
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
