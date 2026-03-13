import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/tests/test-utils";
import userEvent from "@testing-library/user-event";
import { TodoForm } from "@/modules/todo/components/todo-form";

describe("TodoForm", () => {
  it("should render input", () => {
    render(<TodoForm filter="all" />);

    expect(screen.getByPlaceholderText(/add a new todo/i)).toBeInTheDocument();
  });

  it("should allow typing", async () => {
    render(<TodoForm filter="all" />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "New Todo");

    expect(input).toHaveValue("New Todo");
  });
});
