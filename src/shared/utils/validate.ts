import { ZodType } from "zod";
import { ValidationError } from "@/shared/errors/validation-error";

export function validate<T>(schema: ZodType<T>, input: unknown): T {
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    const message: string = parsed.error.issues[0]?.message ?? "Invalid input";

    throw new ValidationError(message, parsed.error);
  }

  return parsed.data;
}
