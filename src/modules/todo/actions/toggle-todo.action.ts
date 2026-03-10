"use server";

import { toggleTodoService } from "../services/todo.service";
import { toggleTodoSchema } from "../validation/todo.schema";
import { revalidatePath } from "next/cache";
import { validate } from "@/shared/utils/validate";

export async function toggleTodoAction(id: string, completed: boolean) {
  const parsed = validate(toggleTodoSchema, {
    id,
    completed,
  });

  await toggleTodoService(parsed.id, parsed.completed);

  revalidatePath("/todos");
}
