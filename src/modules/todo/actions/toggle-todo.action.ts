"use server";

import { toggleTodoService } from "../services/todo.service";
import { toggleTodoSchema } from "../validation/todo.schema";
import { revalidatePath } from "next/cache";
import { validate } from "@/shared/utils/validate";
import { getCurrentUser } from "@/lib/auth/session";
import { UnauthorizedError } from "@/shared/errors/unauthorized-error";
import { withRequestContext } from "@/infrastructure/observability/with-request-context";

export async function toggleTodoAction(id: string, completed: boolean) {
  return withRequestContext(async () => {
    const user = await getCurrentUser();

    if (!user) {
      throw new UnauthorizedError();
    }
    const parsed = validate(toggleTodoSchema, {
      id,
      completed,
    });

    await toggleTodoService(user, parsed.id, parsed.completed);

    revalidatePath("/todos");
  });
}
