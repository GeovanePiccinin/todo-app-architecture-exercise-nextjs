"use server";

import { deleteTodoService } from "../services/todo.service";
import { deleteTodoSchema } from "../validation/todo.schema";
import { revalidatePath } from "next/cache";
import { validate } from "@/shared/utils/validate";
import { getCurrentUser } from "@/lib/auth/session";
import { UnauthorizedError } from "@/shared/errors/unauthorized-error";
import { withRequestContext } from "@/infrastructure/observability/with-request-context";

export async function deleteTodoAction(id: string) {
  return withRequestContext(async () => {
    const user = await getCurrentUser();

    if (!user) {
      throw new UnauthorizedError();
    }
    const parsed = validate(deleteTodoSchema, { id });

    await deleteTodoService(user, parsed.id);

    revalidatePath("/todos");
  });
}
