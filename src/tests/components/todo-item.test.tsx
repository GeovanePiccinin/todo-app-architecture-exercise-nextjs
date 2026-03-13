import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TodoItem } from "@/modules/todo/components/todo-item";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

describe("TodoItem", () => {
  it("should render todo title", () => {
    const todo: Todo = {
      id: "1",
      title: "Test Todo",
      completed: false,
    };

    render(<TodoItem {...todo} onToggle={() => {}} onDelete={() => {}} />);

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });
});
