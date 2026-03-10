import { AppError } from "./app-error";

export interface SerializedError {
  message: string;
  code: string;
}

export function handleError(error: unknown): SerializedError {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: "UNKNOWN_ERROR",
    };
  }

  return {
    message: "Unexpected error",
    code: "UNKNOWN_ERROR",
  };
}
