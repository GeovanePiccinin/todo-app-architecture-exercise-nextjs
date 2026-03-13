import { requireAuth } from "@/modules/auth/guards/auth.guard";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { makeQueryClient } from "@/lib/react-query/query-client";

import { TodoList } from "@/modules/todo/components/todo-list";
import { TodoFilters } from "@/modules/todo/components/todo-filters";
import { TodoForm } from "@/modules/todo/components/todo-form";

import { todoKeys } from "@/modules/todo/queries/todo.keys";
import { fetchTodos } from "@/modules/todo/queries/fetch-todos";
import { TodoFilter } from "@/modules/todo/types/todo.types";

type Props = {
  searchParams: Promise<{
    filter?: TodoFilter;
  }>;
};

export default async function TodosPage({ searchParams }: Props) {
  const params = await searchParams;

  const filter: TodoFilter = params.filter ?? "all";

  await requireAuth();

  const queryClient = makeQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: todoKeys.list(filter),

    queryFn: ({ pageParam }) =>
      fetchTodos(filter, pageParam as string | null),

    initialPageParam: null,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1 className="text-xl mb-4">Todos</h1>

        <TodoFilters />

        <TodoForm filter={filter} />

        <TodoList filter={filter} />
      </div>
    </HydrationBoundary>
  );
}
