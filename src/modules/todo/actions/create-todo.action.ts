"use server";

import { createTodoService } from "../services/todo.service";
import { createTodoSchema } from "../validation/todo.schema";
import { validate } from "@/shared/utils/validate";
import { getCurrentUser } from "@/lib/auth/session";
import { UnauthorizedError } from "@/shared/errors/unauthorized-error";
import { withRequestContext } from "@/infrastructure/observability/with-request-context";

export async function createTodoAction(titleValue: string) {
  return withRequestContext(async () => {
    const user = await getCurrentUser();

    if (!user) {
      throw new UnauthorizedError();
    }

    const { title } = validate(createTodoSchema, {
      title: titleValue,
    });

    return createTodoService(user, title);
  });
}
