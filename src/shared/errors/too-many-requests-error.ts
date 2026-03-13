import { AppError } from "./app-error";

export class TooManyRequestsError extends AppError {
  public readonly retryAfter?: number;

  constructor(
    message = "Too many requests",
    retryAfter?: number,
    cause?: unknown,
  ) {
    super({
      message,
      code: "TOO_MANY_REQUESTS",
      statusCode: 429,
      cause,
    });

    this.retryAfter = retryAfter;
    this.name = "TooManyRequestsError";
  }
}
