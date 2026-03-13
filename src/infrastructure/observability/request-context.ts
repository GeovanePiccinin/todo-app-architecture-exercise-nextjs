import { AsyncLocalStorage } from "node:async_hooks";
import { randomUUID } from "node:crypto";

interface RequestContext {
  requestId: string;
}

const storage = new AsyncLocalStorage<RequestContext>();

export function runWithRequestContext<T>(fn: () => Promise<T>) {
  const context: RequestContext = {
    requestId: randomUUID(),
  };

  return storage.run(context, fn);
}

export function getRequestId(): string | undefined {
  return storage.getStore()?.requestId;
}
