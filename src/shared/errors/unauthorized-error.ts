import { AppError } from "./app-error";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super({
      message,
      code: "UNAUTHORIZED",
      statusCode: 401,
    });

    this.name = "UnauthorizedError";
  }
}
