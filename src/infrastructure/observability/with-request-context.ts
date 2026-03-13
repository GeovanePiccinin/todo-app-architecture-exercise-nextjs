import { runWithRequestContext } from "./request-context";

export function withRequestContext<T>(handler: () => Promise<T>) {
  return runWithRequestContext(handler);
}
