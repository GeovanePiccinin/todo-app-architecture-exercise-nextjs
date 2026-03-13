import { logger } from "@/infrastructure/logger/logger";
export interface AppErrorOptions {
  message: string;
  code: string;
  statusCode: number;
  cause?: unknown;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly cause?: unknown;

  constructor(options: AppErrorOptions) {
    super(options.message);

    this.name = "AppError";
    this.code = options.code;
    this.statusCode = options.statusCode;
    this.cause = options.cause;

    logger.error({
      code: this.code,
      message: this.message,
      cause: this.cause,
    });

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
