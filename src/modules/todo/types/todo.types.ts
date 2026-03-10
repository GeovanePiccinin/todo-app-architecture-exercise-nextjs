export type TodoDTO = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export type TodoFilter = "all" | "active" | "completed";

export type PaginatedTodos = {
  todos: TodoDTO[];
  nextCursor: string | null;
};
