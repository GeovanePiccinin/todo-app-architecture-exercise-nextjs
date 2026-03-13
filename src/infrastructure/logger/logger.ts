import pino from "pino";
import { getRequestId } from "../observability/request-context";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",

  formatters: {
    log(object) {
      const requestId = getRequestId();

      if (requestId) {
        return {
          requestId,
          ...object,
        };
      }

      return object;
    },
  },

  transport:
    process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
        }
      : undefined,
});
