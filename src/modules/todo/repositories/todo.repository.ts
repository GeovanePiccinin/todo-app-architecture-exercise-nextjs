import { prisma } from "@/infrastructure/prisma/prisma";
import { TodoFilter } from "../types/todo.types";
import { Prisma } from "@/generated/prisma/client";

const PAGE_SIZE = 10;

type PrismaExecutor = Prisma.TransactionClient;

function getDb(db?: PrismaExecutor) {
  return db ?? prisma;
}

export async function findTodosByUserId(
  userId: string,
  filter: TodoFilter,
  cursor?: string,
  db?: PrismaExecutor,
) {
  const client = getDb(db);

  const where: Prisma.TodoWhereInput = {
    userId,
    deletedAt: null,
  };

  if (filter === "active") {
    where.completed = false;
  }

  if (filter === "completed") {
    where.completed = true;
  }

  const queryArgs: Prisma.TodoFindManyArgs = {
    where,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: PAGE_SIZE + 1,
  };

  if (cursor) {
    queryArgs.cursor = { id: cursor };
    queryArgs.skip = 1;
  }

  const todos = await (client.todo as Prisma.TodoDelegate).findMany(queryArgs);

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
  db?: PrismaExecutor,
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
  db?: PrismaExecutor,
) {
  const client = getDb(db);

  return client.todo.update({
    where: { id },
    data: { completed },
  });
}

export async function deleteTodo(id: string, db?: PrismaExecutor) {
  const client = getDb(db);

  return client.todo.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
}
