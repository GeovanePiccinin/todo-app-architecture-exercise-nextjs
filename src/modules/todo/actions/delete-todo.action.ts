"use server";

import { deleteTodoService } from "../services/todo.service";
import { deleteTodoSchema } from "../validation/todo.schema";
import { revalidatePath } from "next/cache";
import { validate } from "@/shared/utils/validate";

export async function deleteTodoAction(id: string) {
  const parsed = validate(deleteTodoSchema, { id });

  await deleteTodoService(parsed.id);

  revalidatePath("/todos");
}
