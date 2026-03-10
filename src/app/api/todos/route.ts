import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth/guards/auth.guard";
import { getTodos } from "@/modules/todo/services/todo.service";
import { TodoFilter } from "@/modules/todo/types/todo.types";

export async function GET(request: NextRequest) {
  const session = await requireAuth();

  const filterParam = request.nextUrl.searchParams.get("filter");

  const cursorParam = request.nextUrl.searchParams.get("cursor");

  const filter: TodoFilter =
    filterParam === "active" || filterParam === "completed"
      ? filterParam
      : "all";

  const result = await getTodos(
    session.user.id,
    filter,
    cursorParam ?? undefined,
  );

  return NextResponse.json(result);
}
