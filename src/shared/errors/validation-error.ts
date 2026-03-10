import { AppError } from "./app-error";

export class ValidationError extends AppError {
  constructor(message: string, cause?: unknown) {
    super({
      message,
      code: "VALIDATION_ERROR",
      statusCode: 400,
      cause,
    });

    this.name = "ValidationError";
  }
}
