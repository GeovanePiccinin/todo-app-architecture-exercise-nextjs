import { prisma } from "@/infrastructure/prisma/prisma";
import { DbClient, DbTransaction } from "@/infrastructure/prisma/db.types";
import { TodoFilter } from "../types/todo.types";
import { Prisma } from "@/generated/prisma/client";

const PAGE_SIZE = 10;

type DbExecutor = DbClient | DbTransaction;

function getDb(db?: DbExecutor): DbExecutor {
  return db ?? prisma;
}

export async function findTodosByUserId(
  userId: string,
  filter: TodoFilter,
  cursor?: string,
  db?: DbExecutor,
) {
  const client = getDb(db);

  const where: Prisma.TodoWhereInput = {
    userId,
    deletedAt: null,
  };

  if (filter === "active") where.completed = false;
  if (filter === "completed") where.completed = true;

  const todos = await client.todo.findMany({
    where,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: PAGE_SIZE + 1,
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),
  });

  let nextCursor: string | null = null;

  if (todos.length > PAGE_SIZE) {
    todos.pop();
    nextCursor = todos[todos.length - 1].id;
  }

  return {
    todos,
    nextCursor,
  };
}

export async function createTodo(
  userId: string,
  title: string,
  db?: DbExecutor,
) {
  const client = getDb(db);

  return client.todo.create({
    data: {
      userId,
      title,
    },
  });
}

export async function toggleTodo(
  id: string,
  completed: boolean,
  db?: DbExecutor,
) {
  const client = getDb(db);

  return client.todo.update({
    where: { id },
    data: { completed },
  });
}

export async function deleteTodo(id: string, db?: DbExecutor) {
  const client = getDb(db);

  return client.todo.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
}
