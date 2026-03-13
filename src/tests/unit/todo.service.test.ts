import { describe, it, expect, vi, beforeEach } from "vitest";
import * as repository from "@/modules/todo/repositories/todo.repository";
import { getTodos } from "@/modules/todo/services/todo.service";

type MockFindTodos = typeof repository.findTodosByUserId;

describe("todo.service", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return todos from repository", async () => {
    const mockTodos = {
      todos: [
        {
          id: "1",
          title: "Test Todo",
          completed: false,
          createdAt: new Date(),
          userId: "user-id",
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
      nextCursor: null,
    };

    vi.spyOn(repository, "findTodosByUserId").mockResolvedValue(mockTodos);

    const result = await getTodos("user-id", "all");

    expect(result).toEqual(mockTodos);
  });

  it("should call repository with correct parameters", async () => {
    const spy = vi
      .spyOn(repository, "findTodosByUserId")
      .mockResolvedValue({ todos: [], nextCursor: null });

    await getTodos("user-id", "completed");

    expect(spy).toHaveBeenCalledWith("user-id", "completed", undefined);
  });
});
