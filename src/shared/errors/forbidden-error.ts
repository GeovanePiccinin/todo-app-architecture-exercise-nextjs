import { AppError } from "./app-error";

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden", cause?: unknown) {
    super({
      message,
      code: "FORBIDDEN",
      statusCode: 403,
      cause,
    });

    this.name = "ForbiddenError";
  }
}
