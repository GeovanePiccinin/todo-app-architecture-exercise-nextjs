import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth/guards/auth.guard";
import { getTodos } from "@/modules/todo/services/todo.service";
import { TodoFilter } from "@/modules/todo/types/todo.types";
import { handleError } from "@/shared/errors/error-handler";

export async function GET(request: NextRequest) {
  try {
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
  } catch (error) {
    const serialized = handleError(error);

    return NextResponse.json(
      {
        error: {
          message: serialized.message,
          code: serialized.code,
        },
      },
      { status: serialized.statusCode },
    );
  }
}
