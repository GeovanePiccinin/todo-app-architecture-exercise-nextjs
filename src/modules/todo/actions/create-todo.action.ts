"use server";

import { createTodoService } from "../services/todo.service";
import { createTodoSchema } from "../validation/todo.schema";
import { validate } from "@/shared/utils/validate";

export async function createTodoAction(formData: FormData) {
  const titleValue: FormDataEntryValue | null = formData.get("title");

  const { title } = validate(createTodoSchema, {
    title: titleValue,
  });

  return createTodoService("user-id", title);
}
